// DotDrop Popup Script

document.addEventListener('DOMContentLoaded', async () => {
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Load detections
  loadDetections();
  
  // Check current site status
  checkCurrentSite(tab.url);
  
  // Scan button
  document.getElementById('scanBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'scanCurrentSite' }, (response) => {
      if (response.success) {
        showToast('Scanning in progress...');
        setTimeout(() => loadDetections(), 2000);
      }
    });
    document.getElementById('scanProgressContainer').style.display = 'flex';
  });
  
  // Copy button
  document.getElementById('copyBtn').addEventListener('click', () => {
    copyFindings();
  });
  
  // Settings button
  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  
  // Clear button
  document.getElementById('clearBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to clear all detection history?')) {
      chrome.runtime.sendMessage({ action: 'clearDetections' }, (response) => {
        if (response.success) {
          loadDetections();
          showToast('History cleared');
        }
      });
    }
  });
  
  // View all button
  document.getElementById('viewAllBtn').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
  
  // Start progress polling
  startProgressPolling();
});

// Load and display detections
function loadDetections() {
  chrome.runtime.sendMessage({ action: 'getDetections' }, (response) => {
    const detectedSites = response.detectedSites;
    const detectionsList = document.getElementById('detections');
    const totalDetections = document.getElementById('totalDetections');
    
    const siteCount = Object.keys(detectedSites).length;
    totalDetections.textContent = siteCount;
    
    if (siteCount === 0) {
      detectionsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">✨</div>
          <div class="empty-state-text">No exposures detected yet</div>
        </div>
      `;
      totalDetections.className = 'status-value status-safe';
      return;
    }
    
    // Sort sites by severity
    const sortedSites = Object.entries(detectedSites).sort((a, b) => {
      const severityOrder = { critical: 0, medium: 1, low: 2 };
      const maxSeverityA = Math.min(...a[1].files.map(f => severityOrder[f.severity] ?? 999));
      const maxSeverityB = Math.min(...b[1].files.map(f => severityOrder[f.severity] ?? 999));
      return maxSeverityA - maxSeverityB;
    });
    
    detectionsList.innerHTML = sortedSites.map(([domain, data]) => {
      const criticalCount = data.files.filter(f => f.severity === 'critical').length;
      const severity = criticalCount > 0 ? 'critical' : 
                      data.files.some(f => f.severity === 'medium') ? 'medium' : 'low';
      
      const timeAgo = getTimeAgo(data.firstDetected);
      
      return `
        <div class="detection-item ${severity}">
          <div class="detection-domain">
            🌐 ${domain}
            <span class="severity-badge severity-${severity}">${severity.toUpperCase()}</span>
            <span style="font-size: 10px; opacity: 0.6; margin-left: auto;">⏱️ ${timeAgo}</span>
          </div>
          <div class="detection-files">
            ${data.files.slice(0, 12).map(file => `
              <div class="detection-file" title="${file.url || file.path}">
                ${getSeverityIcon(file.severity)} ${file.path}
              </div>
            `).join('')}
            ${data.files.length > 12 ? `
              <div class="detection-file more-files">
                <a href="#" class="view-all-link" data-domain="${domain}">
                  ... and ${data.files.length - 12} more (click to view all)
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
    
    // Update total detections badge color
    const hasCritical = sortedSites.some(([_, data]) => 
      data.files.some(f => f.severity === 'critical')
    );
    totalDetections.className = hasCritical ? 
      'status-value status-critical' : 'status-value status-warning';
  });
}

// Check current site status
function checkCurrentSite(url) {
  if (!url || !url.startsWith('http')) {
    document.getElementById('currentStatus').textContent = 'N/A';
    document.getElementById('currentStatus').className = 'status-value status-safe';
    return;
  }
  
  const domain = new URL(url).origin;
  
  chrome.runtime.sendMessage({ action: 'getDetections' }, (response) => {
    const detectedSites = response.detectedSites;
    const statusElement = document.getElementById('currentStatus');
    
    if (detectedSites[domain]) {
      const criticalCount = detectedSites[domain].files.filter(f => f.severity === 'critical').length;
      if (criticalCount > 0) {
        statusElement.textContent = `⚠️ ${criticalCount} Critical`;
        statusElement.className = 'status-value status-critical';
      } else {
        statusElement.textContent = `⚠️ ${detectedSites[domain].files.length} Issues`;
        statusElement.className = 'status-value status-warning';
      }
    } else {
      statusElement.textContent = '✓ Safe';
      statusElement.className = 'status-value status-safe';
    }
  });
}

// Get severity icon
function getSeverityIcon(severity) {
  switch (severity) {
    case 'critical': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🔵';
    default: return '⚪';
  }
}

// Get time ago string
function getTimeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now - then) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

// Show toast notification (simple version)
function showToast(message) {
  // Could implement a toast notification here
  console.log(message);
}

// Poll for scan progress
function startProgressPolling() {
  setInterval(() => {
    chrome.runtime.sendMessage({ action: 'getScanProgress' }, (response) => {
      if (response && response.progress) {
        const { scanning, current, total } = response.progress;
        const progressContainer = document.getElementById('scanProgressContainer');
        const progressText = document.getElementById('scanProgress');
        
        if (scanning) {
          progressContainer.style.display = 'flex';
          progressText.textContent = `${current}/${total}`;
        } else {
          progressContainer.style.display = 'none';
        }
      }
    });
  }, 500);
}

// Copy findings to clipboard
function copyFindings() {
  chrome.runtime.sendMessage({ action: 'getDetections' }, (response) => {
    const detectedSites = response.detectedSites;
    if (Object.keys(detectedSites).length === 0) {
      showToast('No detections to copy');
      return;
    }
    
    let text = '# DotDrop Security Findings\n\n';
    text += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    Object.entries(detectedSites).forEach(([domain, data]) => {
      text += `## ${domain}\n`;
      text += `First Detected: ${new Date(data.firstDetected).toLocaleString()}\n\n`;
      
      const critical = data.files.filter(f => f.severity === 'critical');
      const medium = data.files.filter(f => f.severity === 'medium');
      const low = data.files.filter(f => f.severity === 'low');
      
      if (critical.length > 0) {
        text += `### Critical (${critical.length})\n`;
        critical.forEach(f => {
          text += `- ${f.path} (${f.description})\n`;
        });
        text += '\n';
      }
      
      if (medium.length > 0) {
        text += `### Medium (${medium.length})\n`;
        medium.forEach(f => {
          text += `- ${f.path} (${f.description})\n`;
        });
        text += '\n';
      }
      
      if (low.length > 0) {
        text += `### Low (${low.length})\n`;
        low.forEach(f => {
          text += `- ${f.path} (${f.description})\n`;
        });
        text += '\n';
      }
      
      text += '\n---\n\n';
    });
    
    navigator.clipboard.writeText(text).then(() => {
      showToast('✅ Copied to clipboard!');
    });
  });
}

// Show toast notification
function showToast(message) {
  const scanBtn = document.getElementById('scanBtn');
  const originalText = scanBtn.textContent;
  scanBtn.textContent = message;
  scanBtn.style.background = '#00ff41';
  scanBtn.style.color = '#0a0e27';
  
  setTimeout(() => {
    scanBtn.textContent = originalText;
    scanBtn.style.background = '';
    scanBtn.style.color = '';
  }, 2000);
}

// Event delegation for view-all links
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('view-all-link')) {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  }
});
