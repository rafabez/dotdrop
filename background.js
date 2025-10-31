// DotDrop Background Service Worker
// Handles detection of exposed sensitive files

// List of sensitive files and paths to check
const SENSITIVE_PATHS = {
  vcs: {
    enabled: true,
    paths: [
      '.git/config',
      '.git/HEAD',
      '.git/index',
      '.git/logs/HEAD',
      '.svn/entries',
      '.svn/wc.db',
      '.hg/requires',
      '.hg/store/00manifest.i'
    ],
    severity: 'critical',
    description: 'Version Control System files'
  },
  env: {
    enabled: true,
    paths: [
      '.env',
      '.env.local',
      '.env.production',
      '.env.development',
      '.env.test',
      'env.js',
      'environment.yml'
    ],
    severity: 'critical',
    description: 'Environment configuration files'
  },
  aws: {
    enabled: true,
    paths: [
      '.aws/credentials',
      '.aws/config',
      'credentials.json'
    ],
    severity: 'critical',
    description: 'AWS credentials'
  },
  ssh: {
    enabled: true,
    paths: [
      '.ssh/id_rsa',
      '.ssh/id_dsa',
      '.ssh/id_ecdsa',
      '.ssh/id_ed25519',
      'id_rsa',
      'id_dsa',
      'id_rsa.pub',
      'id_dsa.pub'
    ],
    severity: 'critical',
    description: 'SSH private keys'
  },
  docker: {
    enabled: true,
    paths: [
      '.docker/config.json',
      'docker-compose.yml',
      'docker-compose.override.yml',
      'Dockerfile'
    ],
    severity: 'medium',
    description: 'Docker configuration files'
  },
  database: {
    enabled: true,
    paths: [
      'database.yml',
      'database.sqlite',
      'database.sqlite3',
      'db.sqlite',
      'db.sqlite3',
      '.db'
    ],
    severity: 'critical',
    description: 'Database files and configuration'
  },
  secrets: {
    enabled: true,
    paths: [
      'secrets.yml',
      'secrets.json',
      'secret.txt',
      'password.txt',
      'passwords.txt'
    ],
    severity: 'critical',
    description: 'Secret files'
  },
  config: {
    enabled: true,
    paths: [
      'config.json',
      'config.yml',
      'config.yaml',
      'configuration.json',
      '.htaccess',
      '.htpasswd',
      'web.config',
      'phpinfo.php'
    ],
    severity: 'medium',
    description: 'Configuration files'
  },
  packageManagers: {
    enabled: true,
    paths: [
      '.npmrc',
      '.pypirc',
      'composer.json',
      'composer.lock',
      'package.json',
      'package-lock.json',
      'yarn.lock',
      'Gemfile',
      'Gemfile.lock',
      'requirements.txt',
      'Pipfile',
      'Pipfile.lock',
      'pom.xml',
      'build.gradle'
    ],
    severity: 'low',
    description: 'Package manager files'
  },
  wordpress: {
    enabled: true,
    paths: [
      'wp-config.php',
      'wp-config.php.bak',
      'wp-config.php~',
      'wp-config.old'
    ],
    severity: 'critical',
    description: 'WordPress configuration'
  },
  backup: {
    enabled: true,
    paths: [
      '.DS_Store',
      'Thumbs.db',
      '.backup',
      'backup.zip',
      'backup.sql',
      'dump.sql',
      '.sql',
      '.bak'
    ],
    severity: 'medium',
    description: 'Backup and temporary files'
  },
  shell: {
    enabled: false,
    paths: [
      '.bashrc',
      '.bash_profile',
      '.bash_history',
      '.zshrc',
      '.profile'
    ],
    severity: 'medium',
    description: 'Shell configuration files'
  }
};

// Store detected exposures
let detectedSites = {};
let settings = {
  autoScan: true,
  criticalOnly: false,
  stealthMode: false
};

