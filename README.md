# JADE Login Flow - Passwordless Authentication & Subscription

Modern passwordless authentication flow with SSO support and streamlined subscription experience.

## 🎯 Overview

```
📧 EMAIL → 🔐 AUTH → 👤 SETUP → 💎 PLAN → ✅ SUCCESS → 🚀 APP
```

**Key Features:**
- Passwordless authentication (magic link + SSO)
- Complete onboarding flow with profile setup
- Streamlined plan selection with Enterprise contact flow
- Professional design with modular CSS architecture
- Mobile-responsive and accessible
- Shared component architecture (reduced ~455+ lines of duplication)
- Comprehensive code review completed with refactoring plan

---

## 📁 File Structure

### Main Flow

#### 1. Entry Point
- **`index.html`** - Auto-redirects to landing page
- **`1-gated-landing.html`** - Email entry point with SSO detection

#### 2. Authentication Flow (`auth/`)
- **`step1-email.html`** - Email entry (alternative entry)
- **`step2-method.html`** - SSO selection (Google/Microsoft) or Magic Link
- **`magic-link-sent.html`** - Confirmation page after sending magic link
- **`verify.html`** - Magic link verification and authentication

#### 3. Onboarding/Setup Flow (`setup/`)
- **`index.html`** - Personal details (First Name, Last Name, Mobile, Alert preference)
- **`alerts.html`** - Alert preferences (Court selection)

#### 4. Subscription Flow
- **`2-plan-selection.html`** - Plan selection with Free/Pro/Enterprise options
- **`3-subscription-complete.html`** - Success page with confetti animation
- **`app-loading.html`** - Universal loading transition to main app

#### 5. Main Application
- **`4-main-app-free.html`** - Free tier with upgrade banner
- **`4-main-app-pro.html`** - Pro tier (full access)

### CSS Architecture (`css/`)

#### Core
- **`jade.css`** - Main entry point (imports all components)
- **`design-tokens.css`** - CSS variables and design system

#### Components (`css/components/`)
- **`badges.css`** - User badges (FREE/PRO), promotional badges
- **`buttons.css`** - Primary, secondary, toggle buttons
- **`cards.css`** - Card components and plan cards
- **`checkbox-grid.css`** - ✨ Multi-select checkbox grid layout
- **`confetti.css`** - ✨ Success celebration confetti animation
- **`forms.css`** - Input fields, checkboxes, form elements
- **`layout.css`** - Main container, sidebar, content area
- **`loading.css`** - Loading spinners, status icons, animations
- **`messages.css`** - Error and success messages
- **`navigation.css`** - Header, nav links, search bar
- **`radio-buttons.css`** - ✨ Custom styled radio button groups
- **`results.css`** - Search results display
- **`stepper.css`** - Onboarding progress stepper
- **`toast.css`** - Toast notifications
- **`utilities.css`** - Utility classes, accessibility helpers

### JavaScript (`js/`)
- **`utils.js`** - Core utilities (errors, loading, session, toasts)
- **`components.js`** - ✨ Reusable HTML component factories
- **`form-validation.js`** - ✨ Form validation utilities
- **`session-manager.js`** - ✨ Type-safe session management
- **`sso-config.js`** - SSO provider configuration
- **`magic-link.js`** - Magic link token generation and validation
- **`loading-states.js`** - Page transition utilities

---

## 🔐 User Flows

**All users go through Plan Selection after authentication/setup to see promotional offers**

### 🧪 Test Emails
Use these emails to test different user flows:
- **`new@email.com`** - Previously non-registered user (full onboarding)
- **`normal@gmail.com`** - Returning user (setup completed)
- **`org@organisation.com`** - Organization user (auto Pro access)

---

### Flow 1: Previously Non-Registered User
**Test with:** `new@email.com`

**Full onboarding with setup required**

