# JADE Onboarding - Quick Start Guide

## Testing the Complete Flow

### 1. Open Step 1
```bash
open account-setup-step1.html
```

**What to test:**
- Click preset checkboxes → Courts auto-select
- Search for courts/topics
- Add/remove selections via tags
- Click "Next →" → Should go to Step 2
- Click "Skip for now" → Should go to Step 2

### 2. Step 2 Auto-Opens
```
account-setup-step2.html
```

**What to test:**
- "Continue to JADE" button starts disabled
- Type first name → Button enables
- Try to submit without first name → Error shows
- Fill form → Click "Continue" → Goes to Dashboard
- Click "Skip for now" → Goes to Dashboard

### 3. Check Data Persistence

**Open Browser Console:**
```javascript
// Check Step 1 data (sessionStorage)
JSON.parse(sessionStorage.getItem('jade_onboarding_step1'))

// Check Step 2 data (localStorage)
JSON.parse(localStorage.getItem('jade_profile'))
```

---

## Component Usage Examples

### Using SearchableSelect

```javascript
// Initialize with categorized options
const select = new SearchableSelect('mySelect', {
  categories: [
    {
      name: 'Category 1',
      items: [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' }
      ]
    }
  ]
}, {
  maxSelections: 10,
  onChange: (selected) => console.log(selected)
});
```

### Using Template Helper

```javascript
// Render template and initialize in one call
const select = await SearchableSelectTemplate.renderAndInit(
  'container',
  'mySelect',
  options,
  { triggerText: 'Select...' },
  { onChange: handleChange }
);
```

---

## Customization

### Change Primary Color

Edit `css/design-tokens.css`:
```css
:root {
  --primary: #00965E;  /* Your brand color */
}
```

### Change Form Fields (Step 2)

Edit `account-setup-step2.html`:
1. Add new field to `.form-grid`
2. Add validation in JavaScript
3. Include in `formData` object on submit

### Add New User Type Option

In `account-setup-step2.html`:
```html
<select id="user-type">
  <option value="paralegal">Paralegal</option>  <!-- Add here -->
</select>
```

---

## Troubleshooting

### Step 1 → Step 2 navigation doesn't work
- Check browser console for JavaScript errors
- Verify `account-setup-step2.html` exists in same directory
- Check that sessionStorage is enabled

### Searchable dropdown doesn't open
- Ensure `searchable-select.css` is loaded
- Check that `searchable-select.js` is loaded
- Verify all required DOM elements have correct IDs

### Form validation not working
- Check that input ID matches error element ID
- Verify `required` attribute is present
- Look for JavaScript errors in console

### Data not persisting
- Check if browser blocks localStorage/sessionStorage
- Verify JSON.stringify doesn't fail
- Test in incognito mode (no extensions)

---

## File Checklist

Make sure these files exist:
```
✅ account-setup-step1.html
✅ account-setup-step2.html
✅ 5-main-app-free.html (dashboard)
✅ css/jade.css
✅ css/design-tokens.css
✅ css/components/searchable-select.css
✅ js/searchable-select.js
✅ js/utils.js (optional)
```

---

## Quick Edits

### Change Step 1 Title
```html
<!-- account-setup-step1.html -->
<h1>Your Custom Title</h1>
```

### Change Step 2 Required Fields
```javascript
// account-setup-step2.html
function validateForm() {
  // Add more required fields here
  return firstNameInput.value.trim() &&
         lastNameInput.value.trim();  // Now both required
}
```

### Add Step 3
1. Create `account-setup-step3.html`
2. Update stepper in all files
3. Change Step 2 navigation:
   ```javascript
   window.location.href = 'account-setup-step3.html';
   ```

---

## Performance Tips

### Lazy Load Step 2
Only load Step 2 resources when user reaches it:
```html
<!-- Step 1 -->
<link rel="prefetch" href="account-setup-step2.html">
```

### Reduce Bundle Size
Import only components you need:
```html
<!-- Instead of jade.css (full bundle) -->
<link rel="stylesheet" href="css/design-tokens.css">
<link rel="stylesheet" href="css/components/buttons.css">
<link rel="stylesheet" href="css/components/forms.css">
```

---

## Next Steps

After completing the onboarding flow:
1. Set up real API endpoints
2. Add analytics tracking
3. Implement error logging
4. Add loading states
5. Create Settings page for profile editing
6. Build email verification flow

---

## Support

- 📖 Full Documentation: `docs/ONBOARDING-FLOW.md`
- 🎨 Component Docs: `docs/components/SEARCHABLE-SELECT.md`
- 🐛 Report Issues: Create GitHub issue
- 💬 Questions: Contact dev team
