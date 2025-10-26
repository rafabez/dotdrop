// DotDrop Options Script

let settings = {
  autoScan: true,
  criticalOnly: false,
  stealthMode: false
};

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadDetections();
  loadStatistics();
  loadPatternGroups();
  
  // Toggle handlers
  document.getElementById('autoScanToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    settings.autoScan = this.classList.contains('active');
  });
  
  document.getElementById('criticalOnlyToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    settings.criticalOnly = this.classList.contains('active');
  });
  
  document.getElementById('stealthModeToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    settings.stealthMode = this.classList.contains('active');
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
          loadStatistics();
          showToast('History cleared successfully!');
        }
      });
    }
  });
  
  // Batch scan button
  document.getElementById('batchScanBtn').addEventListener('click', () => {
    batchScan();
  });
  
  // Export buttons
  document.getElementById('exportJsonBtn').addEventListener('click', () => exportData('json'));
  document.getElementById('exportCsvBtn').addEventListener('click', () => exportData('csv'));
  document.getElementById('exportMdBtn').addEventListener('click', () => exportData('markdown'));
});

// Load settings from storage
function loadSettings() {
  chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
    if (response.settings) {
      settings = response.settings;
      
      // Update toggles
      if (settings.autoScan) {
        document.getElementById('autoScanToggle').classList.add('active');
      }
      if (settings.criticalOnly) {
        document.getElementById('criticalOnlyToggle').classList.add('active');
      }
      if (settings.stealthMode) {
        document.getElementById('stealthModeToggle').classList.add('active');
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
      detectionsList.textContent = '';
      const p = document.createElement('p');
      p.style.cssText = 'text-align: center; color: #6b7280;';
      p.textContent = 'No detections yet';
      detectionsList.appendChild(p);
      return;
    }
    
    // Sort sites by severity
    const sortedSites = Object.entries(detectedSites).sort((a, b) => {
      const severityOrder = { critical: 0, medium: 1, low: 2 };
      const maxSeverityA = Math.min(...a[1].files.map(f => severityOrder[f.severity] ?? 999));
      const maxSeverityB = Math.min(...b[1].files.map(f => severityOrder[f.severity] ?? 999));
      return maxSeverityA - maxSeverityB;
    });
    
    detectionsList.textContent = '';
    
    sortedSites.forEach(([domain, data]) => {
      const criticalCount = data.files.filter(f => f.severity === 'critical').length;
      const severity = criticalCount > 0 ? 'critical' : 
                      data.files.some(f => f.severity === 'medium') ? 'medium' : 'low';
      
      const firstDetected = new Date(data.firstDetected).toLocaleString();
      
      const card = document.createElement('div');
      card.className = `detection-card ${severity}`;
      
      const header = document.createElement('div');
      header.className = 'detection-header';
      
      const domainDiv = document.createElement('div');
      domainDiv.className = 'detection-domain';
      domainDiv.textContent = domain;
      
      const badge = document.createElement('span');
      badge.className = `severity-badge severity-${severity}`;
      badge.textContent = severity.toUpperCase();
      
      header.appendChild(domainDiv);
      header.appendChild(badge);
      card.appendChild(header);
      
      const dateDiv = document.createElement('div');
      dateDiv.style.cssText = 'font-size: 12px; color: #9ca3af; margin-bottom: 10px;';
      dateDiv.textContent = `First detected: ${firstDetected}`;
      card.appendChild(dateDiv);
      
      const filesDiv = document.createElement('div');
      filesDiv.className = 'detection-files';
      
      data.files.forEach(file => {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'detection-file';
        fileDiv.textContent = `${getSeverityIcon(file.severity)} ${file.path} `;
        
        const categorySpan = document.createElement('span');
        categorySpan.style.color = '#9ca3af';
        categorySpan.textContent = `(${file.category})`;
        fileDiv.appendChild(categorySpan);
        
        filesDiv.appendChild(fileDiv);
      });
      
      card.appendChild(filesDiv);
      detectionsList.appendChild(card);
    });
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

// Load statistics
function loadStatistics() {
  chrome.runtime.sendMessage({ action: 'getStatistics' }, (response) => {
    if (response && response.statistics) {
      const stats = response.statistics;
      document.getElementById('statTotalSites').textContent = stats.totalSites || 0;
      document.getElementById('statCritical').textContent = stats.criticalCount || 0;
      document.getElementById('statMedium').textContent = stats.mediumCount || 0;
      document.getElementById('statLow').textContent = stats.lowCount || 0;
      document.getElementById('statMostCommon').textContent = 
        stats.mostCommonCategory ? `${stats.mostCommonCategory} (${stats.mostCommonCount})` : 'No data';
    }
  });
}

// Load pattern groups from background
function loadPatternGroups() {
  // This would need to query background.js for SENSITIVE_PATHS
  // For now, create a basic UI with common categories
  const categories = ['vcs', 'env', 'ssh', 'aws', 'docker', 'database', 'secrets', 'config', 'backup', 'ci', 'shell'];
  const container = document.getElementById('patternGroups');
  
  container.textContent = '';
  
  categories.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'setting-item';
    
    const label = document.createElement('div');
    label.className = 'setting-label';
    
    const name = document.createElement('div');
    name.className = 'setting-name';
    name.textContent = cat.toUpperCase();
    
    const desc = document.createElement('div');
    desc.className = 'setting-description';
    desc.textContent = `Enable ${cat} file detection`;
    
    label.appendChild(name);
    label.appendChild(desc);
    
    const toggle = document.createElement('div');
    toggle.className = 'toggle active';
    toggle.dataset.category = cat;
    
    const slider = document.createElement('div');
    slider.className = 'toggle-slider';
    toggle.appendChild(slider);
    
    toggle.addEventListener('click', function() {
      this.classList.toggle('active');
      // In a full implementation, this would update background.js SENSITIVE_PATHS
    });
    
    item.appendChild(label);
    item.appendChild(toggle);
    container.appendChild(item);
  });
}

