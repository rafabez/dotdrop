// DotDrop Options Script

let settings = {
  soundAlerts: true,
  notifications: true,
  autoScan: true,
  criticalOnly: false
};

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadDetections();
  
  // Toggle handlers
  document.getElementById('notificationsToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    settings.notifications = this.classList.contains('active');
  });
  
  document.getElementById('soundAlertsToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    settings.soundAlerts = this.classList.contains('active');
  });
  
  document.getElementById('autoScanToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    settings.autoScan = this.classList.contains('active');
  });
  
  document.getElementById('criticalOnlyToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    settings.criticalOnly = this.classList.contains('active');
  });
  
  // Save button
  document.getElementById('saveBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ 
      action: 'updateSettings', 
      settings: settings 
    }, (response) => {
      if (response.success) {
        showToast('Settings saved successfully!');
      }
    });
  });
  
  // Clear history button
  document.getElementById('clearHistoryBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all detection history?')) {
      chrome.runtime.sendMessage({ action: 'clearDetections' }, (response) => {
        if (response.success) {
          loadDetections();
          showToast('History cleared successfully!');
        }
      });
    }
  });
});

// Load settings from storage
function loadSettings() {
  chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
    if (response.settings) {
      settings = response.settings;
      
      // Update toggles
      if (settings.notifications) {
        document.getElementById('notificationsToggle').classList.add('active');
      }
      if (settings.soundAlerts) {
        document.getElementById('soundAlertsToggle').classList.add('active');
      }
      if (settings.autoScan) {
        document.getElementById('autoScanToggle').classList.add('active');
      }
      if (settings.criticalOnly) {
        document.getElementById('criticalOnlyToggle').classList.add('active');
      }
    }
  });
}

// Load detections from storage
function loadDetections() {
  chrome.runtime.sendMessage({ action: 'getDetections' }, (response) => {
    const detectedSites = response.detectedSites;
    const detectionsList = document.getElementById('detectionsList');
    
    if (Object.keys(detectedSites).length === 0) {
      detectionsList.innerHTML = '<p style="text-align: center; color: #6b7280;">No detections yet</p>';
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
      
      const firstDetected = new Date(data.firstDetected).toLocaleString();
      
      return `
        <div class="detection-card ${severity}">
          <div class="detection-header">
            <div class="detection-domain">${domain}</div>
            <span class="severity-badge severity-${severity}">${severity.toUpperCase()}</span>
          </div>
          <div style="font-size: 12px; color: #9ca3af; margin-bottom: 10px;">
            First detected: ${firstDetected}
          </div>
          <div class="detection-files">
            ${data.files.map(file => `
              <div class="detection-file">
                ${getSeverityIcon(file.severity)} ${file.path} 
                <span style="color: #9ca3af;">(${file.category})</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
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

// Show toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
