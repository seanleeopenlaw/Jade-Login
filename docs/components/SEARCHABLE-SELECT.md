# SearchableSelect Component

A flexible, accessible searchable multi-select component with tag display, categorized options, and comprehensive configuration options.

## Features

- ✅ Searchable dropdown with real-time filtering
- ✅ Multi-select with visual tag display
- ✅ Categorized options support
- ✅ Smart dropdown positioning (auto-flip when near viewport edge)
- ✅ Fully keyboard accessible
- ✅ Design token integration for theming
- ✅ Event callbacks for all interactions
- ✅ Validation support (min/max selections, required, custom validators)
- ✅ Template helper to reduce HTML boilerplate
- ✅ Mobile-responsive design
- ✅ shadcn/ui inspired styling

## Quick Start

### Method 1: Using Template Helper (Recommended)

```javascript
// 1. Render the component
SearchableSelectTemplate.render('container', 'mySelect', {
  triggerText: 'Select topics...',
  searchPlaceholder: 'Search topics...'
});

// 2. Define your options
const options = {
  categories: [
    {
      name: 'Frontend',
      items: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' }
      ]
    }
  ]
};

// 3. Initialize the component
const select = new SearchableSelect('mySelect', options, {
  maxSelections: 5,
  onChange: (selected) => console.log('Selected:', selected)
});
```

### Method 2: Manual HTML

```html
<div class="searchable-select" id="mySelect-searchable">
  <button type="button" class="searchable-select-trigger" id="mySelect-trigger">
    <span class="searchable-select-trigger-text">Select options...</span>
    <svg class="searchable-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>

  <span class="searchable-select-counter" id="mySelect-counter" style="display: none;">0</span>

  <div class="searchable-select-dropdown" id="mySelect-dropdown">
    <div class="searchable-select-search">
      <svg class="searchable-select-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
      <input type="text" class="searchable-select-input" id="mySelect-search-input" placeholder="Search...">
    </div>
    <div class="searchable-select-options" id="mySelect-options"></div>
  </div>

  <div class="searchable-select-tags" id="mySelect-tags"></div>
</div>

<script>
const select = new SearchableSelect('mySelect', options);
</script>
```

## Configuration Options

```javascript
new SearchableSelect('mySelect', options, {
  // Text customization
  triggerPlaceholder: 'Select options...',
  searchPlaceholder: 'Search...',
  noResultsMessage: 'No results found',

  // Selection behavior
  maxSelections: null,        // null = unlimited
  minSelections: 0,
  allowClearAll: true,
  closeOnSelect: false,       // Keep dropdown open for multi-select

  // Search behavior
  caseSensitive: false,
  searchFields: ['label'],    // Which fields to search

  // UI customization
  showCounter: false,         // Show selection count badge
  showTags: true,             // Show selected items as tags
  dropdownMaxHeight: '400px',

  // Validation
  required: false,
  validator: null,            // Custom validation function

  // Event callbacks
  onChange: (selected, validation) => {},
  onSearch: (searchTerm, selected) => {},
  onOpen: (selected) => {},
  onClose: (selected) => {},
  onSelect: (value, option, selected) => {},
  onDeselect: (value, option, selected) => {},
  onValidate: (result) => {},

  // Initial state
  initialValues: [],
  disabled: false
});
```

## Options Data Format

### Flat Array (Simple)

```javascript
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' }
];
```

### Categorized (Recommended)

```javascript
const options = {
  categories: [
    {
      name: 'Frontend Frameworks',
      items: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' }
      ]
    },
    {
      name: 'Backend Frameworks',
      items: [
        { value: 'express', label: 'Express' },
        { value: 'django', label: 'Django' }
      ]
    }
  ]
};
```

## Public API Methods

### getSelected()
Get currently selected values.
```javascript
const selected = select.getSelected();
// Returns: ['react', 'vue']
```

### getSelectedOptions()
Get full option objects for selected values.
```javascript
const options = select.getSelectedOptions();
// Returns: [{ value: 'react', label: 'React' }, ...]
```