// Track scan progress
let scanProgress = {
  scanning: false,
  current: 0,
  total: 0,
  domain: ''
};

// Load settings from storage
chrome.storage.local.get(['settings', 'detectedSites'], (result) => {
  if (result.settings) {
    settings = { ...settings, ...result.settings };
  }
  if (result.detectedSites) {
    detectedSites = result.detectedSites;
  }
});

// Function to check if a URL is scannable
function isScannableUrl(url) {
  if (!url) return false;
  const protocol = new URL(url).protocol;
  return protocol === 'http:' || protocol === 'https:';
}

// Function to get all enabled paths
function getEnabledPaths() {
  const paths = [];
  Object.keys(SENSITIVE_PATHS).forEach(category => {
    if (SENSITIVE_PATHS[category].enabled) {
      SENSITIVE_PATHS[category].paths.forEach(path => {
        paths.push({
          path,
          category,
          severity: SENSITIVE_PATHS[category].severity,
          description: SENSITIVE_PATHS[category].description
        });
      });
    }
  });
  return paths;
}

// Function to check a single path
async function checkPath(baseUrl, pathInfo) {
  try {
    const fullUrl = new URL(pathInfo.path, baseUrl).href;
    
    // Try GET request with timeout
    const response = await Promise.race([
      fetch(fullUrl, { 
        method: 'GET',
        cache: 'no-cache',
        redirect: 'manual' // Don't follow redirects
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
    ]);
    
    // Must be exactly 200 (not 301, 302, etc)
    if (response.status !== 200) {
      return null;
    }
    
    // Check content type - reject HTML error pages
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      // Likely an error page, not the actual file
      return null;
    }
    
    // Check response size - too large is suspicious
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1000000) { // 1MB max
      return null;
    }
    
    // Read first 1KB to validate content
    const text = await response.text();
    const firstKB = text.substring(0, 1024);
    
    // Check if it looks like an error page
    if (firstKB.toLowerCase().includes('<!doctype html') ||
        firstKB.toLowerCase().includes('<html') ||
        firstKB.toLowerCase().includes('404') ||
        firstKB.toLowerCase().includes('not found')) {
      return null;
    }
    
    // Passed all checks - likely a real exposed file
    return {
      found: true,
      url: fullUrl,
      path: pathInfo.path,
      category: pathInfo.category,
      severity: pathInfo.severity,
      description: pathInfo.description,
      size: text.length
    };
    
  } catch (error) {
    // File not found, timeout, or network error
  }
  return null;
}

// Function to scan a URL for exposed files
async function scanUrl(url, tabId) {
  if (!isScannableUrl(url)) return;
  
  const baseUrl = new URL(url).origin;
  const paths = getEnabledPaths();
  const foundFiles = [];
  
  // Initialize scan progress
  scanProgress = {
    scanning: true,
    current: 0,
    total: paths.length,
    domain: baseUrl
  };
  
  // Check paths in batches to avoid overwhelming the server
  const batchSize = 5;
  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(pathInfo => checkPath(baseUrl, pathInfo))
    );
    
    results.forEach(result => {
      if (result) {
        foundFiles.push(result);
      }
    });
    
    // Update progress
    scanProgress.current = Math.min(i + batchSize, paths.length);
    
    // Small delay between batches (stealth mode = longer delay)
    const delay = settings.stealthMode ? 500 : 100;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  // Mark scan as complete
  scanProgress.scanning = false;
  
  if (foundFiles.length > 0) {
    handleDetection(baseUrl, foundFiles, tabId);
  } else {
    // Site is clean - show green icon
    updateIcon(tabId, 'safe');
    updateBadge(tabId, 0);
  }
}

