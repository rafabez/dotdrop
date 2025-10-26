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
  notifications: true,
  autoScan: true,
  criticalOnly: false
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
    const response = await fetch(fullUrl, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    
    // Due to no-cors, we can't check status directly
    // We'll use a GET request with a timeout for more accurate detection
    const getResponse = await Promise.race([
      fetch(fullUrl, { method: 'GET' }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    ]);
    
    if (getResponse.ok && getResponse.status === 200) {
      return {
        found: true,
        url: fullUrl,
        ...pathInfo
      };
    }
  } catch (error) {
    // File not found or network error
  }
  return null;
}

// Function to scan a URL for exposed files
async function scanUrl(url, tabId) {
  if (!isScannableUrl(url)) return;
  
  const baseUrl = new URL(url).origin;
  const paths = getEnabledPaths();
  const foundFiles = [];
  
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
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  if (foundFiles.length > 0) {
    handleDetection(baseUrl, foundFiles, tabId);
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
  
  // Show notification
  if (settings.notifications) {
    showNotification(domain, files);
  }
  
  // Update icon to warning state
  updateIcon(tabId, true);
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

// Function to update icon
function updateIcon(tabId, hasExposure) {
  const iconPath = hasExposure ? 'icons/icon-warning' : 'icons/icon';
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

// Function to show notification
function showNotification(domain, files) {
  const criticalFiles = files.filter(f => f.severity === 'critical');
  const title = criticalFiles.length > 0 ? '🚨 CRITICAL SECURITY EXPOSURE!' : '⚠️ Security Exposure Detected';
  
  let message = `Found ${files.length} exposed file(s) on ${domain}:\n`;
  files.slice(0, 3).forEach(file => {
    message += `\n• ${file.path} (${file.severity})`;
  });
  
  if (files.length > 3) {
    message += `\n... and ${files.length - 3} more`;
  }
  
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: title,
    message: message,
    priority: criticalFiles.length > 0 ? 2 : 1,
    requireInteraction: criticalFiles.length > 0
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
});

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('DotDrop extension installed');
  chrome.storage.local.set({ settings, detectedSites: {} });
});
