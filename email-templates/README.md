# JADE Email Templates

Professional, cross-client compatible email templates for JADE authentication flows.

## 📁 Files in This Folder

- **`magic-link.html`** - Production-ready HTML email template with inline CSS
- **`magic-link.txt`** - Plain text version for email clients that don't support HTML
- **`preview.html`** - Test preview with sample data (open in browser to view)
- **`template-variables.md`** - Complete documentation of all template variables
- **`README.md`** - This file

## ✨ Features

Our email templates are built following industry best practices:

- ✅ **Cross-client compatible** - Works in Gmail, Outlook, Apple Mail, and mobile apps
- ✅ **Responsive design** - Optimized for desktop and mobile (480px breakpoint)
- ✅ **Dark mode support** - Beautiful in both light and dark themes
- ✅ **Bulletproof button** - Button works even with images disabled
- ✅ **Table-based layout** - 600px container for maximum compatibility
- ✅ **VML fallback** - Special Outlook support for consistent rendering
- ✅ **Security-focused** - Clear messaging about link expiration and safety
- ✅ **Accessible** - Proper alt text, semantic HTML, good color contrast
- ✅ **CAN-SPAM compliant** - Includes required footer information

## 🚀 Quick Start

### 1. Preview the Template

Open `preview.html` in your browser to see how the email looks with sample data:

```bash
open email-templates/preview.html
```

### 2. Prepare Your Variables

See `template-variables.md` for the complete list. Required variables:

- `{{magic_link_url}}` - The authentication link
- `{{logo_url}}` - Your logo image URL (recommended: 240x80px, hosted on CDN)
- `{{company_address}}` - Your company's mailing address
- `{{current_year}}` - Current year for copyright

Optional variables:
- `{{privacy_policy_url}}`, `{{terms_url}}`, `{{support_url}}`

### 3. Implement in Your Application

**Node.js Example:**

```javascript
const fs = require('fs');

// Read templates
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

// Prepare data
const emailData = {
  magic_link_url: generateMagicLink(user.id), // Your function
  logo_url: 'https://cdn.yoursite.com/logo.png',
  company_address: '123 Legal St, San Francisco, CA 94105',
  current_year: new Date().getFullYear().toString(),
  privacy_policy_url: 'https://yoursite.com/privacy',
  terms_url: 'https://yoursite.com/terms',
  support_url: 'https://yoursite.com/support'
};

// Render
const htmlEmail = renderTemplate(htmlTemplate, emailData);
const txtEmail = renderTemplate(txtTemplate, emailData);

// Send via your email service (SendGrid, AWS SES, etc.)
await sendEmail({
  to: user.email,
  subject: 'Sign in to Your JADE Account',
  html: htmlEmail,
  text: txtEmail
});
```

## 🧪 Testing Checklist

Before going to production, test the email in:

### Required Tests
- [ ] Gmail (desktop browser)
- [ ] Gmail (mobile app - iOS/Android)
- [ ] Outlook.com (web)
- [ ] Apple Mail (macOS)
- [ ] Apple Mail (iOS)

### Recommended Tests
- [ ] Outlook Desktop (Windows)
- [ ] Yahoo Mail
- [ ] ProtonMail
- [ ] Dark mode in all above clients

### Validation Tests
- [ ] Links work correctly
- [ ] Button is clickable and properly sized
- [ ] Text is readable with images disabled
- [ ] Plain text version renders correctly
- [ ] Responsive design works under 480px width
- [ ] HTML validates (W3C validator)
- [ ] Spam score is acceptable (Mail-Tester.com)

## 🛠️ Testing Tools

### Free Tools

**Putsmail** (putsmail.com)
- Send test emails to yourself
- No signup required
- Perfect for quick tests

**Mail-Tester** (mail-tester.com)
- Check spam score
- Validate authentication (SPF, DKIM, DMARC)
- Free 3 tests per day

**Personal Email Accounts**
- Send to your own Gmail, Outlook, Apple Mail accounts
- Most effective for real-world testing

### Paid Tools (Optional)

**Inbox Pirates** ($5/month)
- 10 email client screenshots per test
- Affordable for small teams
- Good balance of coverage and cost

**Litmus** ($99/month)
- 70+ email client previews
- Advanced testing features
- Best for enterprise teams

## 📋 Deployment Checklist

Before sending magic link emails in production:

### 1. Email Authentication (Required)
Set up these DNS records for your domain:

- [ ] **SPF** - Authorize your email servers
- [ ] **DKIM** - Add cryptographic signature
- [ ] **DMARC** - Set email authentication policy

**Why:** Gmail and Yahoo require these since February 2024. Without them, your emails will bounce or go to spam.

### 2. Magic Link Security