// Function to handle detection
function handleDetection(domain, files, tabId) {
  // Store detection
  if (!detectedSites[domain]) {
    detectedSites[domain] = {
      firstDetected: new Date().toISOString(),
      files: []
    };
  }
  
  files.forEach(file => {
    if (!detectedSites[domain].files.some(f => f.path === file.path)) {
      detectedSites[domain].files.push({
        path: file.path,
        category: file.category,
        severity: file.severity,
        description: file.description,
        url: file.url,
        detectedAt: new Date().toISOString()
      });
    }
  });
  
  // Save to storage
  chrome.storage.local.set({ detectedSites });
  
  // Update badge
  updateBadge(tabId, files.length);
  
  // Update icon to warning state
  updateIcon(tabId, 'warning');
}

// Function to update badge
function updateBadge(tabId, count) {
  chrome.action.setBadgeText({
    tabId: tabId,
    text: count > 0 ? count.toString() : ''
  });
  chrome.action.setBadgeBackgroundColor({
    tabId: tabId,
    color: count > 0 ? '#FF0000' : '#00FF00'
  });
}

// Function to calculate statistics
function calculateStatistics() {
  const totalSites = Object.keys(detectedSites).length;
  let totalFiles = 0;
  let criticalCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  const categoryCount = {};
  
  Object.values(detectedSites).forEach(site => {
    site.files.forEach(file => {
      totalFiles++;
      if (file.severity === 'critical') criticalCount++;
      else if (file.severity === 'medium') mediumCount++;
      else if (file.severity === 'low') lowCount++;
      
      categoryCount[file.category] = (categoryCount[file.category] || 0) + 1;
    });
  });
  
  // Find most common category
  let mostCommon = null;
  let maxCount = 0;
  Object.entries(categoryCount).forEach(([category, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommon = category;
    }
  });
  
  return {
    totalSites,
    totalFiles,
    criticalCount,
    mediumCount,
    lowCount,
    mostCommonCategory: mostCommon,
    mostCommonCount: maxCount,
    categoryBreakdown: categoryCount
  };
}

// Function to update icon
function updateIcon(tabId, status) {
  // status: 'safe' (green), 'warning' (red), or false (orange)
  let iconPath = 'icons/icon'; // default orange
  
  if (status === 'safe') {
    iconPath = 'icons/icon-safe';
  } else if (status === 'warning' || status === true) {
    iconPath = 'icons/icon-warning';
  }
  
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `${iconPath}16.png`,
      32: `${iconPath}32.png`,
      48: `${iconPath}48.png`,
      128: `${iconPath}128.png`
    }
  });
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && settings.autoScan) {
    scanUrl(tab.url, tabId);
  }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanCurrentSite') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        scanUrl(tabs[0].url, tabs[0].id);
        sendResponse({ success: true });
      }
    });
    return true;
  }
  
  if (request.action === 'scanSpecificTab') {
    // For batch scanning - scan a specific tab by ID
    const { tabId, url } = request;
    if (tabId && url) {
      scanUrl(url, tabId).then(() => {
        sendResponse({ success: true });
      }).catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    } else {
      sendResponse({ success: false, error: 'Missing tabId or url' });
    }
    return true;
  }
  
  if (request.action === 'getDetections') {
    sendResponse({ detectedSites });
    return true;
  }
  
  if (request.action === 'clearDetections') {
    detectedSites = {};
    chrome.storage.local.set({ detectedSites });
    sendResponse({ success: true });
    return true;
  }
  
  if (request.action === 'updateSettings') {
    settings = { ...settings, ...request.settings };
    chrome.storage.local.set({ settings });
    sendResponse({ success: true });
    return true;
  }
  
  if (request.action === 'getSettings') {
    sendResponse({ settings });
    return true;
  }
  
  if (request.action === 'getScanProgress') {
    sendResponse({ progress: scanProgress });
    return true;
  }
  
  if (request.action === 'getStatistics') {
    const stats = calculateStatistics();
    sendResponse({ statistics: stats });
    return true;
  }
});

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('DotDrop extension installed');
  chrome.storage.local.set({ settings, detectedSites: {} });
});
