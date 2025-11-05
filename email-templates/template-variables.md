# Email Template Variables

This document describes all variables used in the JADE email templates that need to be replaced before sending.

## Required Variables

### `{{magic_link_url}}`
**Type:** String (URL)
**Description:** The unique, single-use magic link for authentication
**Example:** `https://jade.example.com/auth/verify?token=abc123...`
**Security:** Must be single-use, expire after 1 hour, use HTTPS only

### `{{logo_url}}`
**Type:** String (URL)
**Description:** Absolute URL to the JADE logo image
**Example:** `https://cdn.jade.example.com/images/logo.png`
**Requirements:**
- Hosted on CDN or reliable server
- Recommended size: 240x80px (120px display width)
- PNG or SVG format with transparent background
- Alt text will be "JADE"

### `{{company_address}}`
**Type:** String (Multiline text)
**Description:** Company's physical mailing address
**Example:** `Level 22, 52 Martin Place, Sydney, NSW 2000, Australia`
**Note:** Required by CAN-SPAM Act for commercial emails
**Default:** Level 22, 52 Martin Place, Sydney, NSW 2000, Australia

### `{{current_year}}`
**Type:** String (4-digit year)
**Description:** Current year for copyright notice
**Example:** `2025`
**Implementation:** Use `new Date().getFullYear()` or server-side equivalent

## Optional Variables

### `{{privacy_policy_url}}`
**Type:** String (URL)
**Description:** Link to privacy policy page
**Example:** `https://jade.io/privacy`
**Default:** `#` (if not provided)

### `{{contact_us_url}}`
**Type:** String (URL)
**Description:** Link to contact us page
**Example:** `https://jade.io/contact`
**Default:** `#` (if not provided)

## Implementation Examples

### Node.js / JavaScript
```javascript
const fs = require('fs');

// Read template
const htmlTemplate = fs.readFileSync('./email-templates/magic-link.html', 'utf8');
const txtTemplate = fs.readFileSync('./email-templates/magic-link.txt', 'utf8');

// Replace variables
function renderTemplate(template, variables) {
  let rendered = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    rendered = rendered.replace(regex, value);
  }
  return rendered;
}

// Prepare variables
const variables = {
  magic_link_url: 'https://jade.io/auth/verify?token=abc123',
  logo_url: 'https://cdn.jade.io/images/logo.png',
  company_address: 'Level 22, 52 Martin Place, Sydney, NSW 2000, Australia',
  current_year: new Date().getFullYear().toString(),
  privacy_policy_url: 'https://jade.io/privacy',
  contact_us_url: 'https://jade.io/contact'
};

// Render templates
const htmlEmail = renderTemplate(htmlTemplate, variables);
const txtEmail = renderTemplate(txtTemplate, variables);

// Send email with both HTML and plain text versions
// (Use your email service provider's SDK)
```

### Python
```python
from datetime import datetime

# Read template
with open('./email-templates/magic-link.html', 'r') as f:
    html_template = f.read()

with open('./email-templates/magic-link.txt', 'r') as f:
    txt_template = f.read()

# Prepare variables
variables = {
    'magic_link_url': 'https://jade.io/auth/verify?token=abc123',
    'logo_url': 'https://cdn.jade.io/images/logo.png',
    'company_address': 'Level 22, 52 Martin Place, Sydney, NSW 2000, Australia',
    'current_year': str(datetime.now().year),
    'privacy_policy_url': 'https://jade.io/privacy',
    'contact_us_url': 'https://jade.io/contact'
}

# Replace variables
html_email = html_template
txt_email = txt_template

for key, value in variables.items():
    html_email = html_email.replace(f'{{{{{key}}}}}', value)
    txt_email = txt_email.replace(f'{{{{{key}}}}}', value)

# Send email with both HTML and plain text versions
# (Use your email service provider's SDK)
```

## Security Considerations

1. **Magic Link Generation:**
   - Use cryptographically secure random tokens (minimum 32 bytes)
   - Store hashed version in database
   - Include user ID, expiration time, and token in link
   - Validate all parameters on backend

2. **Token Expiration:**
   - Set expiration to 15 minutes (configurable)
   - Check expiration on every verification attempt
   - Delete or invalidate token after successful use

3. **HTTPS Only:**
   - Never use HTTP for magic links
   - Enforce HTTPS in your application
   - Use secure cookies after authentication

4. **Rate Limiting:**
   - Limit magic link requests per email (e.g., 5 per hour)
   - Implement CAPTCHA for repeated requests
   - Monitor for abuse patterns

## Testing Checklist

Before deploying to production:

- [ ] Replace all `{{variables}}` with test values
- [ ] Verify logo image loads correctly
- [ ] Test magic link URL format and expiration
- [ ] Test in Gmail (desktop + mobile app)
- [ ] Test in Outlook.com
- [ ] Test in Outlook Desktop (Windows)
- [ ] Test in Apple Mail
- [ ] Test dark mode rendering
- [ ] Test with images disabled
- [ ] Verify plain text version renders correctly
- [ ] Check spam score (use Mail Tester)
- [ ] Validate HTML (W3C validator)
- [ ] Test all footer links work
- [ ] Verify responsive design on mobile (under 480px)
- [ ] Confirm security notice is visible
