# Passwordless Authentication Implementation Plan

## Overview
Refactor current email+password authentication to Vanta/Linear-style passwordless flow with SSO auto-detection.

## Architecture

### Authentication Flow
```
Step 1: Email Input
    ↓
Step 2: Auth Method Detection
    ├─→ SSO Available (Google/Microsoft) + Magic Link fallback
    └─→ Magic Link Only
    ↓
Step 3a: SSO OAuth Flow
    OR
Step 3b: Magic Link Sent → Email → Click Link → Verify Token
    ↓
Step 4: Redirect to App (create account if new user)
```

## File Structure

### New Files
```
auth/
├── step1-email.html          # Email input form
├── step2-method.html         # Auth method selection (SSO or Magic Link)
├── magic-link-sent.html      # Confirmation screen
├── verify.html               # Magic link verification handler
│
js/
├── auth-flow.js              # Main auth orchestration
├── magic-link.js             # Magic link generation & verification
├── sso-detector.js           # Domain-based SSO detection
├── sso-config.js             # SSO domain whitelist configuration
│
css/
└── auth-flow.css             # Step-based flow specific styles
```

### Updated Files
- `index.html` - Redirect to new auth flow
- `2-offer-page.html` - Handle new auth session format

## Components

### 1. Email Capture (step1-email.html)
**UI:**
- Simple centered form
- Input: "Enter your work email"
- Button: "Continue"
- Real-time email validation

**Logic:**
- On submit → check SSO domain whitelist
- Store email in sessionStorage
- Redirect to step2-method.html with SSO detection result

### 2. Auth Method Selection (step2-method.html)
**UI (SSO Available):**
- Display detected organization: "Sign in to [Company Name]"
- Primary buttons:
  - "Sign in with Google"
  - "Sign in with Microsoft"
- Divider: "or"
- Fallback: "Email me a sign-in link"

**UI (No SSO):**
- "Check your email"
- Text: "We'll email you a secure sign-in link to [email]"
- Button: "Send Magic Link"
- Link: "Back to change email"

**Logic:**
- SSO buttons → Trigger OAuth flow (existing Google logic)
- Magic Link button → Generate token, send email, redirect to magic-link-sent.html

### 3. Magic Link Sent (magic-link-sent.html)
**UI:**
- Success icon
- "Check your email"
- "We sent a sign-in link to [email]"
- Instructions: "Click the link in the email to continue"
- Action: "Resend link" (with 60s cooldown)
- Link: "Back to change email"

**Logic:**
- No automatic redirect
- Resend functionality with rate limiting
- Token expiry: 15 minutes

### 4. Magic Link Verification (verify.html)
**UI:**
- Loading spinner
- "Verifying your sign-in link..."
- Error states:
  - "This link has expired"
  - "Invalid sign-in link"
  - "This link has already been used"

**Logic:**
- Parse token from URL query param: `?token=xyz&email=user@example.com`
- Verify token validity (signature, expiry, usage)
- Create session
- Check if new user → create account
- Redirect to offer page or app

## Technical Implementation

### Magic Link Token System
```javascript
// Token Structure
{
  email: "user@example.com",
  token: "base64_encoded_signature",
  createdAt: timestamp,
  expiresAt: timestamp (15 min),
  used: false
}

// Storage: localStorage (simulate backend)
// Real implementation: Backend database with proper crypto
```

### SSO Domain Detection
```javascript
// sso-config.js
const SSO_DOMAINS = {
  'google.com': { providers: ['google'] },
  'microsoft.com': { providers: ['microsoft'] },
  'company.com': {
    providers: ['google', 'microsoft'],
    displayName: 'Company Name'
  }
  // ... add more domains
};

function detectSSO(email) {
  const domain = email.split('@')[1];
  return SSO_DOMAINS[domain] || null;
}
```

### Session Management
```javascript
// After successful auth (SSO or Magic Link)
setSession('userEmail', email);
setSession('isAuthenticated', true);
setSession('authMethod', 'magic-link' | 'google' | 'microsoft');
setSession('loginTime', timestamp);

// New users
if (!userExists(email)) {
  setSession('isNewUser', true);
  createUserAccount(email);
}
```

## Security Considerations

### Magic Link Security
1. **Token Generation:** Use crypto-secure random + HMAC signature
2. **One-Time Use:** Mark token as used after verification
3. **Expiry:** 15-minute TTL
4. **Rate Limiting:** Max 3 magic links per email per hour
5. **HTTPS Only:** Production must use HTTPS

### SSO Security
1. Use existing OAuth 2.0 flows (Google, Microsoft)
2. Verify state parameter to prevent CSRF
3. Validate ID tokens on backend

## Migration Strategy

### Phase 1: Parallel Implementation (Current Branch)
- Build new passwordless flow alongside existing system
- Default: Keep old login as fallback
- Test URL: `/auth/step1-email.html`

### Phase 2: Feature Flag
- Add toggle in utils.js: `USE_PASSWORDLESS_AUTH`
- Update index.html to route based on flag

### Phase 3: Full Migration (After Testing)
- Replace index.html redirect to new flow
- Keep old flows as backup URLs
- Monitor analytics for issues

### Phase 4: Cleanup (After 2 weeks)
- Remove old password-based login files
- Update all documentation

## Testing Checklist

- [ ] Email validation (valid/invalid formats)
- [ ] SSO domain detection (known domains, unknown domains)
- [ ] Magic link generation
- [ ] Magic link expiry (after 15 min)
- [ ] Magic link one-time use
- [ ] Resend with rate limiting
- [ ] New user account creation
- [ ] Existing user login
- [ ] Session persistence
- [ ] Mobile responsiveness
- [ ] Accessibility (keyboard nav, screen readers)
- [ ] Error handling (network failures, invalid tokens)

## UI/UX Principles

1. **Progressive Disclosure:** Only show relevant options at each step
2. **Clear Feedback:** Loading states, success/error messages
3. **Escape Hatches:** Always allow user to go back
4. **Familiar Patterns:** Match Vanta/Linear UX expectations
5. **Trust Signals:** Explain why we're asking for email, what magic link does

## Implementation Order

1. ✅ Create branch: `feature/passwordless-auth`
2. ✅ Write implementation plan (this doc)
3. [ ] Create SSO configuration system
4. [ ] Build magic link token utilities
5. [ ] Implement Step 1: Email input
6. [ ] Implement Step 2: Method selection
7. [ ] Implement Magic link sent screen
8. [ ] Implement Verification handler
9. [ ] Integrate with existing session system
10. [ ] Test full flow (SSO + Magic Link)
11. [ ] Update index.html routing
12. [ ] Deploy to Vercel for review
13. [ ] Merge to main after approval

## Notes
- Simulate backend with localStorage for demo purposes
- Production will need real backend for token generation/storage
- Consider using FusionAuth passwordless API or Supabase Magic Links
- Maintain existing password flow as legacy fallback