### setSelected(values)
Programmatically set selected values.
```javascript
select.setSelected(['react', 'vue']);
```

### clear()
Clear all selections.
```javascript
select.clear();
```

### disable()
Disable the component.
```javascript
select.disable();
```

### enable()
Enable the component.
```javascript
select.enable();
```

### validate()
Validate current selection.
```javascript
const result = select.validate();
// Returns: { valid: true, errors: [] }
```

### updateConfig(newConfig)
Update configuration options.
```javascript
select.updateConfig({ maxSelections: 10 });
```

### destroy()
Clean up event listeners and DOM.
```javascript
select.destroy();
```

## Event Callbacks

### onChange
Triggered when selection changes.
```javascript
onChange: (selected, validation) => {
  console.log('Selected values:', selected);
  console.log('Is valid:', validation.valid);
  console.log('Errors:', validation.errors);
}
```

### onSelect / onDeselect
Triggered when individual option is selected/deselected.
```javascript
onSelect: (value, option, allSelected) => {
  console.log('Selected:', value, option);
},
onDeselect: (value, option, allSelected) => {
  console.log('Deselected:', value);
}
```

### onSearch
Triggered when search input changes.
```javascript
onSearch: (searchTerm, selected) => {
  console.log('Searching for:', searchTerm);
}
```

### onOpen / onClose
Triggered when dropdown opens/closes.
```javascript
onOpen: (selected) => {
  console.log('Dropdown opened');
},
onClose: (selected) => {
  console.log('Dropdown closed');
}
```

## Validation

### Built-in Validators

```javascript
new SearchableSelect('mySelect', options, {
  required: true,          // At least one must be selected
  minSelections: 2,        // Minimum 2 selections
  maxSelections: 5         // Maximum 5 selections
});
```

### Custom Validator

```javascript
new SearchableSelect('mySelect', options, {
  validator: (selected, selectedOptions) => {
    // Return error message string if invalid, null/undefined if valid
    if (selected.includes('react') && selected.includes('vue')) {
      return 'Cannot select both React and Vue';
    }
    return null;
  },
  onValidate: (result) => {
    if (!result.valid) {
      console.error('Validation errors:', result.errors);
    }
  }
});
```

## Template Helper

### Basic Usage

```javascript
// Create HTML template
const html = SearchableSelectTemplate.create('mySelect', {
  triggerText: 'Select frameworks...',
  searchPlaceholder: 'Search frameworks...'
});
document.getElementById('container').innerHTML = html;
```

### Render Directly

```javascript
// Render into container
SearchableSelectTemplate.render('container', 'mySelect', {
  triggerText: 'Select frameworks...',
  showCounter: true
});
```

### Render and Initialize

```javascript
// Render template AND initialize component in one call
const select = await SearchableSelectTemplate.renderAndInit(
  'container',
  'mySelect',
  options,
  {
    // Template config
    triggerText: 'Select frameworks...',
    showCounter: true
  },
  {
    // Component config
    maxSelections: 5,
    onChange: (selected) => console.log(selected)
  }
);
```

### Create Multiple

```javascript
const instances = SearchableSelectTemplate.createMultiple([
  {
    container: 'container1',
    id: 'courts',
    options: courtOptions,
    templateConfig: { triggerText: 'Select courts...' },
    componentConfig: { maxSelections: 3 }
  },
  {
    container: 'container2',
    id: 'topics',
    options: topicOptions,
    templateConfig: { triggerText: 'Select topics...' }
  }
]);
```

## Styling Customization

### Using Design Tokens

All colors, spacing, and typography use JADE design tokens:

```css
/* Override in your CSS */
:root {
  --primary: #089444;        /* Selected state color */
  --muted: #f3f4f6;          /* Hover state background */
  --border: #e5e7eb;         /* Border color */
  --foreground: #374151;     /* Text color */
  --muted-foreground: #6b7280; /* Muted text */
}
```