1. **Enter email** → `1-gated-landing.html`
2. **Authentication:**
   - Magic link sent → `auth/magic-link-sent.html` → `auth/verify.html`
   - System detects new user (no previous login history)
3. **Account Setup** → `setup/index.html` (Personal Details)
   - First Name, Last Name, Mobile
   - Alert preference (Yes/No)
4. **Alert Preferences:**
   - If Yes → `setup/alerts.html` → Select courts → Direct to Plan Selection
   - If No → Direct to Plan Selection
5. **Plan Selection (Promotion)** → `2-plan-selection.html`
   - Choose Free, Pro, or Enterprise
   - Can skip offer
6. **Access App:**
   - Free → `app-loading.html` → `4-main-app-free.html` (with upgrade banner)
   - Pro → `3-subscription-complete.html` → `app-loading.html` → `4-main-app-pro.html`
   - Enterprise → Shows contact confirmation toast

**Key Characteristics:**
- First-time user requiring complete profile setup
- Goes through full onboarding flow
- Sees plan selection after setup completion

---

### Flow 2: Returning User (Setup Completed)
**Test with:** `normal@gmail.com`

**Direct to promotion after authentication, no setup needed**

1. **Enter email** → `1-gated-landing.html`
2. **Authentication:**
   - Magic link sent → `auth/magic-link-sent.html` → `auth/verify.html`
   - System detects returning user (has logged in before)
3. **Skip Setup** → Already completed previously
4. **Plan Selection (Promotion)** → `2-plan-selection.html`
   - Shows promotional offer (30% off)
   - Respects user preferences ("Don't show again", reminder dates)
5. **Access App:**
   - Free tier → `app-loading.html` → `4-main-app-free.html`
   - Pro subscription → `app-loading.html` → `4-main-app-pro.html`
   - Skip offer → Go to app based on current tier

**Key Characteristics:**
- Returning user with completed setup
- Skips onboarding entirely
- Goes directly to plan selection or app

---

### Flow 3: Organization User
**Test with:** `org@organisation.com`

**Auto-assigned Pro access, bypasses plan selection**

1. **Enter email** → `1-gated-landing.html`
2. **SSO Detection:**
   - System detects enterprise domain
   - Shows SSO option (if available) or magic link
3. **Authentication** → `auth/verify.html`
4. **Auto Pro Access:**
   - System automatically grants Pro tier
   - Bypasses plan selection entirely
5. **Direct to App:**
   - `app-loading.html` → `4-main-app-pro.html` (full Pro features)

**Key Characteristics:**
- Enterprise email domain user
- Automatically gets Pro tier access
- Bypasses plan selection and payment flow
- May require onboarding if first-time user

---

### Universal Rule
**Every non-enterprise user sees Plan Selection page after sign in/setup** to ensure promotional offers reach all users. The page intelligently:
- Shows offers to users without Pro subscription
- Respects "Don't show again" preferences
- Checks reminder dates (7-day delay if requested)
- Routes Pro subscribers directly to app if they've opted out
- **Exception:** Enterprise users (`@organisation.com`) bypass plan selection

---

## 🎨 Design System

### CSS Component Usage

**Quick Start:**
```html
<!-- Import everything (recommended) -->
<link rel="stylesheet" href="css/jade.css">
<body class="jade-theme">
  <!-- All components available -->
</body>
```

**Common Components:**

```html
<!-- Buttons -->
<button class="btn-primary">Primary Action</button>
<button class="btn-secondary">Secondary Action</button>

<!-- Cards -->
<div class="card p-6">
  <!-- Card content -->
</div>

<!-- Forms -->
<input type="text" class="input-field" placeholder="Enter text">
<input type="email" class="input-field" placeholder="your@email.com">

<!-- Error Messages -->
<div class="error-message">
  <svg><!-- icon --></svg>
  <span class="error-text">Error message here</span>
</div>

<!-- Loading States -->
<div class="spinner"></div>
<div class="spinner spinner-sm"></div>

<!-- Badges -->
<span class="badge-free">FREE</span>
<span class="badge-pro">PRO</span>

<!-- Toast (JavaScript) -->
<script>
  showToast('Success message', 'success', 3000);
  showToast('Error message', 'error', 3000);
</script>
```

