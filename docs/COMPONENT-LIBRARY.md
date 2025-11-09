# JADE Component Library

**Version:** 1.0.0
**Status:** Production Ready
**Storybook Ready:** Yes

This document provides a comprehensive overview of all JADE design system components, ready for Storybook integration.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Core Components](#core-components)
3. [Form Components](#form-components)
4. [Navigation & Layout](#navigation--layout)
5. [Feedback Components](#feedback-components)
6. [Utility Classes](#utility-classes)

---

## Design Tokens

**File:** `css/design-tokens.css`

### Colors

```css
/* Brand */
--primary: #089444
--primary-hover: #067038
--primary-foreground: #ffffff

/* Status */
--success: #22c55e
--error: #dc2626
--warning: #f59e0b
--info: #3b82f6
```

### Typography

```css
/* Font Families */
--font-sans: 'Alegreya Sans', Arial, sans-serif
--font-serif: 'Lora', serif
--font-mono: 'IBM Plex Mono', monospace

/* Font Sizes */
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
```

### Spacing

```css
--spacing-1: 0.25rem  /* 4px */
--spacing-2: 0.5rem   /* 8px */
--spacing-3: 0.75rem  /* 12px */
--spacing-4: 1rem     /* 16px */
--spacing-6: 1.5rem   /* 24px */
--spacing-8: 2rem     /* 32px */
```

### SVG Icons

```css
--icon-check-white: url("data:image/svg+xml,...")
--icon-check-green: url("data:image/svg+xml,...")
--icon-chevron-down: url("data:image/svg+xml,...")
```

---

## Core Components

### 1. Buttons

**File:** `css/components/buttons.css`

#### Primary Button
```html
<button class="btn-primary">
  Continue
</button>
```

**Props:**
- `disabled` - Disables the button
- `class="btn-primary loading"` - Loading state

**Variants:**
- `.btn-primary` - Green background, white text
- `.btn-secondary` - Light background, dark text

---

### 2. Button Group

**File:** `css/components/button-group.css`

```html
<div class="button-group">
  <button class="btn-secondary">Cancel</button>
  <button class="btn-primary">Continue</button>
</div>
```

**Variants:**
- `.button-group` - Default (horizontal, responsive)
- `.button-group-start` - Align left
- `.button-group-center` - Align center
- `.button-group-compact` - Smaller spacing
- `.button-group-stacked` - Always vertical

**Responsive:**
- Mobile: Stacks vertically (column-reverse)
- Desktop: Horizontal layout

---

### 3. Cards

**File:** `css/components/cards.css`

```html
<div class="card p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

**Features:**
- Rounded corners (var(--radius))
- Shadow (var(--shadow-md))
- Background: var(--card)

---

### 4. Stepper

**File:** `css/components/stepper.css`

```html
<div class="stepper">
  <div class="stepper-item completed">
    <div class="stepper-circle"></div>
    <div class="stepper-label">Step 1</div>
  </div>
  <div class="stepper-item active">
    <div class="stepper-circle">2</div>
    <div class="stepper-label">Step 2</div>
  </div>
</div>
```

**States:**
- `.stepper-item` - Default (inactive)
- `.stepper-item.active` - Current step
- `.stepper-item.completed` - Completed step (shows checkmark)

**Features:**
- Connecting lines between steps
- Check icon for completed steps (uses --icon-check-white token)
- Responsive sizing

---

## Form Components

### 5. Input Fields

**File:** `css/components/forms.css`

```html
<div>
  <label for="email" class="block text-sm font-medium mb-2">
    Email address
  </label>
  <input
    type="email"
    id="email"
    class="input-field"
    placeholder="your@email.com"
  />
</div>
```

**States:**
- `:hover` - Border color changes
- `:focus` - Primary color border with ring
- `.error` - Error state (red border)

---

### 6. Searchable Select

**File:** `css/components/searchable-select.css`

```html
<div class="searchable-select" id="example-select">
  <button type="button" class="searchable-select-trigger" id="example-trigger">
    <span class="searchable-select-trigger-text">Select options...</span>
    <svg class="searchable-select-chevron">...</svg>
  </button>
  <div class="searchable-select-dropdown" id="example-dropdown">
    <div class="searchable-select-search">
      <input type="text" class="searchable-select-input" placeholder="Search..." />
    </div>
    <div class="searchable-select-options">
      <div class="searchable-select-option" data-value="1">Option 1</div>
    </div>
  </div>
</div>
<div class="searchable-select-tags" id="example-tags"></div>
```

**JavaScript Required:** Yes (see `js/searchable-select.js`)

**Features:**
- Multi-select with tags
- Search/filter functionality
- Category grouping
- Keyboard navigation
- Counter badge
- Check icon for selected items (uses --icon-check-green token)

---

### 7. Radio Buttons

**File:** `css/components/radio-buttons.css`

```html
<div class="radio-group">
  <label class="radio-option">
    <input type="radio" name="plan" value="free">
    <span class="radio-custom"></span>
    <div class="radio-label">
      <div class="radio-title">Free Plan</div>
      <div class="radio-description">Basic features</div>
    </div>
  </label>
</div>
```

**Features:**
- Custom styled radio buttons
- Support for title + description layout
- Hover and active states

---

### 8. Preset Checkboxes

**File:** `css/components/preset-checkbox.css`

```html
<div class="preset-checkbox-grid">
  <div class="preset-checkbox-item">
    <input type="checkbox" id="preset-1" value="option1">
    <label for="preset-1">
      <span class="preset-label">Option 1</span>
    </label>
  </div>
</div>
```

**Features:**
- Large clickable cards
- Grid layout (responsive)
- Check icon on selection

---

## Navigation & Layout

### 9. Header

**File:** `css/components/navigation.css`

```html
<header>
  <div class="header-top">
    <div class="max-w-full px-4 flex items-center justify-between">
      <img src="jade_logo.svg" alt="JADE" />
      <nav class="header-nav">
        <a href="#" class="header-nav-link">Home</a>
      </nav>
    </div>
  </div>
</header>
```

**Variants:**
- `.header-top` - Dark background header
- `.header-nav` - Navigation menu
- `.user-badge` - User status badge (FREE/PRO)

---

### 10. Divider

**File:** `css/components/divider.css`

```html
<div class="divider">Or</div>
```

**Features:**
- Horizontal line with centered text
- Muted text color

---

## Feedback Components

### 11. Loading States

**File:** `css/components/loading.css`

```html
<!-- Spinner -->
<div class="spinner"></div>
<div class="spinner spinner-sm"></div>

<!-- Skeleton -->
<div class="skeleton"></div>
<div class="skeleton skeleton-text"></div>
```

**JavaScript Functions:**
- `transitionToSuccess()` - Animate loading → success
- `transitionToError()` - Animate loading → error

---

### 12. Toast Notifications

**File:** `css/components/toast.css`

```html
<div class="toast toast-success">
  <div class="toast-icon">✓</div>
  <div class="toast-message">Success message</div>
</div>
```

**JavaScript:**
```javascript
showToast('Operation successful!', 'success', 2000);
showToast('An error occurred', 'error', 2000);
```

**Variants:**
- `.toast-success` - Green background
- `.toast-error` - Red background

---

### 13. Success Celebration

**File:** `css/components/success-celebration.css`

```html
<div class="success-celebration-icon">
  ✓
</div>
```

**Features:**
- Large circular check icon
- Pop animation
- Used for completion pages

---

### 14. Messages

**File:** `css/components/messages.css`

```html
<div class="error-message">
  <svg>...</svg>
  <span class="error-text">Error message here</span>
</div>
```

**Variants:**
- `.error-message` - Red background
- `.info-message` - Blue background
- `.success-message` - Green background

---

## Utility Classes

**File:** `css/components/utilities.css`

### Typography

```html
<!-- Font Families -->
<h1 class="font-serif">Serif Heading</h1>
<code class="font-mono">Monospace Code</code>

<!-- Font Weights -->
<span class="font-medium">Medium</span>
<span class="font-semibold">Semibold</span>
<span class="font-bold">Bold</span>

<!-- Line Heights -->
<p class="leading-tight">Tight line height</p>
<p class="leading-relaxed">Relaxed line height</p>
```

### Colors

```html
<span class="jade-text-primary">Primary color</span>
<span class="jade-text-success">Success color</span>
<span class="jade-text-muted">Muted text</span>
```

### Animations

```html
<div class="fade-in">Fade in</div>
<div class="fade-in-delay">Fade in with delay</div>
```

### Images

```html
<img src="logo.svg" class="logo-invert" alt="Logo" />
```

---

## JavaScript Utilities

**File:** `js/utils.js`

### Session Management

```javascript
setSession('key', value);
const value = getSession('key', defaultValue);
clearSession('key');
```

### Loading States

```javascript
showLoading(button, 'Loading...', { showSpinner: true });
hideLoading(button);
```

### Validation

```javascript
isValidEmail('user@example.com'); // true/false
validatePassword('Password123'); // { length: true, uppercase: true, ... }
```

---

## Storybook Integration Guide

### Prerequisites

```bash
npm install --save-dev @storybook/html @storybook/addon-essentials
```

### Component Story Example

```javascript
// Button.stories.js
export default {
  title: 'Components/Buttons',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary']
    },
    disabled: { control: 'boolean' }
  }
};

export const Primary = {
  args: {
    variant: 'primary',
    label: 'Continue',
    disabled: false
  },
  render: (args) => `
    <button class="btn-${args.variant}" ${args.disabled ? 'disabled' : ''}>
      ${args.label}
    </button>
  `
};
```

### Design Token Integration

Create `.storybook/preview.js`:

```javascript
import '../css/jade.css';

export const parameters = {
  backgrounds: {
    default: 'jade-light',
    values: [
      { name: 'jade-light', value: '#f7f9fc' },
      { name: 'white', value: '#ffffff' }
    ]
  }
};
```

---

## Component Checklist for Storybook

All components are **Storybook Ready** ✓

- [x] **Buttons** - Fully isolated, no dependencies
- [x] **Button Group** - Fully isolated
- [x] **Cards** - Fully isolated
- [x] **Stepper** - Fully isolated, uses design tokens
- [x] **Input Fields** - Fully isolated
- [x] **Searchable Select** - Requires JS module
- [x] **Radio Buttons** - Fully isolated
- [x] **Preset Checkboxes** - Fully isolated
- [x] **Header** - Fully isolated
- [x] **Divider** - Fully isolated
- [x] **Loading States** - Requires JS module
- [x] **Toast** - Requires JS module
- [x] **Success Celebration** - Fully isolated
- [x] **Messages** - Fully isolated

---

## Component Dependencies

### No Dependencies (Pure CSS)
- Buttons
- Button Group
- Cards
- Stepper
- Input Fields
- Radio Buttons
- Preset Checkboxes
- Header
- Divider
- Success Celebration
- Messages

### JavaScript Dependencies
- **Searchable Select** → `js/searchable-select.js`
- **Loading States** → `js/loading-states.js`
- **Toast** → `js/utils.js` (showToast function)

---

## Best Practices

### 1. Always use design tokens
```css
/* ✓ Good */
color: var(--primary);
padding: var(--spacing-4);

/* ✗ Bad */
color: #089444;
padding: 16px;
```

### 2. Use utility classes over inline styles
```html
<!-- ✓ Good -->
<h1 class="font-serif leading-tight">Title</h1>

<!-- ✗ Bad -->
<h1 style="font-family: var(--font-serif); line-height: 1.2;">Title</h1>
```

### 3. Leverage component variants
```html
<!-- ✓ Good -->
<div class="button-group button-group-compact">
  <button class="btn-secondary">Cancel</button>
  <button class="btn-primary">Save</button>
</div>
```

### 4. Maintain accessibility
```html
<!-- ✓ Good -->
<button class="btn-primary" aria-label="Submit form">
  Submit
</button>

<!-- Always include proper labels, ARIA attributes, and semantic HTML -->
```

---

## File Structure

```
css/
├── jade.css                      # Main entry point
├── design-tokens.css             # All design tokens
└── components/
    ├── layout.css                # Base layout
    ├── utilities.css             # Utility classes
    ├── buttons.css               # Button components
    ├── button-group.css          # Button group component ✨ NEW
    ├── forms.css                 # Form inputs
    ├── radio-buttons.css         # Radio button component
    ├── checkbox-grid.css         # Checkbox grid
    ├── preset-checkbox.css       # Preset checkbox cards
    ├── searchable-select.css     # Multi-select dropdown
    ├── divider.css               # Divider component
    ├── section-container.css     # Section containers
    ├── cards.css                 # Card component
    ├── badges.css                # Badge component
    ├── navigation.css            # Header & navigation
    ├── messages.css              # Error/info messages
    ├── results.css               # Result displays
    ├── toast.css                 # Toast notifications
    ├── loading.css               # Loading states
    ├── stepper.css               # Stepper component
    ├── success-celebration.css   # Success icon ✨ NEW
    └── confetti.css              # Confetti animation

js/
├── utils.js                      # Core utilities
├── loading-states.js             # Loading transitions
├── searchable-select.js          # Select component logic
├── form-validation.js            # Form validation
├── magic-link.js                 # Auth logic
└── sso-config.js                 # SSO configuration
```

---

## Version History

### v1.0.0 (Current)
- ✨ Added typography utilities (font-serif, font-mono, leading-*)
- ✨ Added button-group component
- ✨ Added success-celebration component
- ✨ Added SVG icon design tokens
- ✨ Added gap utilities
- 🔧 Consolidated duplicate checkmark SVGs
- 🔧 Removed duplicate delay() function
- 🔧 Replaced inline styles with utility classes
- ✅ All components are Storybook ready

---

## Support

For questions or issues, contact: **help@jade.io**

---

**Last Updated:** 2025-01-09
**Maintained by:** JADE Design Team
