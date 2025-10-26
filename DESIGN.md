# 🎨 DotDrop Design System

## Professional Terminal/Hacker Aesthetic

DotDrop features a dark, terminal-inspired interface designed for security professionals and developers.

---

## Color Palette

### Core Colors

```css
/* Backgrounds */
--bg-primary: #0a0e27;      /* Dark blue-black */
--bg-surface: #0d1117;      /* GitHub dark surface */
--bg-elevated: #161b22;     /* Elevated surface */

/* Borders */
--border-default: #30363d;  /* Subtle border */
--border-muted: #21262d;    /* Even more subtle */

/* Text */
--text-primary: #c9d1d9;    /* Primary text */
--text-secondary: #8b949e;  /* Secondary text */
--text-muted: #484f58;      /* Muted text */

/* Accent Colors */
--accent-primary: #ff7700;  /* Hacker orange */
--accent-critical: #ff0000; /* Terminal red */
--accent-warning: #ffa500;  /* Terminal orange */
--accent-info: #00bfff;     /* Terminal cyan */
```

### Semantic Colors

```css
/* Status Colors */
--status-safe: #ff7700;     /* Orange - No issues */
--status-warning: #ffa500;  /* Orange - Medium severity */
--status-critical: #ff0000; /* Red - Critical issues */

/* Interactive States */
--hover-glow: rgba(255, 119, 0, 0.3);
--critical-glow: rgba(255, 0, 0, 0.3);
--warning-glow: rgba(255, 165, 0, 0.3);
```

---

## Typography

### Font Stack

```css
font-family: 'Courier New', 'Consolas', monospace;
```

All text uses monospace fonts for that authentic terminal feel.

### Font Sizes

```css
--text-xs: 10px;    /* Footer, tiny labels */
--text-sm: 11px;    /* Body text, descriptions */
--text-base: 12px;  /* Buttons, labels */
--text-md: 13px;    /* Settings names */
--text-lg: 16px;    /* Section titles */
--text-xl: 18px;    /* Popup header */
--text-2xl: 24px;   /* Page headers */
```

### Text Styling

- **Uppercase**: Labels, buttons, headers
- **Letter Spacing**: 0.5px - 2px for readability
- **Font Weight**: 600-700 for emphasis
- **No italics**: Keep it sharp and readable

---

## Layout Principles

### No Rounded Corners

```css
border-radius: 0; /* Always sharp edges */
```

### Minimal Padding

- Compact, information-dense design
- 8px - 20px padding for most elements
- No wasted space

### Border Accents

```css
/* Left border accent for emphasis */
border-left: 2px solid #30363d;

/* Top border for primary elements */
border-top: 2px solid #00ff41;
```

---

## Components

### Buttons

```css
/* Default Button */
background: #161b22;
border: 1px solid #30363d;
color: #8b949e;
padding: 8px 20px;
font-size: 11px;
text-transform: uppercase;

/* Hover */
border-color: #ff7700;
color: #ff7700;
box-shadow: 0 0 5px rgba(255, 119, 0, 0.3);

/* Primary Button */
background: #0d1117;
border-color: #ff7700;
color: #ff7700;

/* Primary Hover */
background: #ff7700;
color: #0a0e27;
box-shadow: 0 0 10px rgba(255, 119, 0, 0.5);
```

### Status Badges

```css
/* Critical */
background: #1a0000;
border: 1px solid #ff0000;
color: #ff0000;

/* Warning */
background: #1a1000;
border: 1px solid #ffa500;
color: #ffa500;

/* Safe */
background: #0d1117;
border: 1px solid #ff7700;
color: #ff7700;
```

### Detection Cards

```css
background: #161b22;
border: 1px solid #21262d;
border-left: 3px solid #ff0000; /* Severity color */
padding: 12px;

/* Critical */
box-shadow: inset 0 0 5px rgba(255, 0, 0, 0.1);

/* Medium */
box-shadow: inset 0 0 5px rgba(255, 165, 0, 0.1);
```

### Toggles

```css
/* Off State */
background: #21262d;
border: 1px solid #30363d;

/* On State */
background: #ff7700;
border-color: #ff7700;
box-shadow: 0 0 10px rgba(255, 119, 0, 0.3);
```

---

## Effects & Interactions

### Glow Effects

```css
/* Orange glow for interactive elements */
box-shadow: 0 0 5px rgba(255, 119, 0, 0.3);

/* Red glow for critical states */
box-shadow: 0 0 5px rgba(255, 0, 0, 0.3);

/* Text glow on hover */
text-shadow: 0 0 5px rgba(255, 119, 0, 0.5);
```

### Animations

```css
/* Pulse animation for critical alerts */
@keyframes pulse {
  0%, 100% { 
    opacity: 1;
    box-shadow: 0 0 5px #ff0000;
  }
  50% { 
    opacity: 0.7;
    box-shadow: 0 0 10px #ff0000;
  }
}
```

### Hover States

```css
/* All interactive elements */
transition: all 0.2s ease;

/* Buttons */
hover: {
  border-color: #ff7700;
  color: #ff7700;
  box-shadow: 0 0 5px rgba(255, 119, 0, 0.3);
}
```

---

## Scrollbars

```css
/* Track */
background: #0d1117;

/* Thumb */
background: #30363d;

/* Thumb Hover */
background: #ff7700;
```

---

## Design Inspiration

- **GitHub Dark Theme**: Base colors and surface elevations
- **Terminal Emulators**: Monospace fonts, sharp edges
- **Hacker Culture**: Orange accent color (#ff7700)
- **Hacker Aesthetic**: Minimal, functional, dark
- **Security Tools**: Professional, no-nonsense interface

---

## Key Differences from Previous Design

| Aspect | Before | After |
|--------|--------|-------|
| **Colors** | Purple gradient | Dark terminal |
| **Corners** | Rounded (8-16px) | Sharp (0px) |
| **Fonts** | Sans-serif | Monospace |
| **Accent** | Purple | Hacker orange |
| **Padding** | Generous | Minimal |
| **Style** | Friendly, modern | Professional, hacker |
| **Buttons** | Rounded, gradient | Sharp, bordered |
| **Shadows** | Soft blur | Hard glow |

---

## Accessibility

- **Contrast**: All text meets WCAG AA standards
- **Hover States**: Clear visual feedback on all interactive elements
- **Color Coding**: Always paired with text labels
- **Focus States**: Visible focus indicators

---

## Future Enhancements

- [ ] Dark red variant for critical mode
- [ ] Custom cursor (terminal block cursor)
- [ ] Scanline effect overlay (subtle)
- [ ] CRT monitor flicker effect (optional)
- [ ] ASCII art loading states
- [ ] Terminal boot sequence animation

---

**Style**: Terminal • Professional • Hacker  
**Mood**: Dark • Focused • Secure  
**Vibe**: Orange • GitHub Dark • Security Tools
