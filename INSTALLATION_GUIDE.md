# 📦 DotDrop Installation Guide

## Quick Installation (Developer Mode)

### For Chrome / Edge / Brave

```bash
# 1. Clone the repository
git clone https://github.com/interzone/dotdrop.git
cd dotdrop

# 2. Generate icons
python3 generate_icons.py

# 3. Open browser extensions page
#    Chrome: chrome://extensions/
#    Edge: edge://extensions/
#    Brave: brave://extensions/

# 4. Enable "Developer mode" (toggle in top-right)

# 5. Click "Load unpacked"

# 6. Select the dotdrop folder

# ✅ Done! Extension is now active
```

### For Firefox

```bash
# 1. Clone the repository
git clone https://github.com/interzone/dotdrop.git
cd dotdrop

# 2. Generate icons
python3 generate_icons.py

# 3. Open Firefox debugging page
#    Type: about:debugging#/runtime/this-firefox

# 4. Click "Load Temporary Add-on..."

# 5. Select the manifest.json file

# ✅ Done! Extension is now active (until browser restart)
```

## Visual Installation Steps

### Chrome Installation (Detailed)

1. **Clone & Setup**
   ```
   Terminal → git clone → cd dotdrop → python3 generate_icons.py
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
   ✓ Purple lock icon 🔒 in toolbar
   ✓ Status shows "Enabled"
   ```

### Firefox Installation (Detailed)

1. **Clone & Setup**
   ```
   Terminal → git clone → cd dotdrop → python3 generate_icons.py
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
   ✓ Purple lock icon 🔒 in toolbar
   ✓ Shows version 1.0.0
   ```

## Common Issues

### Issue: "python3: command not found"

**Windows:**
```bash
python generate_icons.py  # Use 'python' instead of 'python3'
```

**Mac/Linux:**
```bash
# Install Python
# Mac: brew install python3
# Ubuntu: sudo apt-get install python3
# Fedora: sudo dnf install python3
```

### Issue: "No module named 'PIL'"

```bash
pip3 install Pillow
# or
pip install Pillow
```

### Issue: Icons not appearing

```bash
# Verify icons directory exists
ls -la icons/

# If empty, regenerate
python3 generate_icons.py

# Should see 8 icon files
```

### Issue: Extension not loading

**Chrome/Edge/Brave:**
- Make sure you selected the FOLDER, not a file
- Check manifest.json exists in root
- Disable antivirus temporarily

**Firefox:**
- Make sure you selected manifest.json FILE, not folder
- Check browser console for errors
- Try Firefox Developer Edition

### Issue: "background.service_worker is currently disabled"

**Firefox compatibility fix:**

```bash
# Use Firefox-compatible manifest
./use-firefox-manifest.sh

# Then reload the extension in Firefox
```

This switches to Manifest V2 which Firefox fully supports.

To switch back for Chrome: `./use-chrome-manifest.sh`

## What's Next?

After installation:

1. **Test the extension:**
   - Visit any website
   - Click the DotDrop icon
   - Check for detections

2. **Configure settings:**
   - Click DotDrop icon → Settings
   - Adjust notification preferences
   - Enable/disable sound alerts

3. **Start scanning:**
   - Auto-scan works automatically
   - Or use manual "Scan Now" button

## Need Help?

- 📖 Read the [full README](README.md)
- 🚀 Check the [Quick Start Guide](QUICKSTART.md)
- 🐛 [Report an issue](https://github.com/interzone/dotdrop/issues)

---

**Happy Scanning! 🔒✨**
