# JADE Email Templates V2

Modern, clean email template for JADE magic link authentication, inspired by best practices from leading SaaS products.

## 📁 Files in This Folder

### Version 2 (Recommended - Modern Design)
- **`magic-link-v2.html`** - New streamlined design with better UX
- **`magic-link-v2.txt`** - Plain text version
- **`preview-v2.html`** - Test preview with sample data

### Version 1 (Original)
- **`magic-link.html`** - Original detailed template
- **`magic-link.txt`** - Plain text version
- **`preview.html`** - Test preview

### Documentation
- **`template-variables.md`** - Complete variable documentation
- **`README.md`** - Original documentation
- **`README-v2.md`** - This file

## ✨ What's New in V2

### Design Improvements
- 🎨 **Cleaner Layout** - Inspired by ScrumGenius and modern SaaS email design
- 📱 **More Focused** - Narrower container (520px vs 600px) for better mobile experience
- 🔒 **Visual Security** - Lock icon emphasizes security and trust
- 💬 **Personalized Greeting** - "Hey {{user_name}}" creates friendly, personal tone
- 🎯 **Better Hierarchy** - Clearer visual flow from icon → title → message → CTA
- 🧹 **Simplified Footer** - Compact footer with essential info only

### UX Improvements
- ✅ **Clearer CTA** - "Sign in to JADE" button more prominent
- ⚡ **Faster Scanning** - Users understand email purpose in 2 seconds
- 🔐 **Security Messaging** - Clear explanation: "magic link, only for you, don't share, expires in 15 minutes"
- 👤 **User-Friendly Copy** - Conversational tone: "Hey {{user_name}}, you asked us to send you..."
- 🚫 **Didn't Request?** - Clear guidance if user didn't request the link

### Technical Improvements
- 📦 **Smaller File Size** - Less code, faster loading
- 🎨 **Better Dark Mode** - Optimized colors for dark theme
- 📐 **Improved Spacing** - More breathing room, less cluttered
- 🔤 **Better Typography** - More readable font sizes and line heights

## 🎨 Design Comparison

| Feature | V1 (Original) | V2 (New) |
|---------|---------------|----------|
| Container Width | 600px | 520px (narrower) |
| Logo Position | Center, large | Left, smaller |
| Icon | None | Lock emoji/icon |
| Heading | "Sign in to JADE" | "Magic link request" |
| Greeting | Generic | Personalized "Hey {{user_name}}" |
| Security Notice | Yellow box below | Integrated below button |
| Footer | Detailed, multi-section | Compact, single section |
| Overall Feel | Formal, professional | Friendly, modern |

## 🚀 Quick Start

### 1. Preview the Templates

Compare both versions:

```bash
# Original design
open email-templates/preview.html

# New design (recommended)
open email-templates/preview-v2.html
```

### 2. Choose Your Template

**Use V2 if you want:**
- Modern, clean design
- Better mobile experience
- Personalized user greeting
- Simplified layout

**Use V1 if you want:**
- More formal tone
- Detailed footer information
- Traditional email design

### 3. Required Variables

Both versions use the same variables:

```javascript
const variables = {
  magic_link_url: 'https://jade.io/auth/verify?token=abc123',
  logo_url: '/assets/images/jade-logo.svg', // Internal path for now
  user_name: 'there', // V2 only - defaults to "there" if not provided
  current_year: new Date().getFullYear().toString(),
  privacy_policy_url: 'https://jade.io/privacy',
  contact_us_url: 'https://jade.io/contact'
};
```

**New in V2:**
- `{{user_name}}` - User's first name for personalized greeting (optional, defaults to "there")

## 📝 Implementation Example

### Node.js / JavaScript

```javascript
const fs = require('fs');

// Read V2 templates
const htmlTemplate = fs.readFileSync('./email-templates/magic-link-v2.html', 'utf8');
const txtTemplate = fs.readFileSync('./email-templates/magic-link-v2.txt', 'utf8');

// Replace variables
function renderTemplate(template, variables) {
  let rendered = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    rendered = rendered.replace(regex, value);
  }
  return rendered;
}

// Prepare data
const emailData = {
  magic_link_url: generateMagicLink(user.id),
  logo_url: '/assets/images/jade-logo.svg', // Update to CDN URL in production
  user_name: user.firstName || 'there', // Personalized greeting
  current_year: new Date().getFullYear().toString(),
  privacy_policy_url: 'https://jade.io/privacy',
  contact_us_url: 'https://jade.io/contact'
};

// Render
const htmlEmail = renderTemplate(htmlTemplate, emailData);
const txtEmail = renderTemplate(txtTemplate, emailData);

// Send
await sendEmail({
  to: user.email,
  subject: 'Sign in to Your JADE Account',
  html: htmlEmail,
  text: txtEmail
});
```

