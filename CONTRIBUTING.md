# Contributing to DotDrop

Thank you for your interest in contributing to DotDrop! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug:

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/dotdrop/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser version and extension version
   - Screenshots if applicable

### Suggesting Enhancements

We welcome enhancement suggestions! Please:

1. Check existing issues/discussions first
2. Create a new issue with:
   - Clear title describing the enhancement
   - Detailed description of the proposed feature
   - Use cases and benefits
   - Any implementation ideas (optional)

### Pull Requests

1. **Fork the repository** and create your branch from `master`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Follow the existing code style
   - Comment your code where necessary
   - Update documentation if needed

3. **Test your changes**:
   - Load the extension in Chrome/Firefox
   - Test all affected functionality
   - Ensure no regressions

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: feature description"
   ```
   
   Use conventional commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Refactor:` for code refactoring
   - `Docs:` for documentation changes

5. **Push to your fork** and submit a pull request

## 📋 Development Guidelines

### Code Style

- Use meaningful variable and function names
- Keep functions focused and single-purpose
- Add comments for complex logic
- Use ES6+ JavaScript features
- Maintain consistent indentation (2 spaces)

### File Structure

- `background.js` - Core detection logic
- `content.js` - Page-level operations
- `popup.*` - Popup interface
- `options.*` - Settings page
- Keep UI and logic separated

### Adding New Detection Paths

To add new sensitive file paths:

1. Open `background.js`
2. Add to the `SENSITIVE_PATHS` object:
   ```javascript
   newCategory: {
     enabled: true,
     paths: [
       'path/to/file1',
       'path/to/file2'
     ],
     severity: 'critical', // or 'medium' or 'low'
     description: 'Description of category'
   }
   ```

### Testing Checklist

- [ ] Extension loads without errors
- [ ] Detection works on test sites
- [ ] Popup displays correctly
- [ ] Settings save and load properly
- [ ] Notifications work (if enabled)
- [ ] Sound alerts work (if enabled)
- [ ] No console errors
- [ ] Works in both Chrome and Firefox

## 🔧 Setting Up Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dotdrop.git
   cd dotdrop
   ```

2. Generate icons:
   ```bash
   python3 generate_icons.py
   ```

3. Load extension in browser (see README for instructions)

4. Make changes and reload extension to test

## 📝 Documentation

When adding features:

- Update README.md with new features
- Update this guide if contribution process changes
- Add inline code comments
- Update CHANGELOG.md (if it exists)

## 🎨 Design Guidelines

- Maintain the purple gradient theme
- Use existing color scheme
- Ensure responsive design
- Follow accessibility best practices
- Test on different screen sizes

## 🐛 Debugging Tips

- Use browser DevTools console
- Check background service worker logs
- Inspect extension pages (popup, options)
- Use `console.log()` liberally during development
- Test with different websites

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the issue, not the person
- No harassment or discrimination

## ❓ Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Create a new discussion/issue
4. Be patient and respectful

## 🎯 Good First Issues

Look for issues labeled `good first issue` - these are great starting points for new contributors!

## 🙏 Recognition

All contributors will be recognized in:
- GitHub contributors list
- README acknowledgments
- Release notes (for significant contributions)

Thank you for contributing to DotDrop! 🎉
