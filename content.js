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
    // Create AudioContext - browsers may require user interaction first
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Resume audio context in case it's suspended (Chrome autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log('AudioContext resumed');
      }).catch(err => {
        console.warn('Could not resume AudioContext:', err);
      });
    }
    
    // Create three beeps with increasing pitch
    const beeps = [
      { frequency: 800, delay: 0 },
      { frequency: 1000, delay: 0.15 },
      { frequency: 1200, delay: 0.3 }
    ];
    
    beeps.forEach(({ frequency, delay }) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      const startTime = audioContext.currentTime + delay;
      const duration = 0.1;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
    
    console.log('🔊 DotDrop: Alert sound triggered');
    
  } catch (error) {
    console.error('❌ DotDrop: Failed to play alert sound:', error);
    console.warn('💡 Sound may be blocked by browser autoplay policy. Try clicking on the page first.');
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