## 🎯 Design Philosophy

V2 follows these principles:

1. **Simplicity** - Remove everything that doesn't help user complete action
2. **Clarity** - User should understand email purpose in 2 seconds
3. **Trust** - Security icon and clear messaging build confidence
4. **Personality** - Friendly tone makes brand more approachable
5. **Mobile-First** - Narrower width works better on mobile screens

## 🔄 Migration from V1 to V2

If you're currently using V1:

1. **Test V2** - Send test emails to yourself and team
2. **Check Dark Mode** - Toggle dark mode and verify appearance
3. **Test Mobile** - View on actual mobile devices
4. **Update Variables** - Add `user_name` to your email data
5. **Switch File** - Change from `magic-link.html` to `magic-link-v2.html`

No breaking changes - all existing variables still work!

## 📱 Responsive Design

V2 is optimized for all screen sizes:

- **Desktop** (520px container): Spacious, easy to read
- **Tablet** (480px-520px): Adapts naturally
- **Mobile** (<480px): Full width with adjusted padding

## 🌙 Dark Mode

V2 includes enhanced dark mode support:

- Background: #0a0a0a (deeper black)
- Card: #1a1a1a with #2d2d2d border
- Text: #ffffff for headings, #a0a0a0 for muted
- Icon background: #2d2d2d

## 🔧 Logo Setup

### Development (Current)
```html
<!-- Internal file path -->
<img src="{{logo_url}}" alt="JADE" width="80" height="auto">
```

Set `logo_url` to: `/assets/images/jade-logo.svg`

### Production (Future)
When ready, update to CDN URL:

```javascript
logo_url: 'https://cdn.jade.io/images/jade-logo.svg'
```

**Logo Requirements:**
- Format: SVG or PNG
- Size: 160x53px (displayed at 80px width for retina)
- Background: Transparent
- Location: Hosted on reliable CDN

## ✅ Testing Checklist

- [ ] Preview in browser (light mode)
- [ ] Preview in browser (dark mode)
- [ ] Send test to Gmail
- [ ] Send test to Outlook.com
- [ ] Send test to Apple Mail
- [ ] Test on iPhone
- [ ] Test on Android
- [ ] Verify all links work
- [ ] Check personalized greeting
- [ ] Verify 15-minute expiration message

## 🎨 Customization

### Change Button Color

Find all instances of `#00A676` and replace:

```css
/* Current: JADE Green */
background-color: #00A676;

/* Example: Blue */
background-color: #0066CC;
```

### Change Icon

Replace the lock emoji with your own:

```html
<!-- Current -->
<span style="font-size: 28px; color: #00A676;">🔒</span>

<!-- Alternative: Email icon -->
<span style="font-size: 28px; color: #00A676;">📧</span>

<!-- Or use SVG -->
<svg width="28" height="28">...</svg>
```

### Adjust Container Width

```html
<!-- Current: 520px -->
<table ... width="520" style="max-width: 520px;">

<!-- Wider: 600px -->
<table ... width="600" style="max-width: 600px;">
```

## 🆚 When to Use Which Version

**Use V2 for:**
- New products or redesigns
- Consumer-facing applications
- Modern, friendly brand tone
- Mobile-heavy user base

**Use V1 for:**
- Enterprise/B2B products
- Formal brand requirements
- Existing email systems (avoid disruption)
- When detailed footer is required

## 📊 Expected Results

Based on SaaS email best practices, V2 should improve:

- **Click-through rate** - Clearer CTA, better visual hierarchy
- **User trust** - Security icon, clear messaging
- **Mobile engagement** - Better mobile layout
- **Brand perception** - More modern, approachable

## 📧 Support

Questions about V2 design? Check:
- Compare side-by-side: Open both preview.html and preview-v2.html
- Review changes: See "Design Comparison" section above
- Need help migrating: See "Migration from V1 to V2" section

---

**Version:** 2.0
**Last Updated:** November 5, 2025
**Design Inspiration:** ScrumGenius, Slack, Linear, and other modern SaaS products
**Recommended for:** All new implementations