**Page Layout:**
```html
<body class="jade-theme">
  <main class="flex-1 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <!-- Logo + Title -->
      <div class="text-center mb-8">
        <img src="jade_logo.svg" class="h-10 mx-auto mb-8" />
        <h1 class="text-3xl font-bold mb-3 font-serif">Page Title</h1>
        <p class="text-sm jade-text-muted">Subtitle text</p>
      </div>

      <!-- Form Card -->
      <div class="card p-6 sm:p-8">
        <!-- Form content -->
      </div>
    </div>
  </main>
</body>
```

### Color Palette
```css
/* Light Mode (Default) */
--primary: #089444        /* JADE Green */
--background: #f7f9fc     /* Light Blue-Gray */
--foreground: #374151     /* Dark Gray */
--card: #ffffff          /* White */
--accent: #e0f2fe        /* Light Blue */
--border: #e5e7eb        /* Light Gray */
--success: #22c55e       /* Green */
--error: #dc2626         /* Red */
```

**Dark Mode Support:** Available via `data-theme="dark"` attribute (disabled by default)

### Typography
- **Headings:** Lora (serif) - professional elegance
- **Body:** Alegreya Sans (sans-serif) - clean readability
- **Monospace:** IBM Plex Mono - numbers and code

### Responsive Design
- **Mobile:** 640px and below
- **Tablet:** 768px and below
- **Desktop:** Above 768px

---

## 💻 Technical Details

### Stack
- **HTML5:** Semantic markup
- **CSS:** Modular component architecture with CSS variables
- **Tailwind CSS:** Utility-first via CDN (for layout only)
- **Vanilla JavaScript:** ES6+, no framework dependencies
- **SessionStorage:** For auth state management

### ⚠️ Demo/Prototype Characteristics

**This is a design prototype to demonstrate user flow - not a production app.**

Key behaviors for demo purposes:
- **No data persistence between sessions** - Each page load starts fresh
- **No data restoration** - Form fields always show defaults (never pre-filled from previous sessions)
- **SessionStorage cleared on completion** - Onboarding data removed after flow completes
- **Simplified transitions** - Direct routing from setup to plan selection
- **Mock authentication** - Magic links and SSO are simulated (no backend)

**Why this matters for developers:**
- Easier to demonstrate flow repeatedly without clearing browser data
- Each walkthrough starts from clean state
- Focus on UX/UI rather than data management
- Simplified for stakeholder presentations and user testing

### Key Features

#### CSS
- 200+ hardcoded values replaced with CSS variables
- Namespaced classes (`.jade-*`) to prevent Tailwind conflicts
- Scoped global selectors (`.jade-theme`)
- Comprehensive responsive design
- Dark mode support (manual toggle)
- Removed duplicate animations

#### JavaScript
- Email validation
- SSO detection
- Magic link token generation
- Session management
- Toast notifications
- Loading states
- Form validation

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📊 Plan Comparison

| Feature | Free | Professional | Enterprise |
|---------|------|--------------|------------|
| **Price** | $0 | $696.50/year | Custom |
| **Discount** | - | 30% off ($995) | Negotiable |
| **Search** | Advanced Search, Citator | + Focus Matches, Clips | Everything |
| **Library** | Basic Alerts, Marks | + Export, Uploads, Citations | + API Access |
| **Visualization** | - | Full Suite | + Custom Tools |
| **Support** | Community | Email | Dedicated Manager |

---

## 🎯 Key UX Decisions

### What We Built & Why

