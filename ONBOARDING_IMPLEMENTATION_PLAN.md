# Onboarding Flow Implementation Plan

## 📋 Current State Analysis

### Auth Flow (As-Is)
```
Entry → Email Check → Auth Method Selection → Verification → 2-plan-selection.html
```

**Current Redirect Points:**
1. `auth/verify.html` (line 157): → `2-plan-selection.html`
2. `auth/step2-method.html` (line 116, 130): → `2-plan-selection.html`

### User Data Management
- **SessionStorage Keys:**
  - `userEmail`: User's email address
  - `isAuthenticated`: Boolean auth status
  - `authMethod`: 'magic-link' | 'google' | 'microsoft'
  - `isNewUser`: Boolean (set if no `hasLoggedInBefore` in localStorage)

- **LocalStorage Keys:**
  - `hasLoggedInBefore`: Tracks if user has logged in before
  - *(Need to add)* `profileSetupComplete`: Completion status of onboarding

---

## 🎯 Implementation Tasks

### Phase 1: Foundation (Utility Functions & Logic)

#### Task 1.1: Add Onboarding Utility Functions
**File:** `js/utils.js`

**Functions to Add:**
```javascript
// Check if user should go through onboarding
function shouldShowOnboarding(email) {
  if (email !== 'new@email.com') return false;

  const setupComplete = localStorage.getItem('profileSetupComplete');
  return setupComplete !== 'true';
}

// Mark onboarding as complete
function markOnboardingComplete() {
  localStorage.setItem('profileSetupComplete', 'true');
  setSession('profileSetupComplete', true);
}

// Get onboarding data
function getOnboardingData(key) {
  const data = sessionStorage.getItem('onboardingData');
  if (!data) return null;
  try {
    const parsed = JSON.parse(data);
    return key ? parsed[key] : parsed;
  } catch {
    return null;
  }
}

// Save onboarding data
function saveOnboardingData(data) {
  const existing = getOnboardingData() || {};
  const updated = { ...existing, ...data };
  sessionStorage.setItem('onboardingData', JSON.stringify(updated));
}

// Clear onboarding data
function clearOnboardingData() {
  sessionStorage.removeItem('onboardingData');
}
```

**Complexity:** Low
**Estimated Time:** 15 minutes

---

#### Task 1.2: Create Routing Logic Helper
**File:** `js/utils.js`

**Function to Add:**
```javascript
// Determine post-auth redirect URL
function getPostAuthRedirect(email) {
  if (shouldShowOnboarding(email)) {
    return 'setup/index.html';
  }
  return '2-plan-selection.html';
}
```

**Complexity:** Low
**Estimated Time:** 5 minutes

---

### Phase 2: Update Auth Success Handlers

#### Task 2.1: Update Magic Link Verification
**File:** `auth/verify.html` (line 156-158)

**Current Code:**
```javascript
setTimeout(() => {
  window.location.href = '../2-plan-selection.html';
}, 1500);
```

**Updated Code:**
```javascript
setTimeout(() => {
  const email = result.email;
  const redirectUrl = shouldShowOnboarding(email)
    ? '../setup/index.html'
    : '../2-plan-selection.html';
  window.location.href = redirectUrl;
}, 1500);
```

**Complexity:** Low
**Estimated Time:** 5 minutes

---

#### Task 2.2: Update Google SSO Handler
**File:** `auth/step2-method.html` (line 111-117)

**Current Code:**
```javascript
setTimeout(() => {
  setSession('userEmail', email);
  setSession('isAuthenticated', true);
  setSession('authMethod', 'google');
  setSession('isNewUser', true);
  window.location.href = '../2-plan-selection.html';
}, 1000);
```

**Updated Code:**
```javascript
setTimeout(() => {
  setSession('userEmail', email);
  setSession('isAuthenticated', true);
  setSession('authMethod', 'google');
  setSession('isNewUser', true);

  const redirectUrl = shouldShowOnboarding(email)
    ? '../setup/index.html'
    : '../2-plan-selection.html';
  window.location.href = redirectUrl;
}, 1000);
```

