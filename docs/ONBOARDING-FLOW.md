# JADE Onboarding Flow - Complete Documentation

## Overview

The JADE onboarding process is a 2-step flow that collects user preferences and profile information in a lightweight, optional manner.

**Design Principles:**
- ✅ Quick and lightweight (under 2 minutes)
- ✅ Minimal required fields (only First Name in Step 2)
- ✅ Skip options available at every step
- ✅ Clean, professional legal aesthetic
- ✅ Mobile-first responsive design
- ✅ Fully accessible (WCAG 2.1 AA compliant)

## Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Step 1: Alert Preferences                              │
│  account-setup-step1.html                               │
│                                                          │
│  • Select courts to follow (optional)                   │
│  • Select topics to follow (optional)                   │
│  • Preset shortcuts (HCA, Appellate, Supreme)           │
│  • Searchable multi-select with categories              │
│                                                          │
│  CTA: "Next →" or "Skip for now"                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Step 2: Profile Setup                                  │
│  account-setup-step2.html                               │
│                                                          │
│  • First Name (required)                                │
│  • Last Name (optional)                                 │
│  • Mobile Number (optional)                             │
│  • User Type dropdown (optional)                        │
│  • Purpose textarea (optional)                          │
│                                                          │
│  CTA: "Continue to JADE" or "Skip for now"              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Plan Selection / Promotion Page                        │
│  2-plan-selection.html                                   │
│                                                          │
│  User selects subscription plan                         │
└─────────────────────────────────────────────────────────┘
```

## Step 1: Alert Preferences

### File
`account-setup-step1.html`

### Purpose
Allow users to customize which courts and legal topics they want to follow for alerts and personalized content.

### Components Used
- **Stepper** - Shows progress (Step 1 of 2)
- **Preset Checkboxes** - Quick selection shortcuts
  - High Court of Australia
  - Appellate Courts
  - Supreme Courts
- **SearchableSelect** (2 instances)
  - Courts (14 options across 6 categories)
  - Topics (92 options across 10 categories)
- **Divider** - "Or customise your own alerts"
- **Section Container** - Card-style containers with icons
- **Buttons** - Primary "Next →" and Secondary "Skip for now"

### User Interactions
1. User can select preset checkboxes for quick setup
2. User can search and select individual courts/topics
3. Selected items appear as tags below each selector
4. User can remove selections by clicking × on tags
5. "Next" button always enabled (selections optional)
6. "Skip" bypasses to Step 2 with empty selections

### Data Collected
```javascript
{
  alertPreferences: {
    courts: ['HCA', 'NSWCA', ...],  // Array of court codes
    topics: ['criminal', 'torts', ...],  // Array of topic values
    skipped: false  // true if user clicked "Skip"
  }
}
```

### Validation
- **None required** - All fields are optional
- Empty selections allowed
- Data saved to sessionStorage on continue/skip

### Navigation
- **Next →**: Saves preferences → `account-setup-step2.html`
- **Skip for now**: Saves empty array → `account-setup-step2.html`

---

## Step 2: Profile Setup

### File
`account-setup-step2.html`

### Purpose
Collect minimal user information to personalize the JADE experience and enable account recovery.

### Components Used
- **Stepper** - Shows progress (Step 2 of 2, Step 1 completed)
- **Form Grid** - Responsive 1-column (mobile) / 2-column (desktop)
- **Text Inputs** - First Name, Last Name
- **Tel Input** - Mobile Number with hint
- **Select Dropdown** - User Type (8 options)
- **Textarea** - Purpose for using JADE
- **Buttons** - Primary "Continue to JADE" and Secondary "Skip for now"

### User Interactions
1. User enters their first name (required)
2. "Continue" button disabled until first name has value
3. User can optionally fill other fields
4. Mobile number field shows hint: "For account recovery only"
5. Purpose field shows hint: "Help us understand how we can serve you better"
6. Real-time validation on first name field
7. Form can be submitted with Enter key (except in textarea)

### Data Collected
```javascript
{
  firstName: "John",              // Required - trimmed
  lastName: "Smith",              // Optional - trimmed
  mobileNumber: "+61 4XX XXX XXX", // Optional - trimmed
  userType: "barrister",          // Optional - dropdown value
  purpose: "researching cases...", // Optional - trimmed, max 500 chars
  skipped: false,                  // true if user clicked "Skip"
  completedAt: "2025-11-09T12:00:00.000Z"
}
```

### Form Fields

| Field | Type | Required | Validation | Autocomplete |
|-------|------|----------|------------|--------------|
| First Name | text | ✅ Yes | Non-empty after trim | given-name |
| Last Name | text | ❌ No | None | family-name |
| Mobile Number | tel | ❌ No | None | tel |
| User Type | select | ❌ No | None | - |
| Purpose | textarea | ❌ No | Max 500 chars | - |

### User Type Options
- Student
- Barrister
- Solicitor
- Judge
- Academic / Researcher
- Corporate Counsel
- Government Legal
- Other

### Validation Rules
1. **First Name**: Required, trimmed, non-empty
2. **All other fields**: Optional
3. **Character limits**: Purpose max 500 characters
4. **Sanitization**: All inputs trimmed of whitespace
5. **Button state**: Disabled until first name is valid

### UI States

#### Initial State
- All fields empty
- "Continue to JADE" button disabled (gray)
- No error messages shown

#### After User Types in First Name
- "Continue to JADE" button enabled (green)
- Error cleared if previously shown

#### On Submit Click (Invalid)
- First name field shows red border
- Error message appears: "Please enter your first name"
- Focus moves to first name field

#### On Submit (Valid)
- Button shows loading spinner: "Saving..."
- Button disabled to prevent double submission
- Data saved to localStorage
- Redirect to dashboard after 1 second

### Navigation
- **Continue to JADE**: Validates → Saves profile → `2-plan-selection.html`
- **Skip for now**: Saves minimal data (firstName: "User", skipped: true) → `2-plan-selection.html`

### Mobile Optimizations
- Full-width inputs on mobile
- Sticky bottom action buttons (gradient background)
- Larger touch targets (44px min height)
- Font sizes: 16px to prevent iOS zoom
- Vertical button layout on small screens

---

## Design System Integration

### Colors (Design Tokens)
```css
--primary: #089444           /* JADE green - CTAs, focus states */
--background: #f7f9fc        /* Page background */
--card: #ffffff              /* Form containers */
--foreground: #374151        /* Primary text */
--muted-foreground: #6b7280  /* Secondary text, hints */
--border: #e5e7eb            /* Input borders */
--error: #dc2626             /* Validation errors */
--ring-opacity: rgba(8, 148, 68, 0.1)  /* Focus ring */
```

### Typography
```css
--font-sans: 'Alegreya Sans'  /* Body text, UI */
--font-serif: 'Lora'           /* Headings */
--font-mono: 'IBM Plex Mono'   /* Code, data */
```

### Spacing Scale
- Form padding: 32px (desktop), 16px (mobile)
- Input padding: 12px horizontal, 12px vertical
- Gap between fields: 24px
- Section spacing: 32px

### Border Radius
- Inputs: 8px (`var(--radius)`)
- Containers: 12px (`var(--radius-lg)`)
- Buttons: 8px

### Shadows
- Inputs: `var(--shadow-xs)` on default
- Focus: `0 0 0 3px var(--ring-opacity)`
- Cards: `var(--shadow-sm)`

---

## Accessibility Features

### Keyboard Navigation
- Tab order follows logical flow
- Focus visible on all interactive elements
- Enter submits form (except in textarea)
- Escape can close dropdowns (Step 1)

### Screen Readers
- All inputs have proper labels
- ARIA attributes:
  - `aria-label` on inputs
  - `aria-required="true"` on required fields
  - `aria-describedby` for hints
  - `aria-live="polite"` for dynamic content
  - `role="alert"` for error messages

### Color Contrast
- Text: 4.5:1 minimum (WCAG AA)
- Interactive elements: 3:1 minimum
- Focus indicators clearly visible

### Mobile Accessibility
- Touch targets minimum 44×44px
- Font size minimum 16px (prevents zoom)
- Pinch-to-zoom enabled
- Orientation support (portrait/landscape)

---

## Responsive Breakpoints

### Mobile (< 640px)
- Single column layout
- Full-width inputs
- Stacked buttons (vertical)
- Sticky bottom CTAs
- Reduced padding (16px)

### Tablet (640px - 1024px)
- 2-column form grid (Step 2)
- Side-by-side buttons
- Increased padding (24px)

### Desktop (> 1024px)
- Centered container (600px max-width)
- 2-column form grid
- Comfortable spacing (32px padding)
- Optimal line length for readability

---

## Data Persistence

### Step 1 Data
```javascript
// Saved to sessionStorage
sessionStorage.setItem('jade_onboarding_step1', JSON.stringify({
  courts: ['HCA', 'NSWCA'],
  topics: ['criminal', 'torts'],
  skipped: false
}));
```

### Step 2 Data
```javascript
// Saved to localStorage (persists across sessions)
localStorage.setItem('jade_profile', JSON.stringify({
  firstName: "John",
  lastName: "Smith",
  mobileNumber: "+61 4XX XXX XXX",
  userType: "barrister",
  purpose: "researching cases...",
  skipped: false,
  completedAt: "2025-11-09T12:00:00.000Z"
}));
```

### Why Different Storage?
- **sessionStorage (Step 1)**: Alert preferences can be temporary for the session
- **localStorage (Step 2)**: Profile data persists for personalization

---

## Error Handling

### Client-Side Validation
- First name required (Step 2)
- Real-time validation on blur
- Immediate feedback on input
- Clear error messages

### Error Messages
```javascript
// First name validation
"Please enter your first name"

