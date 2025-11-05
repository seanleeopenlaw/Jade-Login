# JADE Magic Link Email Template

## Files

```
magic-link.html    ← Production email template
jade_logo.png      ← Logo (70x28px)
```

## Implementation

### 1. Upload Logo to CDN

Replace `jade_logo.png` with absolute CDN URL in `magic-link.html`:

```html
<!-- Line ~149: Change this -->
<img src="jade_logo.png" ...>

<!-- To this -->
<img src="https://cdn.yoursite.com/jade-logo.png" ...>
```

### 2. Replace Magic Link Variable

```javascript
const fs = require('fs');
let html = fs.readFileSync('./magic-link.html', 'utf8');

// Replace {{MAGIC_LINK_URL}} with actual token URL
const magicLink = `https://jade.io/auth/verify?token=${yourToken}`;
html = html.replace(/\{\{MAGIC_LINK_URL\}\}/g, magicLink);

// Send email
await emailService.send({
  to: userEmail,
  subject: 'Sign in to JADE',
  html: html
});
```

## Email Client Coverage

**Works well (~85%):**
- Gmail, Apple Mail, Outlook.com, Yahoo Mail
- Mobile apps (iOS/Android)

**Degraded but functional (~10%):**
- Outlook 2016-2019 Windows (square corners, no shadows)

**May have issues (~5%):**
- Very old clients, strict corporate filters

**Note:** Outlook on Windows shows emoji icon instead of SVG. Button always works.
