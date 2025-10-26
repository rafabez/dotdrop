# 🔒 DotDrop

**Browser extension that detects exposed sensitive files on websites**

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/interzone/dotdrop)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Chrome](https://img.shields.io/badge/Chrome-Compatible-brightgreen)](https://www.google.com/chrome/)
[![Firefox](https://img.shields.io/badge/Firefox-Compatible-orange)](https://www.mozilla.org/firefox/)

---

## 🎯 Overview

DotDrop automatically scans websites for exposed sensitive files like `.git`, `.env`, SSH keys, AWS credentials, and more. Perfect for security researchers, developers, and bug bounty hunters.

**Key Features:**
- 🔍 Detects 80+ types of sensitive files
- 🚨 Real-time alerts with badge counter
- 🎨 Professional terminal-style UI
- 🔒 100% local - zero data collection
- ⚡ Lightweight and fast

---

## 🚀 Quick Start

### Installation

**Chrome / Edge / Brave:**
1. Download or clone this repository
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dotdrop` folder

**Firefox:**
1. Download or clone this repository
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select `manifest.json` from the `dotdrop` folder

### Usage

1. **Browse normally** - DotDrop scans automatically
2. **Check the badge** - Red counter = files detected
3. **Click the icon** - View detailed findings
4. **Review settings** - Configure auto-scan and filters

---

## 🔍 What It Detects

DotDrop checks for exposed:

| Category | Examples |
|----------|----------|
| **VCS Files** | `.git/`, `.svn/`, `.hg/` |
| **Credentials** | `.env`, `.htpasswd`, `id_rsa` |
| **Cloud Keys** | AWS, GCP, Azure credentials |
| **Database** | SQL dumps, MongoDB backups |
| **Configs** | Docker, Kubernetes, CI/CD |
| **Backups** | ZIP, TAR, SQL files |

**Full detection list:** See [docs/QUICKSTART.md](docs/QUICKSTART.md)

---

## 📊 Alert System

**Visual Indicators:**
- 🔴 **Badge Counter** - Shows number of exposed files
- 🎨 **Severity Colors** - Critical (red), Medium (orange), Low (blue)
- 👁️ **Detailed Popup** - Click icon to see all findings

**Severity Levels:**
- **CRITICAL (🔴)**: SSH keys, credentials, VCS files
- **MEDIUM (🟡)**: Configuration files, backups
- **LOW (🔵)**: Documentation, metadata

---

## ⚙️ Settings

Access via extension popup → "⚙️ Settings"

- **Auto Scan**: Automatically scan pages on load
- **Critical Only**: Show only critical severity alerts
- **Detection History**: View all past findings

---

## 🔒 Privacy & Security

- ✅ **100% Local Processing** - No data sent anywhere
- ✅ **No Analytics** - Zero tracking
- ✅ **No Permissions Abuse** - Only requests what's needed
- ✅ **Open Source** - Inspect the code yourself

**Permissions:**
- `activeTab`: To scan the current page
- `storage`: To save your settings

---

## 📚 Documentation

- [Quick Start Guide](docs/QUICKSTART.md) - Get started quickly
- [Installation Guide](docs/INSTALLATION_GUIDE.md) - Detailed installation steps
- [Design System](docs/DESIGN.md) - UI/UX design principles
- [Contributing](docs/CONTRIBUTING.md) - How to contribute
- [Browser Limitations](docs/BROWSER_LIMITATIONS.md) - Technical constraints

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/interzone/dotdrop.git
cd dotdrop

# Test with local server
cd test-site
./start-server.sh
# Visit http://localhost:8080

# Make changes and reload extension
# Chrome: chrome://extensions/ → Reload
# Firefox: about:debugging → Reload
```

**Project Structure:**
```
dotdrop/
├── manifest.json       # Extension configuration
├── background.js       # Detection logic
├── popup.html/js       # Extension popup
├── options.html/js     # Settings page
├── content.js          # Content script
├── icons/              # Extension icons
├── test-site/          # Mock vulnerable site
└── docs/               # Documentation
```

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) first.

**Ways to contribute:**
- 🐛 Report bugs
- 💡 Suggest features
- 🔍 Add detection patterns
- 📝 Improve documentation
- 🎨 Enhance UI/UX

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This tool is for **ethical security research and educational purposes only**. Always obtain proper authorization before testing websites you don't own.

---

## 🌟 Star History

If you find DotDrop useful, please star the repository!

---

**Made with 🔒 by security enthusiasts**