// Network error (simulated)
"Something went wrong. Please try again."

// Max selections (if implemented)
"Maximum 10 options allowed"
```

### Error Recovery
- Clear errors on user input
- Focus management to error field
- Retry mechanism for failed saves
- Graceful degradation

---

## Skip Flow Logic

### Step 1 Skip
```javascript
// User clicks "Skip for now"
setSession('alertPreferences', {
  courts: [],
  topics: [],
  skipped: true
});
// Navigate to Step 2
```

### Step 2 Skip
```javascript
// User clicks "Skip for now"
localStorage.setItem('jade_profile', JSON.stringify({
  firstName: 'User',  // Default name
  skipped: true,
  completedAt: new Date().toISOString()
}));
// Navigate to Dashboard
```

### Benefits
- No dead ends - users can always proceed
- Lower friction - nothing is mandatory
- Data still collected for analytics
- Users can complete later in Settings

---

## Testing Checklist

### Functional Testing
- [ ] Step 1 → Step 2 navigation works
- [ ] Step 2 → Dashboard navigation works
- [ ] Skip buttons work on both steps
- [ ] Data persists across steps
- [ ] Preset checkboxes select correct courts
- [ ] Searchable select filters correctly
- [ ] Tags display and remove properly
- [ ] First name validation works
- [ ] Submit button enables/disables correctly
- [ ] Loading state shows on submit
- [ ] Error messages display correctly

### Responsive Testing
- [ ] Mobile (375px - iPhone SE)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1920px - Full HD)
- [ ] Touch targets adequate on mobile
- [ ] Sticky buttons work on mobile
- [ ] No horizontal scroll

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announces properly
- [ ] Focus visible on all elements
- [ ] Color contrast passes WCAG AA
- [ ] Form labels associated correctly
- [ ] Error messages announced

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS 14+)
- [ ] Chrome Mobile (Android)

---

## Future Enhancements

### Potential Features
1. **Progress Save**: Auto-save draft on field changes
2. **Back Button**: Allow navigation back to Step 1 from Step 2
3. **Bulk Actions**: "Select all courts in category"
4. **Recent Searches**: Remember recent court/topic searches
5. **Smart Suggestions**: Recommend topics based on court selection
6. **Social Auth**: Pre-fill from Google/LinkedIn profile
7. **Profile Photos**: Upload avatar in Step 2
8. **Tooltips**: Explain what each user type means
9. **Character Counter**: Show remaining chars in Purpose field
10. **Exit Survey**: "Why are you skipping?" optional feedback

### Analytics Events
```javascript
// Track onboarding completion
analytics.track('Onboarding Step 1 Completed', {
  courtsSelected: 5,
  topicsSelected: 12,
  presetsUsed: ['hca', 'appellate'],
  skipped: false
});