| Decision | Rationale |
|----------|-----------|
| Passwordless auth | Reduced friction, modern security |
| SSO detection | Smart routing, fewer clicks |
| Dismissible banner | Respects user choice |
| Free tier available | Risk-free trial |
| Clean plan selection | Clear pricing, no tricks |
| Confetti animation | Positive reinforcement |

### Design Philosophy
1. **Minimal Friction:** Passwordless = fewer steps
2. **User Choice:** Can start with free tier
3. **Transparency:** Clear pricing, no hidden fees
4. **Professional:** Design for legal professionals
5. **Accessibility:** WCAG compliant, keyboard navigation
6. **Performance:** Fast loading, optimized CSS

---

## 🛠️ Local Development

### Quick Start
```bash
# Clone repository
git clone https://github.com/seanleeopenlaw/Jade-Login.git
cd Jade-Login

# Open in browser
open 1-gated-landing.html
```

### Testing Flow

**Use these test emails to experience different user journeys:**

| Email | Flow Type | What Happens |
|-------|-----------|--------------|
| `new@email.com` | Previously non-registered user | Full onboarding → Setup → Plan selection → App |
| `normal@gmail.com` | Returning user | Auth → Plan selection → App (no setup) |
| `org@organisation.com` | Organization user | Auth → Direct to Pro app (bypasses plan selection) |

**Steps to test:**
1. Open `1-gated-landing.html` or visit https://jade-login-flow.vercel.app
2. Enter one of the test emails above
3. Click "Continue" to proceed through the flow
4. Follow the authentication and onboarding steps
5. Experience the complete user journey for that user type

### LocalStorage/SessionStorage Keys
```javascript
// Authentication (sessionStorage)
'authEmail': 'user@example.com'
'isAuthenticated': 'true'
'authMethod': 'google' | 'microsoft' | 'magicLink'
'isNewUser': 'true'
'userEmail': 'user@example.com'
'userName': 'John Doe'

// Magic Link (sessionStorage)
'pendingMagicLink': { token, expires, email, magicLink }

// Onboarding/Setup (sessionStorage)
'onboardingData': {
  firstName: 'John',
  lastName: 'Doe',
  mobile: '+1234567890',
  wantsAlerts: true,
  selectedCourts: ['HCA', 'NSWCA']
}
'onboardingComplete': 'true'

// Subscription (sessionStorage)
'subscriptionPlan': 'professional'
'billingPeriod': 'annual'
'subscriptionPrice': '696.50'

// Toast Messages (sessionStorage)
'showToast': { message: 'Success!', type: 'success' }

// Banner Control (localStorage)
'hasSeenOffer': 'true'
'hideSubscriptionOffer': 'true'
'subscriptionReminderDate': ISO timestamp
'hasLoggedInBefore': 'true'
```

---

## 🔐 Security Considerations

### Implemented (Prototype)
- Magic link token expiration (15 minutes)
- Secure token generation (random + timestamp)
- Session-based authentication
- Form validation
- HTTPS-ready

### Production Requirements
- Backend token validation
- Rate limiting on magic link requests
- CSRF protection
- Session timeout
- Proper SSO OAuth flow
- Database for user management
- Encryption for sensitive data

---

## 🛠️ How to Build User Flows

### Creating a New Auth Page

**1. Copy Template Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - JADE</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/jade.css">
</head>
<body class="jade-theme">
  <main class="flex-1 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <img src="../jade_logo.svg" alt="JADE" class="h-10 mx-auto mb-8" />
        <h1 class="text-3xl sm:text-4xl font-bold mb-3 font-serif">Your Title</h1>
        <p class="text-base jade-text-muted">Your subtitle</p>
      </div>

      <!-- Form Card -->
      <div class="card p-6 sm:p-8">
        <!-- Your content here -->
      </div>
    </div>
  </main>

  <script src="../js/utils.js"></script>
  <!-- Your page-specific JavaScript -->
