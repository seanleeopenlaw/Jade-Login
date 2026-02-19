# JADE Login Flow - Coding Guidelines

## Semantic HTML Rules

### Principles

1. **Tags should reflect meaning** - Use `<copyright>` instead of `div.copyright`
2. **Eliminate class name redundancy** - Use parent-child CSS selectors (`.ui2-footer copyright`)
3. **Remove unnecessary wrappers** - No meaningless `<div>` nesting

### Custom Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `<copyright>` | Copyright notice | `<copyright>© 2002-2026...</copyright>` |
| `<error-alert>` | Error messages | `<error-alert role="alert">...</error-alert>` |
| `<search-result>` | Search result item | `<search-result>...</search-result>` |
| `<page-header>` | Page header area | `<page-header>...</page-header>` |
| `<form-card>` | Form card container | `<form-card>...</form-card>` |
| `<status-view>` | Status display screen | `<status-view state="loading">...</status-view>` |

### CSS Selector Rules

```css
/* Don't do this */
.auth-footer-content { }
.auth-footer-logo { }
.auth-footer-copyright { }

/* Do this instead */
.ui2-footer { }
.ui2-footer svg { }
.ui2-footer nav { }
.ui2-footer copyright { }
```

### Standard HTML5 Semantic Tags

| Context | Tag to Use |
|---------|-----------|
| Page header | `<header>` |
| Navigation | `<nav aria-label="...">` |
| Main content | `<main>` |
| Sidebar | `<aside>` |
| Independent content | `<article>` |
| Logical section | `<section>` |
| Footer | `<footer>` |

### Component Structure Examples

#### Footer
```html
<footer class="ui2-footer">
  <svg>...</svg>
  <nav aria-label="Footer links">
    <a href="...">Contact</a>
    <a href="...">Privacy Policy</a>
  </nav>
  <copyright>© 2002 - 2026 BarNetwork Pty Limited</copyright>
</footer>
```

#### Error Alert
```html
<error-alert role="alert">
  <svg>...</svg>
  <span>Error message here</span>
</error-alert>
```

#### Search Result
```html
<search-result>
  <h3><a href="#">Case Title</a></h3>
  <p class="result-meta">[2025] HCA 90</p>
  <p class="result-excerpt">Description...</p>
</search-result>
```

### Accessibility Requirements

- Always include `aria-label` on `<nav>` elements
- Use `role="alert"` for error messages
- Maintain keyboard navigation support
- Use semantic heading hierarchy (`h1` > `h2` > `h3`)