// Batch scan function
async function batchScan() {
  const textarea = document.getElementById('batchUrls');
  const urls = textarea.value.split('\n').map(u => u.trim()).filter(u => u);
  
  if (urls.length === 0) {
    showToast('Please enter URLs to scan');
    return;
  }
  
  const progressDiv = document.getElementById('batchProgress');
  const countSpan = document.getElementById('batchCount');
  const totalSpan = document.getElementById('batchTotal');
  
  progressDiv.style.display = 'block';
  totalSpan.textContent = urls.length;
  
  let completed = 0;
  for (const url of urls) {
    try {
      // Open each URL in a new tab and scan it
      const tab = await chrome.tabs.create({ url, active: false });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for page load
      await chrome.runtime.sendMessage({ action: 'scanCurrentSite' });
      await chrome.tabs.remove(tab.id);
      
      completed++;
      countSpan.textContent = completed;
    } catch (error) {
      console.error('Error scanning:', url, error);
    }
  }
  
  progressDiv.style.display = 'none';
  showToast(`Batch scan complete! Scanned ${completed} sites`);
  loadDetections();
  loadStatistics();
}

// Export data in different formats
function exportData(format) {
  chrome.runtime.sendMessage({ action: 'getDetections' }, (response) => {
    const detectedSites = response.detectedSites;
    
    if (Object.keys(detectedSites).length === 0) {
      showToast('No detections to export');
      return;
    }
    
    let content, filename, mimeType;
    
    if (format === 'json') {
      content = JSON.stringify(detectedSites, null, 2);
      filename = `dotdrop-export-${Date.now()}.json`;
      mimeType = 'application/json';
    } else if (format === 'csv') {
      // CSV format
      const rows = [['Domain', 'Path', 'Severity', 'Category', 'Description', 'Detected At']];
      Object.entries(detectedSites).forEach(([domain, data]) => {
        data.files.forEach(file => {
          rows.push([
            domain,
            file.path,
            file.severity,
            file.category,
            file.description,
            file.detectedAt
          ]);
        });
      });
      content = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
      filename = `dotdrop-export-${Date.now()}.csv`;
      mimeType = 'text/csv';
    } else if (format === 'markdown') {
      // Markdown format
      content = '# DotDrop Security Findings\n\n';
      content += `Generated: ${new Date().toLocaleString()}\n\n`;
      
      Object.entries(detectedSites).forEach(([domain, data]) => {
        content += `## ${domain}\n\n`;
        content += `First Detected: ${new Date(data.firstDetected).toLocaleString()}\n\n`;
        
        const critical = data.files.filter(f => f.severity === 'critical');
        const medium = data.files.filter(f => f.severity === 'medium');
        const low = data.files.filter(f => f.severity === 'low');
        
        if (critical.length > 0) {
          content += `### 🔴 Critical (${critical.length})\n\n`;
          critical.forEach(f => {
            content += `- **${f.path}** - ${f.description}\n`;
          });
          content += '\n';
        }
        
        if (medium.length > 0) {
          content += `### 🟡 Medium (${medium.length})\n\n`;
          medium.forEach(f => {
            content += `- **${f.path}** - ${f.description}\n`;
          });
          content += '\n';
        }
        
        if (low.length > 0) {
          content += `### 🔵 Low (${low.length})\n\n`;
          low.forEach(f => {
            content += `- **${f.path}** - ${f.description}\n`;
          });
          content += '\n';
        }
        
        content += '---\n\n';
      });
      
      filename = `dotdrop-export-${Date.now()}.md`;
      mimeType = 'text/markdown';
    }
    
    // Download the file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast(`Exported as ${format.toUpperCase()}`);
  });
}