</body>
</html>
```

**2. Add Form with Validation:**
```html
<form id="your-form" class="space-y-5">
  <div>
    <label for="email" class="block text-sm font-medium mb-2">Email</label>
    <input
      type="email"
      id="email"
      class="input-field"
      placeholder="your@email.com"
      required
    />
    <div id="email-error" style="display: none; color: var(--error); font-size: 0.875rem; margin-top: 0.5rem;"></div>
  </div>

  <button type="submit" class="btn-primary" id="submit-btn">
    Continue
  </button>
</form>

<script>
  const form = document.getElementById('your-form');
  const emailInput = document.getElementById('email');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      showError('Please enter a valid email');
      return;
    }

    // Show loading state
    showLoading(submitBtn, 'Processing...');

    // Your logic here
    await simulateDelay(1000);

    // Store in session
    setSession('userEmail', email);

    // Redirect
    window.location.href = 'next-page.html';
  });
</script>
```

**3. Add Loading States:**
```javascript
// Show loading (basic)
showLoading(button, 'Loading...');

// Show loading with spinner
showLoading(button, 'Sending...', { showSpinner: true });

// Hide loading
hideLoading(button);

// Show error
showError('Error message here');

// Hide error
hideError();

// Show toast
showToast('Success!', 'success', 3000);

// Delay helper
await delay(1000); // Wait 1 second
```

**4. Session Management:**

*Option A: Using SessionManager (Recommended - Type-safe)*
```javascript
// Import SessionManager
// <script src="../js/session-manager.js"></script>

// Store data (type-safe, no typos)
SessionManager.setUserEmail('user@example.com');
SessionManager.setNewUser(true);
SessionManager.setAuthenticated(true);

// Retrieve data
const email = SessionManager.getUserEmail();
const isNew = SessionManager.isNewUser();

// Check authentication
if (!SessionManager.isAuthenticated()) {
  window.location.href = '../1-gated-landing.html';
}

// Clear data
SessionManager.clearAuth();      // Clear auth data only
SessionManager.clearOnboarding(); // Clear onboarding only
SessionManager.clearAll();        // Clear everything

// Debug
SessionManager.debugPrint();      // Log all session data
```

*Option B: Using raw session functions*
```javascript
// Store data (prone to typos)
setSession('userEmail', 'user@example.com');
setSession('isNewUser', true);

// Retrieve data
const email = getSession('userEmail');
const isNew = getSession('isNewUser');
```

### Implementing User Flow Logic

**Check if User is New:**
```javascript
// In auth/verify.html (after successful login)
const previousLogin = localStorage.getItem('hasLoggedInBefore');
if (!previousLogin) {
  setSession('isNewUser', true);
  localStorage.setItem('hasLoggedInBefore', 'true');
}
```

**Route Based on User State:**
```javascript
// Helper function (add to js/utils.js if needed)
function getPostAuthRedirect(email) {
  const isNewUser = getSession('isNewUser');
  const onboardingComplete = getSession('onboardingComplete');

  if (isNewUser && !onboardingComplete) {
    return 'setup/index.html';  // First-time setup
  }

  return '2-plan-selection.html';  // Direct to plan selection
}

// Use in your auth pages
window.location.href = getPostAuthRedirect(email);
```

**Detect SSO Availability:**
```javascript
// Get auth methods from sso-config.js
const authMethods = getAuthMethods(email);

if (authMethods.hasSSO) {
  // Show SSO options
  window.location.href = 'auth/step2-method.html';
} else {
  // Send magic link directly
  const result = createMagicLinkToken(email);
  await sendMagicLinkEmail(email, result.magicLink);
  window.location.href = 'auth/magic-link-sent.html';
}
```

### Using Reusable Components

**Import the modules:**
```html
<script src="../js/utils.js"></script>
<script src="../js/components.js"></script>
<script src="../js/form-validation.js"></script>
<script src="../js/session-manager.js"></script>
```

**Create components programmatically:**
```javascript
// Create error message container
const errorMessage = createErrorMessage('error-message');
document.querySelector('.card').prepend(errorMessage);