**Complexity:** Low
**Estimated Time:** 5 minutes

---

#### Task 2.3: Update Microsoft SSO Handler
**File:** `auth/step2-method.html` (line 125-131)

**Similar update as Google SSO**

**Complexity:** Low
**Estimated Time:** 5 minutes

---

### Phase 3: Create Page Structure

#### Task 3.1: Create Setup Directory
```bash
mkdir setup
```

**Files to Create:**
- `setup/index.html` - Profile setup page
- `setup/alerts.html` - Alert preferences page
- `welcome.html` - Welcome/intro page (root level)

**Complexity:** Low
**Estimated Time:** 2 minutes

---

### Phase 4: Implement Setup Pages

#### Task 4.1: Build `/setup/index.html`

**Page Requirements:**
- Full-screen layout (not modal)
- Form fields:
  - First Name (required)
  - Last Name (required)
  - Mobile Number (optional, with phone format)
  - Alert Opt-In: Radio buttons "Yes / No" (default: No)
- Navigation:
  - If "Yes" to alerts → `/setup/alerts.html`
  - If "No" to alerts → `/welcome.html`
- Validation: First & Last name required
- Design: Use existing `.card`, `.btn-primary` components

**Page Flow:**
```
User fills form → Clicks [Continue] →
  If alerts=yes → setup/alerts.html
  If alerts=no → ../welcome.html
```

**Data to Save (sessionStorage):**
```javascript
{
  firstName: 'John',
  lastName: 'Doe',
  mobile: '+61 400 000 000',
  wantsAlerts: true/false
}
```

**Complexity:** Medium
**Estimated Time:** 45 minutes

---

#### Task 4.2: Build `/setup/alerts.html`

**Page Requirements:**
- Court preference selection
- Options (checkboxes):
  - High Court of Australia (HCA)
  - Federal Court of Australia (FCA)
  - NSW Supreme Court
  - VIC Supreme Court
  - QLD Supreme Court
  - (Add more as needed)
- "Select All" / "Clear All" buttons
- Navigation:
  - Back button → `/setup/index.html` (preserve data)
  - Continue button → `/welcome.html`
- At least 1 court must be selected if on this page

**Data to Save (sessionStorage):**
```javascript
{
  ...existing,
  courts: ['HCA', 'FCA', 'NSW-SC']
}
```

**Complexity:** Medium
**Estimated Time:** 45 minutes

---

#### Task 4.3: Build `/welcome.html`

**Page Requirements:**
- Welcome message with user's name
- Feature highlights (3-4 cards):
  - 🔍 **Advanced Search** - Find cases & legislation instantly
  - 📚 **Citator** - Track case law citations
  - 🔔 **Alerts** - Stay updated on new decisions
  - 💾 **Save & Share** - Organize your research

**Dual CTA Design:**
- **Primary CTA:** "Claim 30% Off Professional" or "Get 30% Off – Limited Time"
  - Green button (btn-primary)
  - Redirects to `/2-plan-selection.html`
  - Shows promotional badge/tag
- **Secondary CTA:** "Continue with Free Access"
  - White button (btn-secondary)
  - Redirects to `/4-main-app-free.html`
  - Subtle, but clear option

**Button Layout:**
```
[🎁 Get 30% Off Professional – Limited Time] (Primary - Green)
           [Continue with Free Access] (Secondary - White)

         "You can always upgrade later"
```

**On either button click:**
- Call `markOnboardingComplete()`
- Clear onboarding session data
- Redirect based on selection

**Complexity:** Medium
**Estimated Time:** 45 minutes

---

### Phase 5: Testing & Verification

#### Task 5.1: Test Onboarding Flow for `new@email.com`

**Test Cases:**
1. ✅ Login as `new@email.com` (first time) → Should see setup flow
2. ✅ Complete setup → Should see welcome → Should land on dashboard
3. ✅ Login as `new@email.com` (second time) → Should skip to dashboard
4. ✅ Test "Yes" to alerts → Should see alerts page
5. ✅ Test "No" to alerts → Should skip alerts page
6. ✅ Test form validation (empty name fields)
7. ✅ Test back navigation (data preservation)

