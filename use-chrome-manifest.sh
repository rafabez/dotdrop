#!/bin/bash
# Switch back to Chrome-compatible manifest

echo "🌐 Switching to Chrome-compatible manifest..."

# Restore Chrome manifest
if [ -f "manifest_chrome.json" ]; then
    cp manifest_chrome.json manifest.json
    echo "✓ Restored Chrome manifest"
    echo ""
    echo "📋 Now load the extension in Chrome:"
    echo "   1. Go to chrome://extensions/"
    echo "   2. Enable Developer mode"
    echo "   3. Click 'Load unpacked'"
    echo "   4. Select the dotdrop folder"
    echo ""
    echo "✅ Ready for Chrome!"
else
    echo "⚠ No backup found. Using current manifest.json"
fi
