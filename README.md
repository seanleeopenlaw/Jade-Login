# JADE Login Flow

Modern passwordless authentication flow with onboarding and subscription.

```
📧 EMAIL → 🔐 AUTH → 👤 SETUP → 💎 PLAN → ✅ SUCCESS → 🚀 APP
```

---

## 🚀 Quick Start

```bash
# Clone and run
git clone https://github.com/seanleeopenlaw/Jade-Login.git
cd Jade-Login
open index.html

# Or visit deployed version
https://jade-login-flow.vercel.app
```

### Test Emails

| Email | Flow |
|-------|------|
| `new@email.com` | New user → Full onboarding → Setup → Plan → App |
| `normal@gmail.com` | Returning user → Auth → Plan → App |
| `org@organisation.com` | Enterprise → Auth → Auto Pro access |

---

## 📁 Project Structure

### Main Pages

```
/
├── index.html                      # Email entry + SSO detection (Landing page)
│
├── auth/
│   ├── step2-method.html          # SSO/Magic Link selection
│   ├── magic-link-sent.html       # Email confirmation
│   └── verify.html                # Token verification
│
├── account-setup-step1.html       # Alert preferences
├── account-setup-step2.html       # Profile details
│
├── 2-plan-selection.html          # Free/Pro/Enterprise plans
├── 3-subscription-complete.html   # Success page
├── app-loading.html               # Loading transition
│
├── 4-main-app-free.html          # Free tier app
├── 4-main-app-pro.html           # Pro tier app
└── welcome.html                   # Feature introduction
```

### CSS Architecture

```
css/
├── jade.css                       # Main entry (imports all)
├── design-tokens.css             # Variables & tokens
└── components/
    ├── buttons.css, button-group.css
    ├── forms.css, radio-buttons.css
    ├── cards.css, badges.css
    ├── stepper.css, confetti.css
    ├── searchable-select.css
    └── ... (19 components total)
```

### JavaScript

```
js/
├── utils.js                      # Core utilities
├── searchable-select.js          # Multi-select component
├── form-validation.js            # Validation helpers
├── loading-states.js             # Page transitions
├── magic-link.js                 # Auth token logic
└── sso-config.js                 # SSO provider config
```

---

## 🔐 Authentication Flow

### New User (`new@email.com`)
1. Enter email → Detect new user
2. Magic link verification
3. **Account Setup:** Alert preferences → Profile details
4. Plan selection (Free/Pro/Enterprise)
5. App access

### Returning User (`normal@gmail.com`)
1. Enter email → Detect returning
2. Magic link verification
3. **Skip setup** (already completed)
4. Plan selection
5. App access

### Enterprise User (`org@organisation.com`)
1. Enter email → Detect enterprise domain
2. SSO or magic link
3. **Auto Pro access** (bypass plan selection)
4. Direct to Pro app

---

## 💻 Tech Stack

- **HTML5** - Semantic markup
- **CSS** - Modular component system with design tokens
- **Tailwind CSS** - Layout utilities (CDN)
- **Vanilla JavaScript** - ES6+, no frameworks
- **SessionStorage** - Demo state management

### Design System

- **Colors:** JADE Green (#089444), professional palette
- **Typography:** Lora (serif), Alegreya Sans (body), IBM Plex Mono (code)
- **Components:** 19 production-ready, Storybook-compatible
- **Responsive:** Mobile-first, 640px/768px/1024px breakpoints

---

## 📚 Documentation

Full documentation available:

- **[Component Library](docs/COMPONENT-LIBRARY.md)** - All 19 components with examples
- **[Onboarding Flow](docs/ONBOARDING-FLOW.md)** - Detailed user journey maps
- **[Quick Start Guide](docs/QUICK-START.md)** - Developer setup
- **[Searchable Select](docs/components/SEARCHABLE-SELECT.md)** - Multi-select component
- **[Refactoring Summary](REFACTORING-SUMMARY.md)** - Code quality report

---

## 🎨 Component Usage

```html
<!-- Import design system -->
<link rel="stylesheet" href="css/jade.css">
<body class="jade-theme">

  <!-- Buttons -->
  <button class="btn-primary">Primary</button>
  <button class="btn-secondary">Secondary</button>

  <!-- Forms -->
  <input type="email" class="input-field" placeholder="your@email.com">

  <!-- Cards -->
  <div class="card p-6">Card content</div>

  <!-- Loading -->
  <div class="spinner"></div>

  <!-- Badges -->
  <span class="user-badge">PRO</span>
</body>
```

**See [Component Library](docs/COMPONENT-LIBRARY.md) for complete reference.**

---

## 🛠️ Development

### Session Keys

```javascript
// Authentication
SessionManager.setUserEmail('user@example.com');
SessionManager.setAuthenticated(true);
SessionManager.isNewUser();

// Or raw access
setSession('userEmail', 'user@example.com');
getSession('isAuthenticated');
```

### Utility Functions

```javascript
// Form validation
validateEmailField(input);
setupEmailValidation(input);

// Loading states
showLoading(button, 'Processing...');
hideLoading(button);

// Toast notifications
showToast('Success!', 'success', 3000);

// Delay helper
await delay(1000);
```

### SSO Detection

```javascript
const authMethods = getAuthMethods(email);
if (authMethods.hasSSO) {
  // Show SSO options
} else {
  // Send magic link
}
```

---

## ⚠️ Demo Notes

This is a **prototype** for demonstrating UX flow:

- No backend - authentication is simulated
- SessionStorage only - no persistence between page loads
- Mock data - no real API calls
- Clean state - onboarding data cleared after completion

**For production:**
- Add backend authentication service
- Implement real magic link emails
- Set up database and API
- Add payment processing (Stripe)
- Implement session management
- Add analytics and monitoring

---

## 📦 Deployment

**Live Demo:** https://jade-login-flow.vercel.app

```bash
# Deploy to Vercel
vercel --prod

# Or push to main branch (auto-deploys)
git push origin main
```

---

## 🎯 Key Features

- ✅ Passwordless authentication (magic link + SSO)
- ✅ Smart user routing (new vs. returning)
- ✅ 2-step account setup flow
- ✅ Plan selection with promotional pricing
- ✅ Enterprise auto-provisioning
- ✅ Production-ready CSS architecture
- ✅ Mobile-responsive design
- ✅ Accessible (WCAG compliant)

---

**Built with Claude Code** | [GitHub](https://github.com/seanleeopenlaw/Jade-Login) | [Live Demo](https://jade-login-flow.vercel.app)

*Last Updated: 2025-01-09*
