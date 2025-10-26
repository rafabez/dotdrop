# 📦 DotDrop Installation Guide

## Quick Installation (Developer Mode)

### For Chrome / Edge / Brave

```bash
# 1. Clone the repository
git clone https://github.com/interzone/dotdrop.git
cd dotdrop

# 2. Open browser extensions page
#    Chrome: chrome://extensions/
#    Edge: edge://extensions/
#    Brave: brave://extensions/

# 3. Enable "Developer mode" (toggle in top-right)

# 4. Click "Load unpacked"

# 5. Select the dotdrop folder

# ✅ Done! Extension is now active
```

### For Firefox

```bash
# 1. Clone the repository
git clone https://github.com/interzone/dotdrop.git
cd dotdrop

# 2. Open Firefox debugging page
#    Type: about:debugging#/runtime/this-firefox

# 3. Click "Load Temporary Add-on..."

# 4. Select the manifest.json file

# ✅ Done! Extension is now active (until browser restart)
```

## Visual Installation Steps

### Chrome Installation (Detailed)

1. **Clone Repository**
   ```
   Terminal → git clone → cd dotdrop
   ```

2. **Open Extensions**
   ```
   Browser → Three dots menu → More Tools → Extensions
   OR type in address bar: chrome://extensions/
   ```

3. **Enable Developer Mode**
   ```
   Look at top-right corner → Toggle "Developer mode" to ON
   ```

4. **Load Extension**
   ```
   Click "Load unpacked" button → Navigate to dotdrop folder → Click "Select Folder"
   ```

5. **Verify**
   ```
   ✓ DotDrop appears in extension list
   ✓ Orange lock icon 🔒 in toolbar
   ✓ Status shows "Enabled"
   ```

### Firefox Installation (Detailed)

1. **Clone Repository**
   ```
   Terminal → git clone → cd dotdrop
   ```

2. **Open Debugging Page**
   ```
   Browser → Type in address bar: about:debugging
   Click "This Firefox" in left sidebar
   OR directly: about:debugging#/runtime/this-firefox
   ```

3. **Load Extension**
   ```
   Click "Load Temporary Add-on..." → Navigate to dotdrop folder
   Select "manifest.json" file → Click "Open"
   ```

4. **Verify**
   ```
   ✓ DotDrop appears under "Temporary Extensions"
   ✓ Orange lock icon 🔒 in toolbar
   ✓ Shows version 1.0.0
   ```

## Common Issues

### Issue: Extension not loading

**Chrome/Edge/Brave:**
- Make sure you selected the FOLDER, not a file
- Check manifest.json exists in root
- Disable antivirus temporarily

**Firefox:**
- Make sure you selected manifest.json FILE, not folder
- Check browser console for errors
- Try Firefox Developer Edition

## What's Next?

After installation:

1. **Test the extension:**
   - Visit any website
   - Click the DotDrop icon
   - Check for detections

2. **Configure settings:**
   - Click DotDrop icon → Settings
   - Adjust notification preferences

3. **Start scanning:**
   - Auto-scan works automatically
   - Or use manual "Scan Now" button

## Need Help?

- 📖 Read the [full README](README.md)
- 🚀 Check the [Quick Start Guide](QUICKSTART.md)
- 🐛 [Report an issue](https://github.com/interzone/dotdrop/issues)

---

**Happy Scanning! 🔒✨**