- [ ] Use cryptographically secure random tokens (32+ bytes)
- [ ] Store hashed version in database
- [ ] Set 15-minute expiration time
- [ ] Invalidate token after single use
- [ ] Use HTTPS only for all links
- [ ] Implement rate limiting (e.g., 5 requests per hour per email)

### 3. Email Service Setup

- [ ] Configure your email service provider (SendGrid, AWS SES, Mailgun, etc.)
- [ ] Set up bounce handling
- [ ] Configure webhook for tracking delivery/opens (if needed)
- [ ] Test in sandbox/dev mode first
- [ ] Keep spam rate below 0.3%

### 4. Monitoring

- [ ] Track delivery rates
- [ ] Monitor bounce rates
- [ ] Watch for spam complaints
- [ ] Log all magic link generation and usage
- [ ] Set up alerts for suspicious activity

## 🎨 Customization

### Update Logo

Replace the logo placeholder in `magic-link.html`:

```html
<!-- Replace this line: -->
<img src="{{logo_url}}" alt="JADE" width="120" height="auto">

<!-- With your logo URL -->
<img src="https://cdn.yoursite.com/logo.png" alt="JADE" width="120" height="auto">
```

**Logo requirements:**
- Hosted on reliable CDN or server
- HTTPS URL
- Recommended size: 240x80px (displayed at 120px width)
- PNG or SVG format
- Transparent background preferred

### Update Brand Colors

The template uses JADE's primary green color (`#00A676`). To change:

1. Find all instances of `#00A676` in `magic-link.html`
2. Replace with your brand color
3. Ensure sufficient contrast for accessibility (test with WebAIM Contrast Checker)

### Update Content

Edit the email copy in `magic-link.html`:

- **Heading** (line 163): `<h1>Sign in to JADE</h1>`
- **Body text** (line 173): Main message about the magic link
- **Button text** (line 201): `Sign In to JADE`
- **Security notice** (line 228): Warning about not sharing the link
- **Footer** (line 248): Company tagline and information

## 🐛 Troubleshooting

### Images Not Loading

**Problem:** Logo or images don't display in email client

**Solutions:**
- Ensure image URL is absolute (starts with `https://`)
- Host images on reliable CDN or server
- Check that your email service isn't blocking image URLs
- Test with a different image URL

### Button Not Working in Outlook

**Problem:** Button appears as link or doesn't render correctly

**Solution:** The template includes VML code for Outlook. Make sure you didn't remove the `<!--[if mso]>` conditional comments.

### Email Goes to Spam

**Possible causes:**
- Missing SPF/DKIM/DMARC authentication
- High spam score (test with Mail-Tester.com)
- No unsubscribe link (not required for transactional emails but helps)
- Suspicious link patterns
- Poor sender reputation

**Solutions:**
- Set up email authentication (SPF, DKIM, DMARC)
- Warm up your sending domain gradually
- Keep spam complaint rate below 0.1%
- Use a reputable email service provider

### Dark Mode Issues

**Problem:** Colors look wrong in dark mode

**Solution:** The template includes dark mode CSS in `@media (prefers-color-scheme: dark)`. Test in:
- Apple Mail (macOS/iOS) - Full support
- Outlook Mac - Full support
- Gmail - Partial support
- Outlook Windows - Limited support

### Mobile Rendering Issues

**Problem:** Email doesn't look good on mobile

**Solutions:**
- Test on actual devices, not just browser resize
- Verify `@media only screen and (max-width: 480px)` styles are present
- Check that viewport meta tag exists
- Test in Gmail mobile app and Apple Mail

## 📚 Additional Resources

- **Full Research Report:** `../email-template-research-report.md`
- **Template Variables:** `template-variables.md`
- **W3C HTML Validator:** validator.w3.org
- **Mail Tester:** mail-tester.com
- **Can I Email:** caniemail.com (email client CSS support)

## 🔒 Security Best Practices

1. **Never log magic links** - Only log hashed versions
2. **Use single-use tokens** - Invalidate after authentication
3. **Short expiration** - 15 minutes is recommended
4. **HTTPS only** - Never send magic links over HTTP
5. **Rate limiting** - Prevent brute force attacks
6. **User verification** - Confirm email ownership before sending
7. **Audit trail** - Log all authentication attempts
8. **Clear communication** - Tell users what to do if they didn't request the link

## 📧 Support

For questions about:
- **Email rendering issues** - Check the troubleshooting section above
- **Template customization** - See the Customization section
- **Implementation help** - Refer to the Quick Start guide
- **Security concerns** - Review the Security Best Practices section

## 📝 License

Part of the JADE Login Flow project. All rights reserved.

---

**Version:** 1.0
**Last Updated:** November 5, 2025
**Compatible With:** Gmail, Outlook, Apple Mail, Yahoo Mail, and 40+ other email clients
