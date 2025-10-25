# 🔒 DotDrop - Sensitive File Detector

<div align="center">

**A powerful browser extension that detects and alerts you about exposed sensitive files on websites**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome](https://img.shields.io/badge/Chrome-Compatible-brightgreen)
![Firefox](https://img.shields.io/badge/Firefox-Compatible-orange)

</div>

## 🎯 Overview

DotDrop is a security-focused browser extension designed to automatically detect exposed sensitive files and configuration data on websites you visit. It helps security researchers, developers, and privacy-conscious users identify potential security vulnerabilities by checking for commonly exposed files like `.git`, `.env`, SSH keys, and many more.

## ✨ Features

### 🔍 Comprehensive Detection

DotDrop checks for multiple categories of sensitive files:

- **Version Control Systems**
  - `.git` folders (config, HEAD, index, logs)
  - `.svn` folders (Subversion)
  - `.hg` folders (Mercurial)

- **Environment & Configuration Files**
  - `.env` and variants (.env.local, .env.production, etc.)
  - `config.json`, `config.yml`, `config.yaml`
  - `web.config`, `.htaccess`, `.htpasswd`
  - `phpinfo.php`

- **Credentials & Secrets**
  - AWS credentials (`.aws/credentials`, `.aws/config`)
  - SSH private keys (`id_rsa`, `id_dsa`, `id_ecdsa`, `id_ed25519`)
  - `secrets.yml`, `secrets.json`
  - Password files

- **Database Files**
  - SQLite databases (`.sqlite`, `.sqlite3`, `.db`)
  - Database configuration files (`database.yml`)

- **Docker Configuration**
  - `.docker/config.json`
  - `docker-compose.yml`
  - `Dockerfile`

- **Package Manager Files**
  - `.npmrc`, `.pypirc`
  - `package.json`, `package-lock.json`
  - `composer.json`, `composer.lock`
  - `Gemfile`, `Gemfile.lock`
  - `requirements.txt`, `Pipfile`
  - `pom.xml`, `build.gradle`

- **WordPress Configuration**
  - `wp-config.php` and backups

- **Backup & Temporary Files**
  - `.DS_Store`, `Thumbs.db`
  - `.backup`, `.bak`, `.sql` files

- **Shell Configuration** (optional)
  - `.bashrc`, `.bash_profile`, `.bash_history`
  - `.zshrc`, `.profile`

### 🚨 Alert System

- **Browser Notifications**: Get instant notifications when sensitive files are detected
- **Sound Alerts**: Audible alerts with distinctive tones for critical exposures
- **Visual Indicators**: Badge counter and icon color changes
- **Severity Levels**: Critical, Medium, and Low severity classifications

### 🎨 Beautiful UI

- **Modern Design**: Gradient-based purple theme with smooth animations
- **Popup Interface**: Quick overview of current site status and recent detections
- **Settings Page**: Comprehensive settings and detailed detection history
- **Real-time Updates**: Live badge updates as you browse

### ⚙️ Configurable Settings

- Toggle individual alert types (notifications, sound)
- Enable/disable auto-scanning on page load
- Critical-only mode for reduced noise
- View detailed detection history
- Clear detection history

## 📦 Installation

### Chrome/Edge/Brave

1. Download or clone this repository:
   ```bash
   git clone https://github.com/yourusername/dotdrop.git
   cd dotdrop
   ```

2. Generate icons (if not already present):
   ```bash
   python3 generate_icons.py
   ```

3. Open Chrome/Edge/Brave and navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

4. Enable "Developer mode" (toggle in top right)

5. Click "Load unpacked" and select the `dotdrop` folder

6. The extension is now installed! 🎉

### Firefox

1. Download or clone this repository:
   ```bash
   git clone https://github.com/yourusername/dotdrop.git
   cd dotdrop
   ```

2. Generate icons:
   ```bash
   python3 generate_icons.py
   ```

3. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`

4. Click "Load Temporary Add-on"

5. Select the `manifest.json` file from the `dotdrop` folder

6. The extension is now installed! 🎉

**Note**: For permanent installation in Firefox, you'll need to sign the extension through Mozilla's Add-on portal.

## 🚀 Usage

### Automatic Scanning

By default, DotDrop automatically scans every website you visit. If any sensitive files are detected:

1. A browser notification will appear (if enabled)
2. A sound alert will play (if enabled)
3. The extension icon will change to red/warning state
4. A badge will show the number of detected files

### Manual Scanning

Click the extension icon and press the **"🔍 Scan Now"** button to manually scan the current website.

### Viewing Detections

1. Click the extension icon to see a quick summary
2. Click **"View All"** or **"⚙️ Settings"** to see detailed detection history
3. Each detection shows:
   - Domain name
   - Severity level
   - List of exposed files
   - Detection timestamp

### Configuring Settings

1. Click the extension icon
2. Click **"⚙️ Settings"**
3. Configure your preferences:
   - Toggle notifications on/off
   - Enable/disable sound alerts
   - Enable/disable auto-scanning
   - Set critical-only mode

## 🛡️ Security & Privacy

- **Local Processing**: All scanning and detection happens locally in your browser
- **No Data Collection**: DotDrop does not collect, store, or transmit any data externally
- **No Telemetry**: No usage statistics or analytics are collected
- **Open Source**: Fully open source - inspect the code yourself!

## 🔧 Development

### Prerequisites

- Python 3.6+ (for icon generation)
- PIL/Pillow library: `pip install Pillow`
- Modern web browser (Chrome/Firefox/Edge/Brave)

### Project Structure

```
dotdrop/
├── manifest.json          # Extension manifest (Manifest V3)
├── background.js          # Service worker for detection logic
├── content.js            # Content script for page analysis
├── popup.html            # Popup interface HTML
├── popup.js              # Popup interface logic
├── options.html          # Settings page HTML
├── options.js            # Settings page logic
├── generate_icons.py     # Icon generator script
├── create-icons.html     # Alternative browser-based icon generator
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon-warning*.png
└── README.md            # This file
```

### Building

1. Clone the repository
2. Run `python3 generate_icons.py` to generate icons
3. Load the extension in your browser using the installation instructions above

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 Detection Categories

The extension organizes detections into the following categories:

| Category | Severity | Default State | Description |
|----------|----------|---------------|-------------|
| VCS | Critical | Enabled | Version control system files (.git, .svn, .hg) |
| Environment | Critical | Enabled | Environment configuration files (.env) |
| AWS | Critical | Enabled | AWS credentials and configuration |
| SSH | Critical | Enabled | SSH private keys |
| Database | Critical | Enabled | Database files and configuration |
| Secrets | Critical | Enabled | Secret files and passwords |
| Docker | Medium | Enabled | Docker configuration files |
| Config | Medium | Enabled | General configuration files |
| WordPress | Critical | Enabled | WordPress configuration |
| Backup | Medium | Enabled | Backup and temporary files |
| Package Managers | Low | Enabled | Package manager files |
| Shell | Medium | Disabled | Shell configuration files |

## 🎵 Sound Alerts

DotDrop uses Web Audio API to generate distinctive alert sounds:
- Three-tone ascending beep sequence for attention
- Non-intrusive volume level (30%)
- Can be toggled on/off in settings

## 🐛 Known Issues & Limitations

- **CORS Restrictions**: Some sites may block HEAD/GET requests due to CORS policies
- **False Positives**: Legitimate files with similar names may trigger alerts
- **Performance**: Scanning many paths may cause slight delays on slower connections
- **Rate Limiting**: Some servers may rate-limit repeated requests

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Custom detection rules
- [ ] Whitelist/blacklist domains
- [ ] Export detection reports
- [ ] Integration with security tools
- [ ] Advanced pattern matching
- [ ] Cloud synchronization of settings
- [ ] Browser sync across devices
- [ ] Scheduled scanning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the [DotGit](https://github.com/davtur19/DotGit) extension
- Built with modern web technologies
- Icons generated using PIL/Pillow

## 📧 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/dotdrop/issues) page
2. Create a new issue with detailed information
3. Include browser version and extension version

## ⚠️ Disclaimer

This tool is intended for security research and educational purposes. Always obtain proper authorization before scanning websites you do not own or have permission to test. The authors are not responsible for any misuse of this tool.

---

<div align="center">

**Made with ❤️ for the security community**

⭐ Star this repo if you find it useful!

</div>
