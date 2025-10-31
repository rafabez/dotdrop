# 🔒 DotDrop

**Browser extension that detects exposed sensitive files on websites**

[![Version](https://img.shields.io/badge/version-1.1.0-blue)](https://github.com/interzone/dotdrop)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Chrome](https://img.shields.io/badge/Chrome-Compatible-brightgreen)](https://www.google.com/chrome/)
[![Firefox](https://img.shields.io/badge/Firefox-Compatible-orange)](https://www.mozilla.org/firefox/)

---

## 🎯 Overview

DotDrop automatically scans websites for exposed sensitive files like `.git`, `.env`, SSH keys, AWS credentials, and more. Perfect for security researchers, developers, and bug bounty hunters.

**Key Features:**
- 🔍 Detects 80+ types of sensitive files
- 🚨 Real-time alerts with traffic light system (🟢🟠🔴)
- 📊 Live scan progress tracking
- 📋 One-click copy findings to clipboard
- ⏱️ Detection age/freshness timestamps
- 🥷 Stealth mode for production sites
- 📦 Batch domain scanning
- 📤 Export as JSON/CSV/Markdown
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

**Traffic Light Icon System:**
- 🟢 **GREEN** - Site scanned, no vulnerabilities found
- 🟠 **ORANGE** - Default state, not yet scanned
- 🔴 **RED** - Vulnerable files detected!

**Visual Indicators:**
- 🔢 **Badge Counter** - Shows number of exposed files
- ⏱️ **Time Ago** - "2h ago", "3d ago" freshness indicators
- 🎨 **Severity Colors** - Critical (red), Medium (yellow), Low (blue)
- 📊 **Progress Bar** - Real-time scan progress
- 👁️ **Detailed Popup** - Click icon to see all findings

**Severity Levels:**
- **CRITICAL (🔴)**: SSH keys, credentials, VCS files
- **MEDIUM (🟡)**: Configuration files, backups
- **LOW (🔵)**: Documentation, metadata

---

## ⚙️ Features

### **Popup Interface**

**📊 Live Scan Progress**
- Real-time progress counter (e.g., "42/80")
- Shows current/total paths being checked
- Updates every 500ms during active scans
- Automatically hides when scan completes

**📋 Copy Findings**
- One-click copy to clipboard
- Formatted as Markdown report
- Includes timestamps and severity breakdown
- Perfect for bug bounty submissions

**⏱️ Freshness Indicators**
- Human-readable timestamps ("2h ago", "3d ago")
- Shows detection age for each finding
- Helps track remediation progress
- Auto-updates relative time

### **Settings Page**

**🚀 Scan Settings**
- **Auto Scan**: Automatically scan pages on load
- **Critical Only**: Show only critical severity alerts
- **Stealth Mode**: Slower scanning with 500ms delays to avoid detection

**📊 Statistics Dashboard**
- Total sites scanned
- Breakdown by severity (Critical/Medium/Low)
- Most common vulnerability category
- Visual cards with color coding

**🎯 Pattern Groups**
- Enable/disable specific detection categories
- VCS, ENV, SSH, AWS, Docker, Database, Secrets, Config, Backup, CI, Shell
- Customize what to scan for your needs
- Reduce noise from unwanted checks

**📦 Batch Domain Scan**
- Scan multiple URLs at once
- Paste list of domains (one per line)
- Progress tracking with live counter
- Background tab processing

**📤 Export Options**
- **JSON**: Raw data export for automation
- **CSV**: Spreadsheet-compatible format
- **Markdown**: Formatted security report
- Direct download from browser

**📜 Detection History**
- View all past findings
- Organized by domain
- Clear history option

---

## 🔒 Privacy & Security

- ✅ **100% Local Processing** - No data sent anywhere
- ✅ **No Analytics** - Zero tracking
- ✅ **No Permissions Abuse** - Only requests what's needed
- ✅ **Open Source** - Inspect the code yourself

**Permissions:**
- `activeTab`: Access current tab to scan for vulnerabilities
- `storage`: Save your settings and scan history locally
- `host_permissions (<all_urls>)`: Scan any website for security issues (user-initiated)

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
├── manifest.json         # Extension configuration
├── background.js         # Detection logic & scanning engine
├── popup.html/js         # Extension popup with filters & progress
├── options.html/js       # Settings page with stats & export
├── popup.css             # Popup styling (terminal theme)
├── options.css           # Options page styling
├── generate_icons.py     # Icon generator (orange/red/green)
├── icons/                # Extension icons (3 states)
│   ├── icon*.png         # Orange (default)
│   ├── icon-warning*.png # Red (vulnerable)
│   └── icon-safe*.png    # Green (clean)
├── test-site/            # Mock vulnerable site for testing
└── docs/                 # Documentation
    ├── QUICKSTART.md
    ├── INSTALLATION_GUIDE.md
    ├── DESIGN.md
    ├── CONTRIBUTING.md
    └── BROWSER_LIMITATIONS.md
```

**Technical Stack:**
- Pure JavaScript (no frameworks)
- Chrome Extension Manifest V3
- Local storage for settings & history
- Fetch API for file detection
- 5-layer validation to prevent false positives

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

## 🔒 Privacy

**DotDrop respects your privacy completely:**

- ✅ **Zero Data Collection** - We don't collect, store, or transmit any user data
- ✅ **100% Local Processing** - All scanning and analysis happens on your device
- ✅ **No Analytics** - No tracking, no telemetry, no phone-home
- ✅ **No External Servers** - Extension never contacts our servers or third parties
- ✅ **Local Storage Only** - Settings and scan history stored locally using `chrome.storage.local`
- ✅ **User Control** - Clear all data anytime with the "Clear History" button
- ✅ **Open Source** - Inspect the code yourself on GitHub

### What Data is Stored Locally?

The extension stores the following **only on your device**:
- User preferences (auto-scan, stealth mode settings)
- Detection history (which sites had vulnerabilities)
- Statistics (count of vulnerable sites found)

### Network Requests

The extension makes HTTP requests **only** to websites you're actively scanning:
- Requests go directly to the target website being scanned
- Used to check if sensitive files exist (e.g., `/.git/config`, `/.env`)
- No requests to external analytics or tracking services
- All user-initiated (automatic or manual scan)

### Permissions Explained

- **activeTab**: Access current tab URL to scan for vulnerabilities
- **storage**: Save your settings and scan history locally
- **host_permissions (<all_urls>)**: Scan any website for security issues (user-initiated)

**Your privacy is our priority. We built DotDrop to be a trustworthy security tool.**

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This tool is for **ethical security research and educational purposes only**. Always obtain proper authorization before testing websites you don't own.

---

## 🆕 Recent Updates

**Version 1.1.0** - Major Feature Release

**New Features:**
- ✅ Traffic light icon system (🟢🟠🔴)
- ✅ Real-time scan progress tracking
- ✅ One-click copy findings to clipboard
- ✅ Detection age/freshness indicators
- ✅ Stealth mode for production sites
- ✅ Batch domain scanning
- ✅ Export as JSON/CSV/Markdown
- ✅ Statistics dashboard
- ✅ Pattern groups toggle

**Bug Fixes:**
- 🐛 Fixed false positives (5-layer validation)
- 🐛 Fixed "View All" button not working
- 🐛 Fixed detection history not saving
- 🐛 Fixed paths not displaying correctly

**Technical Improvements:**
- Robust content validation
- Better error handling
- Improved scan performance
- Enhanced UI/UX

---

## 🌟 Star History

If you find DotDrop useful, please star the repository!

---

**Made with 🔒 by security enthusiasts**
