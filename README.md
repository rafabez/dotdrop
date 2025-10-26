# 🔒 DotDrop - Sensitive File Detector

<div align="center">

![DotDrop Logo](https://img.shields.io/badge/🔒-DotDrop-blueviolet?style=for-the-badge)

**A powerful browser extension that detects and alerts you about exposed sensitive files on websites**

![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Compatible-brightgreen?style=flat-square&logo=googlechrome)
![Firefox](https://img.shields.io/badge/Firefox-Compatible-orange?style=flat-square&logo=firefoxbrowser)
![Edge](https://img.shields.io/badge/Edge-Compatible-0078D7?style=flat-square&logo=microsoftedge)
![Brave](https://img.shields.io/badge/Brave-Compatible-FB542B?style=flat-square&logo=brave)

---

### 🎯 **Protect Your Privacy | Detect Security Leaks | Stay Safe Online**

</div>

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Installation](#-installation-developer-mode)
  - [Chrome / Edge / Brave](#option-1-chrome--edge--brave-chromium-browsers)
  - [Firefox](#option-2-firefox)
  - [Troubleshooting](#-troubleshooting-installation-issues)
- [Usage Guide](#-usage-guide)
- [What It Detects](#-what-does-it-detect)
- [Alert System](#-alert-system)
- [Screenshots](#-screenshots)
- [Security & Privacy](#️-security--privacy)
- [Development](#-development)
- [FAQ](#-frequently-asked-questions)
- [Contributing](#-contributing)
- [License](#-license)

</div>

## 🎯 Overview

**DotDrop** is a security-focused browser extension designed to automatically detect exposed sensitive files and configuration data on websites you visit. It helps security researchers, developers, and privacy-conscious users identify potential security vulnerabilities by checking for commonly exposed files like `.git`, `.env`, SSH keys, and many more.

### 🎭 Why DotDrop?

- 🔍 **Automatic Detection**: Scans every site you visit for 80+ types of exposed files
- 🚨 **Instant Alerts**: Get notified immediately with sound and visual warnings
- 🎨 **Beautiful Interface**: Modern, intuitive UI with severity-based color coding
- 🔒 **Privacy First**: All processing happens locally - zero data collection
- 🛡️ **Security Research**: Perfect tool for penetration testers and security auditors
- ⚡ **Lightning Fast**: Efficient batch scanning with minimal performance impact

### 🌟 Key Highlights

| Feature | Description |
|---------|-------------|
| **80+ Detection Patterns** | Covers VCS files, credentials, configs, databases, and more |
| **3 Severity Levels** | Critical (🔴), Medium (🟡), Low (🔵) classification |
| **Multi-Browser Support** | Works on Chrome, Firefox, Edge, Brave, Opera |
| **Sound Alerts** | Triple-beep audio warning for critical exposures |
| **Visual Notifications** | Browser notifications with detailed information |
| **Detection History** | Persistent log of all discovered vulnerabilities |
| **Customizable Settings** | Toggle alerts, auto-scan, and filter by severity |
| **Open Source** | MIT licensed - inspect and modify the code freely |

## ✨ Key Features

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

## 📦 Installation (Developer Mode)

> **Note**: These instructions are for installing the extension in **Developer/Debug Mode** without publishing to browser stores. This allows you to use and test the extension locally on your machine.

### 📋 Prerequisites

Before installing, ensure you have:

- ✅ **Git** installed on your system
- ✅ **Python 3.6+** (for generating icons)
- ✅ **Pillow library**: Install with `pip install Pillow` or `pip3 install Pillow`
- ✅ A compatible browser (Chrome, Firefox, Edge, or Brave)

---

## Option 1: Chrome / Edge / Brave (Chromium Browsers)

### Step 1: Download the Extension

Open your terminal and run:

```bash
# Clone the repository
git clone https://github.com/interzone/dotdrop.git

# Navigate into the directory
cd dotdrop

# Generate extension icons
python3 generate_icons.py
```

**Expected Output:**
```
Generated icon16.png
Generated icon32.png
Generated icon48.png
Generated icon128.png
Generated icon-warning16.png
Generated icon-warning32.png
Generated icon-warning48.png
Generated icon-warning128.png

All icons generated successfully!
```

### Step 2: Open Browser Extensions Page

Choose your browser and navigate to the extensions page:

| Browser | URL to Type/Paste | Alternative Method |
|---------|-------------------|-------------------|
| **Chrome** | `chrome://extensions/` | Menu → More Tools → Extensions |
| **Edge** | `edge://extensions/` | Menu → Extensions |
| **Brave** | `brave://extensions/` | Menu → Extensions |
| **Opera** | `opera://extensions/` | Menu → Extensions |

### Step 3: Enable Developer Mode

1. Look for the **"Developer mode"** toggle in the **top-right corner** of the extensions page
2. Click the toggle to turn it **ON**
3. You should see new buttons appear: "Load unpacked", "Pack extension", "Update"

### Step 4: Load the Extension

1. Click the **"Load unpacked"** button
2. A file browser window will open
3. Navigate to the `dotdrop` folder you cloned earlier
4. Select the **entire folder** (not individual files) and click **"Select Folder"** or **"Open"**

### Step 5: Verify Installation

You should now see:

- ✅ **DotDrop** listed in your extensions
- ✅ A purple lock icon 🔒 in your browser toolbar
- ✅ Status showing "Enabled"
- ✅ No errors displayed

### 🎉 Success!

The extension is now active and will automatically scan websites as you browse!

---

## Option 2: Firefox

### Step 1: Download the Extension

Open your terminal and run:

```bash
# Clone the repository
git clone https://github.com/interzone/dotdrop.git

# Navigate into the directory
cd dotdrop

# Generate extension icons
python3 generate_icons.py
```

### Step 2: Open Firefox Debugging Page

In Firefox, navigate to:

```
about:debugging#/runtime/this-firefox
```

**Alternative methods:**
- Type `about:debugging` in the address bar → Click "This Firefox" in the sidebar
- Menu → More Tools → Developer Tools → Click the 3-dot menu → "This Firefox"

### Step 3: Load Temporary Add-on

1. Click the **"Load Temporary Add-on..."** button
2. A file browser window will open
3. Navigate to the `dotdrop` folder
4. Select the **`manifest.json`** file (important: select manifest.json, not the folder)
5. Click **"Open"**

### Step 4: Verify Installation

You should now see:

- ✅ **DotDrop** listed under "Temporary Extensions"
- ✅ A purple lock icon 🔒 in your browser toolbar
- ✅ Extension details showing version 1.0.0
- ✅ No error messages

### ⚠️ Important Notes for Firefox

**Temporary Installation:**
- The extension will be **removed when you close Firefox**
- You'll need to reload it each time you restart the browser
- This is Firefox's security measure for unsigned extensions

**For Permanent Installation:**
- Sign the extension through [Mozilla's Add-on Developer Hub](https://addons.mozilla.org/developers/)
- Or use [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) tool for development
- Alternatively, use [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or [Firefox Nightly](https://www.mozilla.org/firefox/nightly/) with signing disabled

### 🎉 Success!

The extension is now active until you close Firefox!

---

## 🔧 Troubleshooting Installation Issues

### Problem: Icons Not Generating

**Error:** `ModuleNotFoundError: No module named 'PIL'`

**Solution:**
```bash
# Install Pillow library
pip3 install Pillow

# Or using pip
pip install Pillow

# For Ubuntu/Debian users
sudo apt-get install python3-pil

# For macOS users with Homebrew
brew install pillow
```

---

### Problem: Extension Won't Load (Chrome/Edge/Brave)

**Error:** "Manifest file is missing or unreadable"

**Solutions:**
1. Ensure you selected the **folder** containing manifest.json, not the file itself
2. Check that manifest.json exists in the root of the dotdrop folder
3. Verify the JSON syntax is valid (no missing commas or brackets)
4. Try disabling antivirus temporarily (it may be blocking file access)

**Error:** "Icons not found"

**Solution:**
```bash
# Navigate to the extension directory
cd /path/to/dotdrop

# Run icon generator
python3 generate_icons.py

# Verify icons were created
ls -la icons/
```

---

### Problem: Extension Won't Load (Firefox)

**Error:** "Reading manifest: Error processing icons"

**Solution:**
- Ensure all icon files exist in the `icons/` folder
- Run `python3 generate_icons.py` to regenerate icons
- Select `manifest.json` file, not the folder

**Error:** "There was an error during installation"

**Solutions:**
1. Check the browser console for detailed error messages
2. Verify manifest.json syntax
3. Ensure all referenced files (background.js, content.js, etc.) exist
4. Try using Firefox Developer Edition for better debugging

**Error:** "background.service_worker is currently disabled. Add background.scripts."

**Solution:**
Firefox has limited Manifest V3 support. Use the Firefox-compatible manifest:

```bash
# Switch to Firefox-compatible manifest
./use-firefox-manifest.sh

# Or manually:
cp manifest_firefox.json manifest.json

# Then load in Firefox
```

To switch back to Chrome:
```bash
./use-chrome-manifest.sh
```

**Note:** The default `manifest.json` now includes both `service_worker` and `scripts` for cross-browser compatibility. If you still get this error, use the Firefox-specific manifest above.

---

### Problem: Extension Doesn't Appear in Toolbar

**Solution:**
1. Right-click on the toolbar
2. Select "Customize..." or "Customize Toolbar"
3. Look for the DotDrop icon and drag it to the toolbar
4. Or click the Extensions puzzle piece icon and pin DotDrop

---

### Problem: Python Not Found

**Error:** `python3: command not found`

**Solutions:**

**Windows:**
```bash
# Try using 'python' instead of 'python3'
python generate_icons.py

# Or download Python from python.org
```

**macOS:**
```bash
# Install Python via Homebrew
brew install python3

# Or download from python.org
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install python3 python3-pip

# Fedora
sudo dnf install python3 python3-pip

# Arch Linux
sudo pacman -S python python-pip
```

---

### Problem: Extension Not Scanning

**Possible Causes:**
1. **Auto-scan is disabled** → Click extension icon → Settings → Enable "Auto Scan"
2. **Site uses HTTPS with strict CORS** → Some sites block cross-origin requests
3. **Extension is paused** → Check that it's enabled in extensions page
4. **Browser is blocking requests** → Check browser console for errors

---

### Still Having Issues?

1. **Check the browser console:**
   - Right-click on the extension icon → "Inspect popup"
   - Look for red error messages

2. **View background worker logs:**
   - **Chrome/Edge/Brave:** Go to `chrome://extensions/` → Click "Details" on DotDrop → "Inspect views: service worker"
   - **Firefox:** Go to `about:debugging#/runtime/this-firefox` → Click "Inspect" under DotDrop

3. **Reload the extension:**
   - Go to extensions page
   - Click the reload/refresh icon for DotDrop
   - Or toggle it off and on

4. **Create an issue:**
   - Visit the [GitHub Issues](https://github.com/interzone/dotdrop/issues) page
   - Include: Browser version, error messages, and steps to reproduce

## 🚀 Usage Guide

### 🔄 Automatic Scanning

By default, DotDrop automatically scans every website you visit in real-time.

**When files are detected, you'll receive:**

| Alert Type | Description | Can Be Disabled |
|------------|-------------|-----------------|
| 🔔 **Browser Notification** | Desktop notification with file details | ✅ Yes |
| 🔊 **Sound Alert** | Triple-beep audio warning (800-1200 Hz) | ✅ Yes |
| 🔴 **Icon Change** | Extension icon turns red | ❌ No |
| 🔢 **Badge Counter** | Shows number of exposures found | ❌ No |

### 🔍 Manual Scanning

Don't want to wait? Scan any website on-demand:

1. **Click** the DotDrop icon 🔒 in your browser toolbar
2. **Click** the **"🔍 Scan Now"** button
3. Wait a few seconds while the scan completes
4. Results will appear in the popup

**Pro Tip:** Manual scanning is useful when:
- You've disabled auto-scan
- You want to re-check a site
- Testing your own web applications

### 📊 Viewing Detections

#### Quick View (Popup)

1. **Click** the DotDrop extension icon
2. See current site status at the top:
   - ✓ **Safe** (green) - No exposures found
   - ⚠️ **X Issues** (yellow) - Non-critical files found
   - ⚠️ **X Critical** (red, pulsing) - Critical exposures detected!
3. Scroll to see recent detections from other sites
4. Click any detection to see file details

#### Detailed View (Settings Page)

1. **Click** the DotDrop icon
2. **Click** **"⚙️ Settings"** or **"View All"**
3. See complete detection history with:
   - Full domain names
   - All detected files per site
   - File categories (VCS, Environment, SSH, etc.)
   - Severity levels with color coding
   - First detection timestamp
4. **Export** or **clear** history as needed

### ⚙️ Configuring Settings

Customize DotDrop to fit your workflow:

1. **Click** the DotDrop icon
2. **Click** **"⚙️ Settings"**
3. Adjust preferences:

| Setting | Description | Default |
|---------|-------------|---------|
| 🔔 **Browser Notifications** | Show desktop notifications when files are detected | ✅ ON |
| 🔊 **Sound Alerts** | Play audio alerts for detections | ✅ ON |
| 🚀 **Auto Scan** | Automatically scan sites as you browse | ✅ ON |
| 🔴 **Critical Only** | Only alert for critical severity exposures | ❌ OFF |

4. **Click** **"💾 Save Settings"** to apply changes

### 🎯 Use Cases

**For Security Researchers:**
```
✓ Quickly identify exposed configuration files during recon
✓ Monitor bug bounty targets for new exposures
✓ Generate reports of vulnerable sites
```

**For Developers:**
```
✓ Test your own sites before deployment
✓ Ensure .git folders are properly blocked
✓ Verify environment files aren't accessible
```

**For Privacy-Conscious Users:**
```
✓ Stay informed about site security
✓ Avoid sites with poor security practices
✓ Report findings to site administrators
```

## 🔍 What Does It Detect?

DotDrop checks for **80+ sensitive file patterns** across **12 categories**:

### 🔴 Critical Severity Files

| Category | Example Files | Risk Level |
|----------|---------------|------------|
| **Version Control** | `.git/config`, `.git/HEAD`, `.svn/entries`, `.hg/requires` | 🔴 CRITICAL |
| **Environment Files** | `.env`, `.env.local`, `.env.production`, `env.js` | 🔴 CRITICAL |
| **SSH Keys** | `id_rsa`, `id_dsa`, `id_ecdsa`, `id_ed25519` | 🔴 CRITICAL |
| **AWS Credentials** | `.aws/credentials`, `.aws/config`, `credentials.json` | 🔴 CRITICAL |
| **Database Files** | `database.yml`, `*.sqlite`, `*.sqlite3`, `*.db` | 🔴 CRITICAL |
| **Secrets** | `secrets.yml`, `secrets.json`, `password.txt` | 🔴 CRITICAL |
| **WordPress** | `wp-config.php`, `wp-config.php.bak` | 🔴 CRITICAL |

### 🟡 Medium Severity Files

| Category | Example Files | Risk Level |
|----------|---------------|------------|
| **Docker** | `.docker/config.json`, `docker-compose.yml`, `Dockerfile` | 🟡 MEDIUM |
| **Configuration** | `config.json`, `.htaccess`, `.htpasswd`, `web.config` | 🟡 MEDIUM |
| **Backup Files** | `.DS_Store`, `Thumbs.db`, `*.bak`, `*.backup`, `dump.sql` | 🟡 MEDIUM |
| **Shell Config** | `.bashrc`, `.bash_profile`, `.bash_history`, `.zshrc` | 🟡 MEDIUM |

### 🔵 Low Severity Files

| Category | Example Files | Risk Level |
|----------|---------------|------------|
| **Package Managers** | `package.json`, `composer.json`, `requirements.txt`, `pom.xml` | 🔵 LOW |

### 📝 Detection Details by Category

<details>
<summary><b>🔓 Version Control Systems (8 paths)</b></summary>

```
.git/config          # Git configuration and remote URLs
.git/HEAD           # Current branch pointer
.git/index          # Staging area with file paths
.git/logs/HEAD      # Complete commit history
.svn/entries        # Subversion file listing
.svn/wc.db          # Subversion working copy database
.hg/requires        # Mercurial repository info
.hg/store/00manifest.i  # Mercurial file manifest
```
**Why dangerous:** Exposes entire source code, commit history, developer info, and deployment configurations.
</details>

<details>
<summary><b>🌍 Environment Variables (7 paths)</b></summary>

```
.env                # Main environment file
.env.local          # Local overrides
.env.production     # Production settings
.env.development    # Development settings
.env.test           # Test environment
env.js              # JavaScript environment config
environment.yml     # YAML environment config
```
**Why dangerous:** Contains API keys, database passwords, secret tokens, and service credentials.
</details>

<details>
<summary><b>🔑 SSH Keys (8 paths)</b></summary>

```
.ssh/id_rsa         # RSA private key
.ssh/id_dsa         # DSA private key
.ssh/id_ecdsa       # ECDSA private key
.ssh/id_ed25519     # Ed25519 private key
id_rsa              # Exposed RSA key
id_rsa.pub          # Public key (reveals username)
```
**Why dangerous:** Grants server access, allows impersonation, compromises entire infrastructure.
</details>

<details>
<summary><b>☁️ AWS Credentials (3 paths)</b></summary>

```
.aws/credentials    # AWS access keys
.aws/config         # AWS configuration
credentials.json    # Generic credentials file
```
**Why dangerous:** Full access to AWS resources, potential for massive data breaches and financial damage.
</details>

<details>
<summary><b>🗄️ Database Files (6 paths)</b></summary>

```
database.yml        # Database configuration
database.sqlite     # SQLite database file
database.sqlite3    # SQLite3 database
db.sqlite / db.sqlite3  # Common names
.db                 # Generic database files
```
**Why dangerous:** Direct access to user data, passwords (even if hashed), personal information.
</details>

<details>
<summary><b>🤐 Secrets & Passwords (5 paths)</b></summary>

```
secrets.yml         # Application secrets
secrets.json        # JSON format secrets
secret.txt          # Plain text secrets
password.txt        # Passwords file
passwords.txt       # Multiple passwords
```
**Why dangerous:** Direct access to credentials, authentication bypass, complete compromise.
</details>

<details>
<summary><b>🐳 Docker Configuration (3 paths)</b></summary>

```
.docker/config.json # Docker registry credentials
docker-compose.yml  # Service configuration
Dockerfile          # Build instructions and secrets
```
**Why dangerous:** May contain registry credentials, environment variables, internal architecture info.
</details>

<details>
<summary><b>⚙️ Configuration Files (8 paths)</b></summary>

```
config.json / config.yml  # General config
.htaccess           # Apache configuration
.htpasswd           # Apache passwords
web.config          # IIS configuration
phpinfo.php         # PHP info (system details)
```
**Why dangerous:** Reveals system configuration, authentication methods, server capabilities.
</details>

<details>
<summary><b>📦 Package Managers (15 paths)</b></summary>

```
package.json        # Node.js dependencies
composer.json       # PHP dependencies
requirements.txt    # Python dependencies
Gemfile             # Ruby dependencies
pom.xml             # Java/Maven dependencies
build.gradle        # Gradle build config
.npmrc / .pypirc    # Registry credentials
```
**Why dangerous:** May contain private package tokens, reveals technology stack and versions.
</details>

<details>
<summary><b>📝 WordPress (4 paths)</b></summary>

```
wp-config.php       # WordPress configuration
wp-config.php.bak   # Backup config files
wp-config.php~      # Editor backup
wp-config.old       # Old config
```
**Why dangerous:** Database credentials, secret keys, complete site compromise.
</details>

<details>
<summary><b>💾 Backup & Temp Files (8 paths)</b></summary>

```
.DS_Store           # macOS folder metadata
Thumbs.db           # Windows thumbnails
.backup / backup.zip # Backup archives
backup.sql / dump.sql # Database dumps
.bak                # Generic backups
```
**Why dangerous:** Often contain sensitive data that was meant to be deleted.
</details>

<details>
<summary><b>💻 Shell Configuration (5 paths)</b></summary>

```
.bashrc             # Bash configuration
.bash_profile       # Bash startup script
.bash_history       # Command history
.zshrc              # Zsh configuration
.profile            # Shell profile
```
**Why dangerous:** May contain hardcoded credentials, API keys in aliases, command history with secrets.
**Note:** Disabled by default (enable in settings if needed)
</details>

## 🚨 Alert System

DotDrop uses a multi-layered alert system to ensure you never miss a security exposure:

### 🔔 Browser Notifications

- **Native desktop notifications** appear in your system notification area
- **Severity-based titles:**
  - 🚨 "CRITICAL SECURITY EXPOSURE!" for critical files
  - ⚠️ "Security Exposure Detected" for medium/low severity
- **Shows up to 3 files** in the notification body
- **Requires interaction** for critical exposures (won't auto-dismiss)
- **Can be disabled** in settings if you prefer silent operation

### 🔊 Sound Alerts

- **Web Audio API** generated tones (no external files needed)
- **Three-tone ascending sequence:**
  - 📢 800 Hz → 1000 Hz → 1200 Hz
  - 500ms duration with smooth decay
  - 200ms between tones
- **30% volume** (loud enough to notice, not annoying)
- **Can be toggled** on/off in settings

### 🔴 Visual Indicators

**Icon Changes:**
- 🟣 **Purple icon** - Normal state (no detections)
- 🔴 **Red icon** - Exposure detected on current site
- Automatic per-tab tracking

**Badge Counter:**
- **Red badge** with number of detected files
- Updates in real-time as you browse
- Visible even when popup is closed

**Pulsing Animation:**
- Critical exposures show a **pulsing effect** in the UI
- Draws attention to high-priority issues

### ⚙️ Customization Options

| Alert Feature | Can Disable? | Location |
|--------------|--------------|----------|
| Browser Notifications | ✅ Yes | Settings → Browser Notifications toggle |
| Sound Alerts | ✅ Yes | Settings → Sound Alerts toggle |
| Icon Color Change | ❌ No | Always active |
| Badge Counter | ❌ No | Always active |
| Auto Scanning | ✅ Yes | Settings → Auto Scan toggle |

## 📸 Screenshots

### Popup Interface
```
┌─────────────────────────────────────┐
│  🔒 DotDrop                         │
│  Sensitive File Detector            │
├─────────────────────────────────────┤
│  Current Site: ⚠️ 3 Critical       │
│  Total Detections: 5                │
├─────────────────────────────────────┤
│  [🔍 Scan Now] [⚙️ Settings]       │
├─────────────────────────────────────┤
│  🌐 example.com  🔴 CRITICAL        │
│    🔴 .git/config                   │
│    🔴 .env                          │
│    🔴 id_rsa                        │
│                                     │
│  🌐 another-site.com  🟡 MEDIUM     │
│    🟡 .DS_Store                     │
│    🟡 config.json                   │
└─────────────────────────────────────┘
```

### Settings Page
- **Modern gradient design** (purple theme)
- **Toggle switches** for all preferences
- **Complete detection history** with timestamps
- **Color-coded severity levels**
- **One-click history clearing**

## 🛡️ Security & Privacy

### 🔒 Privacy Guarantees

| Aspect | Status | Details |
|--------|--------|---------|
| **Data Collection** | ❌ NONE | Zero data is collected from users |
| **External Requests** | ❌ NONE | All processing happens locally |
| **Telemetry** | ❌ NONE | No analytics or usage tracking |
| **User Tracking** | ❌ NONE | We don't know who you are or what you visit |
| **Third-party Services** | ❌ NONE | No external APIs or services used |
| **Open Source** | ✅ YES | Full source code available for audit |

### 🔐 How It Works

1. **Local Scanning Only:** All file detection happens in your browser
2. **No Data Transmission:** Nothing is sent to external servers
3. **Local Storage:** Detection history stored only on your device
4. **No Accounts:** No login, registration, or user accounts
5. **Transparent Code:** Every line of code is open for inspection

### 📋 Permissions Explained

DotDrop requests these browser permissions:

| Permission | Why Needed | What We Do |
|------------|------------|------------|
| `webRequest` | Monitor page loads | Trigger scans when pages finish loading |
| `storage` | Save preferences | Store your settings and detection history locally |
| `notifications` | Show alerts | Display notifications when exposures are found |
| `activeTab` | Access current tab | Read current page URL for scanning |
| `<all_urls>` | Scan any website | Check for exposed files on sites you visit |

**We do NOT:**
- ❌ Read your browsing history
- ❌ Track which sites you visit
- ❌ Access page content beyond checking for file existence
- ❌ Modify website content
- ❌ Inject ads or scripts
- ❌ Send data anywhere

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

### 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### 🧪 Testing

```bash
# Load extension in browser
# Make your changes
# Reload extension to test

# Check for errors
# - Chrome: chrome://extensions → Inspect views
# - Firefox: about:debugging → Inspect

# Test on various websites
# Verify all features work correctly
```

## ❓ Frequently Asked Questions

<details>
<summary><b>Q: Is this extension safe to use?</b></summary>

**A:** Yes! DotDrop is completely open source and performs all operations locally in your browser. No data is collected or transmitted. You can review the entire source code yourself.
</details>

<details>
<summary><b>Q: Will this slow down my browsing?</b></summary>

**A:** No. DotDrop uses efficient batch scanning with delays between requests. Most scans complete in 1-3 seconds without impacting page load times.
</details>

<details>
<summary><b>Q: Can I use this for bug bounty hunting?</b></summary>

**A:** Yes! DotDrop is perfect for security research and bug bounty programs. However, always ensure you have permission to test the target website and follow the program's rules.
</details>

<details>
<summary><b>Q: Why does Firefox remove the extension when I close the browser?</b></summary>

**A:** Firefox requires extensions to be signed for permanent installation. In debug mode, extensions are temporary. To make it permanent, sign the extension through Mozilla's Developer Hub or use Firefox Developer Edition.
</details>

<details>
<summary><b>Q: Some sites aren't being scanned. Why?</b></summary>

**A:** This can happen due to:
- CORS (Cross-Origin Resource Sharing) restrictions
- Rate limiting by the server
- Firewall/CDN blocking requests
- Auto-scan being disabled

Try manual scanning or check the browser console for errors.
</details>

<details>
<summary><b>Q: Can I add custom file patterns to detect?</b></summary>

**A:** Yes! Edit `background.js` and add your patterns to the `SENSITIVE_PATHS` object. Follow the existing format and specify the severity level.
</details>

<details>
<summary><b>Q: Does this work on internal/local networks?</b></summary>

**A:** Yes! DotDrop works on any HTTP/HTTPS URL, including localhost, internal IPs, and local development servers.
</details>

<details>
<summary><b>Q: What should I do if I find an exposure?</b></summary>

**A:** 
1. Document the findings
2. Contact the site administrator privately
3. Give them time to fix it (responsible disclosure)
4. For bug bounties, follow the program's disclosure policy
</details>

<details>
<summary><b>Q: Can I disable specific detection categories?</b></summary>

**A:** Currently, categories are controlled in the code. Edit `background.js` and set `enabled: false` for any category in the `SENSITIVE_PATHS` object. Future versions may include UI controls for this.
</details>

<details>
<summary><b>Q: Why am I getting false positives?</b></summary>

**A:** Some legitimate files share names with sensitive files (e.g., public `package.json` is normal). Always verify findings manually. DotDrop alerts you to *potential* exposures - human judgment is required.
</details>

## 🐛 Known Issues & Limitations

### Current Limitations

| Issue | Impact | Workaround |
|-------|--------|------------|
| **CORS Restrictions** | Some sites block requests | No workaround - site security feature |
| **False Positives** | Legitimate files may trigger alerts | Manually verify each detection |
| **Rate Limiting** | Too many requests may be blocked | Extension uses delays, but some servers are strict |
| **Firefox Temporary Install** | Extension removed on browser restart | Use Firefox Developer Edition or sign extension |
| **No Custom Rules UI** | Must edit code to add patterns | Future feature planned |
| **No Export Function** | Can't export detection reports | Copy from settings page or future feature |

### Browser-Specific Issues

**Chrome/Edge/Brave:**
- ✅ Fully functional
- ✅ Persistent installation
- ✅ All features working

**Firefox:**
- ⚠️ Temporary installation only (unsigned)
- ✅ All features working
- ⚠️ Must reload after browser restart

## 🔮 Future Enhancements

### Planned Features

#### v1.1.0 (Next Release)
- [ ] **Export Reports**: Export detections as JSON/CSV/PDF
- [ ] **Custom Rules**: Add custom file patterns via UI
- [ ] **Domain Whitelist**: Skip scanning for trusted domains
- [ ] **Scheduled Scans**: Re-scan sites periodically

#### v1.2.0
- [ ] **Advanced Filtering**: Filter by severity, category, date
- [ ] **Statistics Dashboard**: Charts and graphs of detections
- [ ] **Integration API**: Connect with other security tools
- [ ] **Browser Sync**: Sync settings across devices

#### v2.0.0
- [ ] **Content Analysis**: Detect secrets in page content
- [ ] **Machine Learning**: Reduce false positives
- [ ] **Multi-language Support**: Translate UI
- [ ] **Cloud Backup**: Optional cloud sync of detection history

### Community Requested Features
- Pattern matching with regex
- Webhook notifications
- Slack/Discord integration
- Dark mode UI theme
- Mobile browser support

**Want a feature?** [Open an issue](https://github.com/interzone/dotdrop/issues) with your suggestion!

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 DotDrop Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[See LICENSE file for full text]
```

## 🙏 Acknowledgments

- **Inspired by:** [DotGit](https://github.com/davtur19/DotGit) by [@davtur19](https://github.com/davtur19)
- **Built with:** JavaScript, HTML5, CSS3, Web APIs
- **Icons:** Generated with Python PIL/Pillow
- **Design:** Modern gradient UI with accessibility in mind
- **Community:** Thanks to all contributors and testers!

## 📞 Support & Contact

### 🐛 Found a Bug?
1. Check [existing issues](https://github.com/interzone/dotdrop/issues)
2. Create a new issue with:
   - Browser and version
   - Extension version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### 💡 Have a Question?
- Read this README thoroughly
- Check the [FAQ section](#-frequently-asked-questions)
- Review [closed issues](https://github.com/interzone/dotdrop/issues?q=is%3Aissue+is%3Aclosed)
- Open a new issue with the "question" label

### 🔒 Security Vulnerability?
**Do NOT open a public issue!** 

Email security concerns privately to: [security@yourproject.com]

We take security seriously and will respond promptly.

## ⚠️ Disclaimer

### Important Legal Notice

```
⚖️ This tool is intended for:
   ✓ Security research and education
   ✓ Testing your own websites
   ✓ Authorized security assessments
   ✓ Bug bounty programs (with permission)

⚠️ This tool is NOT for:
   ✗ Unauthorized access attempts
   ✗ Malicious hacking
   ✗ Violation of Computer Fraud and Abuse Act (CFAA)
   ✗ Any illegal activities
```

**By using DotDrop, you agree to:**
1. Only scan websites you own or have explicit permission to test
2. Follow all applicable laws and regulations
3. Practice responsible disclosure for any findings
4. Not use this tool for malicious purposes

**The authors and contributors:**
- Are NOT responsible for misuse of this tool
- Do NOT encourage illegal activities
- Provide this software "as is" without warranty
- May not be held liable for any damages

**Always obtain proper authorization before security testing!**

## 📊 Project Statistics

- **Lines of Code:** ~2,200
- **Files:** 23
- **Detection Patterns:** 80+
- **Categories:** 12
- **Supported Browsers:** 5+
- **License:** MIT (Open Source)
- **Status:** Active Development

---

<div align="center">

## 🌟 Star History

⭐ **Star this repository if you find it useful!** ⭐

Your stars help others discover this tool and motivate continued development.

---

### 🔗 Quick Links

[📖 Documentation](README.md) • [🚀 Quick Start](QUICKSTART.md) • [🤝 Contributing](CONTRIBUTING.md) • [📝 License](LICENSE) • [🐛 Report Issue](https://github.com/interzone/dotdrop/issues)

---

### Made with ❤️ for the Security Community

**Protect your privacy. Detect security leaks. Stay safe online.**

![Security](https://img.shields.io/badge/Security-First-success?style=for-the-badge)
![Privacy](https://img.shields.io/badge/Privacy-Protected-blue?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open-Source-orange?style=for-the-badge)

---

**© 2025 DotDrop Contributors | Licensed under MIT**

</div>
