// DotDrop Content Script
// Runs on web pages to assist with detection

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showBanner') {
    showWarningBanner(request.files, request.domain);
    sendResponse({ success: true });
  }
});

// Function to show warning banner
function showWarningBanner(files, domain) {
  // Remove existing banner if any
  const existingBanner = document.getElementById('dotdrop-warning-banner');
  if (existingBanner) {
    existingBanner.remove();
  }
  
  // Create banner
  const banner = document.createElement('div');
  banner.id = 'dotdrop-warning-banner';
  banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999999;
    background: linear-gradient(135deg, #1a0000 0%, #330000 100%);
    border-bottom: 3px solid #ff0000;
    padding: 15px 20px;
    font-family: 'Courier New', monospace;
    box-shadow: 0 4px 20px rgba(255, 0, 0, 0.4);
    animation: slideDown 0.3s ease-out;
  `;
  
  const criticalCount = files.filter(f => f.severity === 'critical').length;
  const isCritical = criticalCount > 0;
  
  banner.innerHTML = `
    <style>
      @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      #dotdrop-warning-banner * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    </style>
    <div style="display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto;">
      <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
        <div style="font-size: 32px; animation: pulse 2s infinite;">
          ${isCritical ? '🚨' : '⚠️'}
        </div>
        <div>
          <div style="color: #ff0000; font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">
            ${isCritical ? '⚠ CRITICAL SECURITY EXPOSURE DETECTED' : '⚠ Security Exposure Detected'}
          </div>
          <div style="color: #ff7700; font-size: 13px;">
            <strong>${files.length}</strong> exposed file(s) found on this website
            ${criticalCount > 0 ? ` • <strong>${criticalCount}</strong> CRITICAL` : ''}
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <button id="dotdrop-view-details" style="
          background: #ff7700;
          border: 1px solid #ff7700;
          color: #0a0e27;
          padding: 8px 16px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        ">
          View Details
        </button>
        <button id="dotdrop-close-banner" style="
          background: transparent;
          border: 1px solid #8b949e;
          color: #8b949e;
          padding: 8px 16px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        ">
          Dismiss
        </button>
      </div>
    </div>
  `;
  
  // Add hover effects
  const viewBtn = banner.querySelector('#dotdrop-view-details');
  const closeBtn = banner.querySelector('#dotdrop-close-banner');
  
  viewBtn.addEventListener('mouseenter', () => {
    viewBtn.style.background = '#ff9933';
    viewBtn.style.boxShadow = '0 0 10px rgba(255, 119, 0, 0.5)';
  });
  viewBtn.addEventListener('mouseleave', () => {
    viewBtn.style.background = '#ff7700';
    viewBtn.style.boxShadow = 'none';
  });
  
  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.borderColor = '#ff0000';
    closeBtn.style.color = '#ff0000';
  });
  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.borderColor = '#8b949e';
    closeBtn.style.color = '#8b949e';
  });
  
  // Button handlers
  viewBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openPopup' });
  });
  
  closeBtn.addEventListener('click', () => {
    banner.style.animation = 'slideDown 0.3s ease-out reverse';
    setTimeout(() => banner.remove(), 300);
  });
  
  // Auto-dismiss after 15 seconds (unless critical)
  if (!isCritical) {
    setTimeout(() => {
      if (banner.parentNode) {
        banner.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => banner.remove(), 300);
      }
    }, 15000);
  }
  
  // Insert banner
  document.body.insertBefore(banner, document.body.firstChild);
  
  console.log('🔒 DotDrop: Warning banner displayed');
}

// Check for exposed files in page content
function checkPageContent() {
  const bodyText = document.body.innerText.toLowerCase();
  const suspiciousPatterns = [
    /private[_\s]key/gi,
    /secret[_\s]key/gi,
    /api[_\s]key/gi,
    /password\s*=\s*['"]/gi,
    /aws[_\s]access[_\s]key/gi,
    /aws[_\s]secret/gi,
    /BEGIN\s+RSA\s+PRIVATE\s+KEY/gi,
    /BEGIN\s+PRIVATE\s+KEY/gi
  ];
  
  let foundPatterns = [];
  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(bodyText)) {
      foundPatterns.push(pattern.toString());
    }
  });
  
  if (foundPatterns.length > 0) {
    chrome.runtime.sendMessage({
      action: 'patternsFound',
      patterns: foundPatterns,
      url: window.location.href
    });
  }
}

// Run check after page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkPageContent);
} else {
  checkPageContent();
}