**Complexity:** Medium
**Estimated Time:** 30 minutes

---

#### Task 5.2: Verify Existing User Flow

**Test Cases:**
1. ✅ Login as any other email → Should skip setup entirely
2. ✅ Login as `user@example.com` → Should go to plan selection
3. ✅ Login as `test@google.com` (SSO) → Should go to plan selection

**Complexity:** Low
**Estimated Time:** 15 minutes

---

## 📊 Task Summary

| Phase | Tasks | Complexity | Est. Time | Dependencies |
|-------|-------|-----------|-----------|--------------|
| **1. Foundation** | 1.1, 1.2 | Low | 20 min | None |
| **2. Auth Updates** | 2.1, 2.2, 2.3 | Low | 15 min | Phase 1 |
| **3. Structure** | 3.1 | Low | 2 min | None |
| **4. Pages** | 4.1, 4.2, 4.3 | Medium | 2h 15min | Phase 1, 3 |
| **5. Testing** | 5.1, 5.2 | Low-Med | 45 min | All above |
| **TOTAL** | 10 tasks | - | **3h 37min** | - |

---

## 🎨 Design Guidelines

### Reuse Existing Components
- `.card` - For form containers
- `.btn-primary` - Primary CTA buttons
- `.btn-secondary` - Back/secondary actions
- `.input-field` - Text inputs
- `.jade-text-muted` - Helper text
- `.fade-in` - Page entrance animation

### Layout Structure
```html
<body class="jade-theme">
  <main class="flex-1 flex items-center justify-center px-4 py-12">
    <div class="max-w-2xl w-full">
      <!-- Logo -->
      <!-- Progress indicator (optional) -->
      <!-- Form card -->
      <!-- Navigation buttons -->
    </div>
  </main>
</body>
```

### Responsive Considerations
- All pages must work on mobile (640px)
- Use Tailwind utility classes for layout
- Stack form fields vertically on mobile
- Full-width buttons on mobile

---

## 🔒 Data Persistence Strategy

### Session Storage (Temporary)
```javascript
sessionStorage: {
  onboardingData: {
    firstName: string,
    lastName: string,
    mobile: string,
    wantsAlerts: boolean,
    courts: string[]
  }
}
```

### Local Storage (Persistent)
```javascript
localStorage: {
  profileSetupComplete: 'true' | 'false',
  hasLoggedInBefore: 'true'
}
```

### Clear Strategy
- Clear `onboardingData` from sessionStorage after welcome page
- Keep `profileSetupComplete` in localStorage forever
- Reset only if user explicitly resets account

---

## 🚀 Deployment Notes

### Feature Flag Approach
- Currently: Hard-coded to `email === 'new@email.com'`
- Future: Can be extended to:
  - Check against backend API for user status
  - Use feature flag system (LaunchDarkly, etc.)
  - Domain-based rules (e.g., all `@lawfirm.com` users)

### Backend Integration Points (Future)
- POST `/api/users/profile` - Save profile data
- POST `/api/users/alert-preferences` - Save court preferences
- GET `/api/users/me` - Fetch `profileSetupComplete` status from server

---

## ✅ Definition of Done

- [ ] All 10 tasks completed
- [ ] `new@email.com` goes through onboarding on first login
- [ ] `new@email.com` skips onboarding on subsequent logins
- [ ] All other emails skip onboarding entirely
- [ ] All pages are mobile-responsive
- [ ] Form validation works correctly
- [ ] Back navigation preserves entered data
- [ ] No console errors
- [ ] Code follows existing patterns and style
- [ ] Documentation updated

---

## 📝 Notes

- This implementation uses **localStorage** for simplicity
- In production, `profileSetupComplete` should be stored in the **backend database**
- The `new@email.com` check is a **temporary gate** - expand as needed
- Welcome page provides **choice**: Users can choose Pro (30% off) or Free
- No "30-day trial" pressure - users decide their path immediately
- Free users can upgrade anytime via banner in `/4-main-app-free.html`

---

**Ready to implement? Start with Phase 1!** 🚀
