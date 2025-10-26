# 🧪 DotDrop Testing Guide

## What Was Fixed

### 1. ✅ File Display Limit Increased
**Before:** Only showed 5 files, then "... and 7 more"  
**After:** Now shows 12 files, with clickable link to view all

### 2. 🔊 Sound Alert Improvements
**Problem:** Sounds weren't playing due to browser autoplay policy  
**Fix:** 
- Better AudioContext handling
- Console logging for debugging
- Autoplay policy resume attempt
- User-friendly error messages

**Note:** Browsers block autoplay audio. Sound requires user interaction (click/scroll on page first).

### 3. 📱 Browser Compatibility
- Added Firefox Manifest V2 support
- Helper scripts to switch between Chrome/Firefox manifests
- Documentation about browser limitations

---

## How to Test

### Step 1: Reload the Extension

```bash
# If using Firefox, switch to Firefox manifest first:
./use-firefox-manifest.sh

# Then reload the extension:
# Chrome: Go to chrome://extensions/ → Click reload icon
# Firefox: Go to about:debugging → Click reload
```

### Step 2: Start the Test Server

```bash
cd test-site
./start-server.sh
```

Server will be at: **http://localhost:8080**

### Step 3: Test Detection

1. Open **http://localhost:8080**
2. **Click anywhere on the page first** (enables sound)
3. Click on `.env` or `.git/config` link
4. Watch for:
   - ✅ Browser notification
   - ✅ Badge counter on icon
   - 🔊 Sound alert (may require page interaction)
   - ✅ Popup shows files

### Step 4: Check the Popup

1. Click the DotDrop extension icon
2. You should now see **up to 12 files** listed
3. If more than 12, you'll see: "... and X more (click to view all)"
4. Click the link to open full history in settings

---

## Understanding Browser Limitations

### Why No Sound?

Modern browsers block autoplay audio. To enable sound:

1. **Click on the test page first** (any click, scroll, or keystroke)
2. **Then navigate** to exposed files
3. Sound should work after user interaction

**Test it:** Visit http://localhost:8080/browser-info.html and click "Test Sound"

### Why No Auto-Popup?

Browser extensions **cannot** force popup to open automatically. You must:
- Click the extension icon to see detections
- Look for red badge number
- Check for browser notifications

### What Always Works

✅ Automatic file detection  
✅ Browser notifications  
✅ Badge counter  
✅ Visual alerts in popup  
✅ Detection history  

---

## Debug Checklist

### Sound Not Working?

1. Open browser console (F12)
2. Look for DotDrop messages:
   - `🔊 DotDrop: Alert sound triggered` = Sound attempted
   - `❌ DotDrop: Failed to play alert sound` = Browser blocked it
3. Click "Test Sound" on http://localhost:8080/browser-info.html
4. Check if sound is enabled in extension settings
5. Try clicking on the page before navigating to files

### Files Not Showing in Popup?

1. Click the extension icon manually (it doesn't auto-open)
2. Check console for detection messages
3. Verify auto-scan is enabled in settings
4. Make sure extension is active

### "Still Shows ...and 7 more"?

The old code is cached. Do a **hard reload**:
1. Go to `chrome://extensions/`
2. Click **reload icon** on DotDrop
3. Close and reopen the popup
4. Should now show 12 files before "...more"

---

## Test Coverage

The test site includes:

| Category | Files | Severity |
|----------|-------|----------|
| VCS | .git/config, .git/HEAD, .git/index | 🔴 Critical |
| Environment | .env, .env.local, .env.production | 🔴 Critical |
| SSH Keys | .ssh/id_rsa, .ssh/id_rsa.pub | 🔴 Critical |
| Cloud | .aws/credentials | 🔴 Critical |
| Config | config.php, wp-config.php, database.yml | 🟠 High |
| Backups | backup.sql, db_backup.tar.gz | 🟠 High |
| Containers | .dockerenv, docker-compose.yml | 🟡 Medium |

**Total:** 16 exposed files across 7 categories

---

## Quick Commands

```bash
# Start test server
cd test-site && ./start-server.sh

# Switch to Firefox manifest
./use-firefox-manifest.sh

# Switch back to Chrome
./use-chrome-manifest.sh

# View test site
open http://localhost:8080

# View browser info
open http://localhost:8080/browser-info.html

# Check logs
# Chrome: chrome://extensions/ → DotDrop → Inspect views: service worker
# Firefox: about:debugging → DotDrop → Inspect
```

---

## Expected Behavior

### On Test Site Visit

1. Navigate to http://localhost:8080
2. Click on `.env` link
3. **You should see:**
   - 🔔 Browser notification: "⚠️ Sensitive Files Detected"
   - 🔴 Badge with "1" on extension icon
   - 🔊 Sound (if you clicked on page first)
4. **Click extension icon:**
   - Popup shows detected file
   - Domain: http://127.0.0.1:8080
   - Files: .env listed with 🔴 icon

### Testing Multiple Files

1. Click on several files (.git/config, .ssh/id_rsa, etc.)
2. Extension accumulates detections
3. Popup should now show **up to 12 files**
4. If you've clicked 13+ files, you'll see "... and X more (click to view all)"

---

## Still Having Issues?

1. **Check console logs** (F12 → Console)
2. **View test site info page:** http://localhost:8080/browser-info.html
3. **Read browser limitations** in README troubleshooting section
4. **Try different browser** (Firefox vs Chrome)
5. **Disable other extensions** (conflict check)

---

**Happy Testing! 🔒✨**