// Create page header
const header = createPageHeader({
  title: 'Sign In',
  subtitle: 'Enter your email to continue',
  logoSrc: '../jade_logo.svg'
});
document.querySelector('main > div').prepend(header);

// Create input field with error handling
const emailField = createInputField({
  id: 'email',
  type: 'email',
  label: 'Email address',
  placeholder: 'your@email.com',
  required: true,
  autocomplete: 'email'
});
form.appendChild(emailField);

// Create submit button
const submitBtn = createButton({
  id: 'submit-btn',
  text: 'Continue',
  type: 'primary'
});
form.appendChild(submitBtn);
```

**Use form validation:**
```javascript
// Simple validation
const emailInput = document.getElementById('email');
const isValid = validateEmailField(emailInput);

// With custom messages
const isValid = validateEmailField(emailInput, {
  errorSelector: '#email-error',
  emptyMessage: 'Email is required',
  invalidMessage: 'Invalid email format'
});

// Setup real-time validation
setupEmailValidation(emailInput, {
  errorSelector: '#email-error',
  checkDomain: true
});

// Validate other fields
validateNameField(firstNameInput, {
  errorSelector: '#firstName-error',
  fieldName: 'First name'
});

validatePhoneField(mobileInput, {
  errorSelector: '#mobile-error'
});

// Clear all errors
clearFormErrors(form);
```

---

## 🚧 Production Checklist

### Phase 1: Backend Integration
- [ ] Set up authentication service (Auth0/FusionAuth)
- [ ] Implement magic link email sending
- [ ] Add database for user accounts
- [ ] Build API endpoints
- [ ] Add session management

### Phase 2: Payment Integration
- [ ] Integrate Stripe/payment processor
- [ ] Add webhook handlers
- [ ] Implement subscription management
- [ ] Set up billing portal
- [ ] Add receipt emails

### Phase 3: Polish
- [ ] Add proper error handling
- [ ] Implement analytics (Mixpanel/GA)
- [ ] Set up monitoring
- [ ] Add A/B testing framework
- [ ] Performance optimization

### Phase 4: Launch
- [ ] Security audit
- [ ] Load testing
- [ ] User acceptance testing
- [ ] Staged rollout

---

## 📝 Recent Updates

### Version 4.2 (November 3, 2025)
- Enhanced plan selection UX with circular check icons
- Added Enterprise contact flow with "Talk to Sales Team" button
- Fixed price formatting ($696.50 consistency)
- Improved sign-in page subtitle
- ✨ **New:** Created reusable component modules
  - `js/components.js` - HTML component factories (6 functions)
  - `js/form-validation.js` - Form validation utilities (6 validators)
  - `js/session-manager.js` - Type-safe session management (30+ methods)
- 🔧 **Refactoring:** Consolidated button loading functions
  - Merged duplicate implementations (utils.js + loading-states.js)
  - Added spinner support to `showLoading()`
  - Enhanced with opacity and loading state classes
- ✅ **Migration Complete:**
  - `1-gated-landing.html` - Now uses `form-validation.js` (35 lines → 3 lines)
  - `auth/step1-email.html` - Now uses `form-validation.js` (43 lines → 5 lines)
  - Total code reduction: ~70 lines of duplicate validation logic removed

### Version 4.1 (November 3, 2025)
- Streamlined demo flow with direct routing
- Removed data restoration for clean demo state
- Optimized user journey transitions

### Previous Versions
- v4.0: Complete onboarding/setup flow
- v3.0: Modular CSS architecture
- v2.0: Passwordless authentication
- v1.0: Initial flow

---

## 🎉 Contributors

Built with Claude Code for production-ready CSS architecture.

---

**Designed for conversion. Built for scale. Optimized for developers.**

*Last Updated: November 3, 2025*
*Version: 4.2 (UX Polish & Code Quality Review)*
