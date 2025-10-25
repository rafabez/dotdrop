# 🚀 Quick Start Guide - DotDrop

Get started with DotDrop in 5 minutes!

## 📦 Installation

### For Chrome/Edge/Brave

1. **Clone or download** this repository
2. **Open your browser** and go to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select the `dotdrop` folder
6. ✅ Done! The extension is now active

### For Firefox

1. **Clone or download** this repository
2. Open Firefox and go to: `about:debugging#/runtime/this-firefox`
3. Click **"Load Temporary Add-on"**
4. Select the `manifest.json` file from the `dotdrop` folder
5. ✅ Done! The extension is now active

## 🎯 First Steps

### 1. Test the Extension

Visit any website and the extension will automatically scan for exposed files.

**Test sites** (for demonstration purposes):
- Any site with publicly exposed `.git` folder
- Your own test server with exposed configuration files

### 2. Check Detections

- Click the **DotDrop icon** in your browser toolbar
- View any detections in the popup
- Red badge = files detected!
- Green "Safe" = no exposures found

### 3. Explore Settings

1. Click the DotDrop icon
2. Click **"⚙️ Settings"**
3. Customize:
   - Toggle sound alerts
   - Enable/disable notifications
   - Set auto-scan preferences
   - View detection history

## 🔔 Understanding Alerts

### Alert Levels

- 🔴 **Critical**: Exposed credentials, keys, or VCS files
- 🟡 **Medium**: Configuration files and backups
- 🔵 **Low**: Package manager files

### Alert Types

1. **Browser Notifications**: Desktop notifications when files are detected
2. **Sound Alerts**: Triple-beep audio alert
3. **Badge Counter**: Shows number of detections on icon
4. **Icon Color**: Changes to red when exposures are found

## 📊 What Does It Detect?

### Critical Exposures
- `.git`, `.svn`, `.hg` folders (Version control)
- `.env` files (Environment variables)
- SSH private keys (`id_rsa`, `id_dsa`, etc.)
- AWS credentials
- Database files (`.sqlite`, `.db`)
- `secrets.yml`, `password.txt`
- `wp-config.php` (WordPress)

### Medium Risk
- Docker configuration files
- `.htaccess`, `web.config`
- Backup files (`.bak`, `.backup`)
- Configuration files

### Low Risk
- Package manager files (`package.json`, `composer.json`, etc.)
- `.DS_Store`, `Thumbs.db`

## 🛠️ Common Tasks

### Manual Scan
1. Visit any website
2. Click the DotDrop icon
3. Click **"🔍 Scan Now"**

### Clear History
1. Click the DotDrop icon
2. Click **"⚙️ Settings"**
3. Click **"🗑️ Clear History"**

### Disable Alerts
1. Click the DotDrop icon
2. Click **"⚙️ Settings"**
3. Toggle off:
   - 🔔 Browser Notifications
   - 🔊 Sound Alerts

### Turn Off Auto-Scan
1. Open Settings
2. Toggle off **"🚀 Auto Scan"**
3. You'll need to manually scan sites

## ⚠️ Important Notes

### Privacy
- All scanning happens **locally** in your browser
- **No data** is sent to external servers
- **No tracking** or analytics

### Performance
- Scanning may cause a slight delay on slow connections
- Large numbers of checks may trigger rate limiting on some servers
- You can disable auto-scan if needed

### False Positives
- Legitimate files with similar names may trigger alerts
- Review each detection carefully
- Not all detections indicate a security issue

## 🐛 Troubleshooting

### Extension Not Working?
1. Check that it's enabled in `chrome://extensions/` or `about:addons`
2. Try disabling and re-enabling
3. Reload the extension
4. Check browser console for errors

### No Alerts?
1. Check settings - alerts might be disabled
2. Visit a site with known exposed files
3. Try manual scan

### Scans Failing?
1. Check your internet connection
2. Some sites block requests (CORS)
3. Site may be rate-limiting requests

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Report issues on GitHub
- Star the repo if you find it useful! ⭐

## 💡 Tips

1. **Enable all alerts** initially to understand how the extension works
2. **Review detection history** regularly in Settings
3. **Test on your own sites** first to understand behavior
4. **Report false positives** to help improve the extension
5. **Use responsibly** - only scan sites you're authorized to test

## 🔗 Quick Links

- [Full Documentation](README.md)
- [Contributing Guide](CONTRIBUTING.md)
- [License](LICENSE)
- [Report Issues](https://github.com/yourusername/dotdrop/issues)

---

**Ready to secure your browsing? Let's go! 🚀**
