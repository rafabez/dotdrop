#!/bin/bash
# Switch to Firefox-compatible manifest

echo "🦊 Switching to Firefox-compatible manifest..."

# Backup current manifest
if [ -f "manifest.json" ]; then
    cp manifest.json manifest_chrome.json
    echo "✓ Backed up Chrome manifest to manifest_chrome.json"
fi

# Copy Firefox manifest
if [ -f "manifest_firefox.json" ]; then
    cp manifest_firefox.json manifest.json
    echo "✓ Activated Firefox manifest"
    echo ""
    echo "📋 Now load the extension in Firefox:"
    echo "   1. Go to about:debugging#/runtime/this-firefox"
    echo "   2. Click 'Load Temporary Add-on'"
    echo "   3. Select manifest.json"
    echo ""
    echo "✅ Ready for Firefox!"
else
    echo "❌ manifest_firefox.json not found"
    exit 1
fi
