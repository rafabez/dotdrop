// DotDrop Content Script
// Runs on web pages to assist with detection and alerts

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'playAlert') {
    playAlertSound();
    sendResponse({ success: true });
  }
});

// Function to play alert sound
function playAlertSound() {
  try {
    // Create audio element
    const audio = new Audio();
    audio.volume = 0.5;
    
    // Use a data URL for a simple beep sound (sine wave)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Play three beeps for critical alert
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      oscillator2.frequency.value = 1000;
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.5);
    }, 200);
    
    setTimeout(() => {
      const oscillator3 = audioContext.createOscillator();
      const gainNode3 = audioContext.createGain();
      oscillator3.connect(gainNode3);
      gainNode3.connect(audioContext.destination);
      oscillator3.frequency.value = 1200;
      oscillator3.type = 'sine';
      gainNode3.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator3.start(audioContext.currentTime);
      oscillator3.stop(audioContext.currentTime + 0.5);
    }, 400);
    
  } catch (error) {
    console.error('Failed to play alert sound:', error);
  }
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
