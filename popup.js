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
      
      return `
        <div class="detection-item ${severity}">
          <div class="detection-domain">
            🌐 ${domain}
            <span class="severity-badge severity-${severity}">${severity.toUpperCase()}</span>
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

// Show toast notification (simple version)
function showToast(message) {
  // Could implement a toast notification here
  console.log(message);
}

// Event delegation for view-all links
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('view-all-link')) {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  }
});