### Custom Classes

```javascript
SearchableSelectTemplate.create('mySelect', {
  additionalClasses: 'my-custom-class'
});
```

### Component-specific Overrides

```css
/* Target specific instance */
#mySelect-searchable .searchable-select-trigger {
  background-color: #f0f0f0;
}

/* Override globally */
.searchable-select-option:hover {
  background-color: var(--primary-light);
}
```

## Accessibility

The component follows WAI-ARIA best practices:

- ✅ Keyboard navigation (Enter, Escape, Tab)
- ✅ ARIA attributes (role, aria-label, aria-expanded, etc.)
- ✅ Screen reader announcements via aria-live
- ✅ Focus management
- ✅ Semantic HTML

### Keyboard Shortcuts

- **Enter/Space**: Toggle dropdown
- **Escape**: Close dropdown
- **Tab**: Navigate between elements
- **Type to search**: Filter options in real-time

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Examples

### Example 1: Simple Multi-Select

```javascript
const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' }
];

const select = new SearchableSelect('frameworks', frameworks, {
  onChange: (selected) => {
    console.log('Selected frameworks:', selected);
  }
});
```

### Example 2: Categorized with Validation

```javascript
const select = new SearchableSelect('topics', topicsData, {
  minSelections: 2,
  maxSelections: 10,
  required: true,
  onChange: (selected, validation) => {
    if (validation.valid) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
      showErrors(validation.errors);
    }
  }
});
```

### Example 3: Form Integration

```javascript
const form = document.getElementById('myForm');
const select = new SearchableSelect('preferences', options);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const validation = select.validate();
  if (!validation.valid) {
    alert(validation.errors.join('\n'));
    return;
  }

  const formData = {
    preferences: select.getSelected(),
    // ... other fields
  };

  // Submit form data
});
```

### Example 4: Dynamic Options

```javascript
const select = new SearchableSelect('cities', [], {
  onSearch: async (searchTerm) => {
    if (searchTerm.length < 2) return;

    // Fetch options from API
    const results = await fetch(`/api/cities?q=${searchTerm}`);
    const cities = await results.json();

    // Update options
    select.options = cities;
    select.renderOptions(searchTerm);
  }
});
```

## Migration Guide

### From Manual HTML to Template Helper

**Before:**
```html
<!-- 50+ lines of HTML boilerplate -->
<div class="searchable-select" id="mySelect-searchable">
  <!-- ... -->
</div>
```

**After:**
```javascript
// 3 lines of code
SearchableSelectTemplate.render('container', 'mySelect');
const select = new SearchableSelect('mySelect', options);
```

### Adding Configuration

**Before:**
```javascript
const select = new SearchableSelect('mySelect', options);
// No configuration possible
```

**After:**
```javascript
const select = new SearchableSelect('mySelect', options, {
  maxSelections: 5,
  required: true,
  onChange: (selected) => handleChange(selected)
});
```

## Troubleshooting

### Dropdown not appearing
- Ensure all required DOM elements exist with correct IDs
- Check z-index conflicts with other components
- Verify CSS files are loaded in correct order

### Search not filtering
- Check `searchFields` config matches your option object keys
- Verify options are in correct format (array or categorized object)

### Styling issues
- Ensure `design-tokens.css` is loaded before component CSS
- Check for CSS specificity conflicts
- Verify component CSS is loaded: `jade.css` or `searchable-select.css`

### Events not firing
- Ensure callback functions are defined before passing to config
- Check browser console for JavaScript errors
- Verify component is properly initialized

## Files

```
css/
  components/
    searchable-select.css       # Component styles
  design-tokens.css             # Design tokens (required)
  jade.css                      # Main entry (includes all components)

js/
  searchable-select.js          # Core component class
  searchable-select-template.js # Template helper (optional)
```

## Dependencies

- **Required**: `design-tokens.css`
- **Optional**: Lucide icons (SVG icons used in template helper)

## License

Part of the JADE Design System.
