// DotDrop Content Script
// Minimal script for future functionality

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