analytics.track('Onboarding Step 2 Completed', {
  fieldsCompleted: ['firstName', 'lastName', 'userType'],
  userType: 'barrister',
  skipped: false
});
```

---

## File Structure

```
jade-login-flow/
├── account-setup-step1.html      # Step 1: Alert Preferences
├── account-setup-step2.html      # Step 2: Profile Setup
├── 5-main-app-free.html          # Dashboard (destination)
├── css/
│   ├── jade.css                  # Main design system
│   ├── design-tokens.css         # Color/spacing tokens
│   └── components/
│       ├── stepper.css           # Progress stepper
│       ├── buttons.css           # Button styles
│       ├── forms.css             # Form inputs
│       ├── searchable-select.css # Multi-select dropdown
│       ├── preset-checkbox.css   # Large card checkboxes
│       ├── divider.css           # Horizontal divider
│       └── section-container.css # Card containers
├── js/
│   ├── searchable-select.js      # SearchableSelect component
│   ├── searchable-select-template.js  # Template helper
│   └── utils.js                  # Utility functions
└── docs/
    ├── ONBOARDING-FLOW.md        # This file
    └── components/
        └── SEARCHABLE-SELECT.md  # Component documentation
```

---

## API Integration (Future)

### Step 1 Submit
```javascript
POST /api/onboarding/alert-preferences
{
  "courts": ["HCA", "NSWCA"],
  "topics": ["criminal", "torts"],
  "userId": "123456"
}
```

### Step 2 Submit
```javascript
POST /api/onboarding/profile
{
  "firstName": "John",
  "lastName": "Smith",
  "mobileNumber": "+61 4XX XXX XXX",
  "userType": "barrister",
  "purpose": "researching cases",
  "userId": "123456"
}
```

### Response Format
```javascript
{
  "success": true,
  "data": {
    "userId": "123456",
    "onboardingCompleted": true,
    "redirectUrl": "/dashboard"
  }
}
```

---

## Microcopy Guidelines

### Tone
- Friendly but professional
- Concise and scannable
- Action-oriented
- No marketing jargon

### Examples
✅ **Good**: "Tell us about yourself"
❌ **Bad**: "We're excited to learn more about you!"

✅ **Good**: "For account recovery only"
❌ **Bad**: "We promise we'll never spam you!"

✅ **Good**: "You can update this any time in Settings."
❌ **Bad**: "Don't worry, you can always change this later if you want to!"

### Button Labels
- **Primary CTA**: Action verb + context
  - "Next →" (not "Continue" or "Submit")
  - "Continue to JADE" (not "Finish" or "Done")
- **Secondary CTA**: Permission-granting
  - "Skip for now" (not "Skip" or "Maybe later")

---

## Summary

The JADE onboarding flow successfully balances data collection with user experience:

✅ **Quick**: 2 steps, under 2 minutes
✅ **Lightweight**: Only 1 required field (First Name)
✅ **Flexible**: Skip options at every step
✅ **Professional**: Clean legal aesthetic with JADE branding
✅ **Accessible**: WCAG 2.1 AA compliant
✅ **Responsive**: Mobile-first, works on all devices
✅ **Reusable**: Built with JADE Design System components

Users can complete the onboarding in seconds or spend time customizing their experience - the choice is theirs.
