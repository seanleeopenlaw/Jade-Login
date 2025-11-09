/**
 * JADE Searchable Select Template Helper
 * Reduces HTML boilerplate by auto-generating component structure
 *
 * Usage:
 * const template = SearchableSelectTemplate.create('mySelect', {
 *   triggerText: 'Select options...',
 *   searchPlaceholder: 'Search...'
 * });
 * document.getElementById('container').innerHTML = template;
 *
 * Or use the render method to auto-inject:
 * SearchableSelectTemplate.render('container', 'mySelect', config);
 */

class SearchableSelectTemplate {
  /**
   * Generate searchable select HTML template
   * @param {string} id - Unique identifier for this instance
   * @param {Object} config - Template configuration
   * @returns {string} HTML template string
   */
  static create(id, config = {}) {
    const defaults = {
      // Text content
      triggerText: 'Select options...',
      searchPlaceholder: 'Search...',

      // Icons (Lucide SVG paths)
      chevronIcon: this.icons.chevronDown,
      searchIcon: this.icons.search,

      // CSS classes (for customization)
      containerClass: 'searchable-select',
      additionalClasses: '',

      // Show/hide elements
      showCounter: false,
      showTags: true,

      // Accessibility
      ariaLabel: 'Searchable select',
      ariaLabelledBy: null,
    };

    const opts = { ...defaults, ...config };

    return `
      <div class="${opts.containerClass} ${opts.additionalClasses}" id="${id}-searchable" ${opts.ariaLabel ? `aria-label="${opts.ariaLabel}"` : ''} ${opts.ariaLabelledBy ? `aria-labelledby="${opts.ariaLabelledBy}"` : ''}>
        <!-- Trigger Button -->
        <button type="button" class="searchable-select-trigger" id="${id}-trigger" aria-haspopup="listbox" aria-expanded="false">
          <span class="searchable-select-trigger-text">${opts.triggerText}</span>
          ${opts.chevronIcon}
        </button>

        <!-- Counter Badge -->
        <span class="searchable-select-counter" id="${id}-counter" style="display: ${opts.showCounter ? 'block' : 'none'};" aria-live="polite">0</span>

        <!-- Dropdown -->
        <div class="searchable-select-dropdown" id="${id}-dropdown" role="listbox" aria-multiselectable="true">
          <!-- Search Input -->
          <div class="searchable-select-search">
            ${opts.searchIcon}
            <input
              type="text"
              class="searchable-select-input"
              id="${id}-search-input"
              placeholder="${opts.searchPlaceholder}"
              autocomplete="off"
              aria-label="Search options"
              role="searchbox"
            >
          </div>

          <!-- Options Container -->
          <div class="searchable-select-options" id="${id}-options" role="group"></div>
        </div>

        <!-- Selected Tags -->
        ${opts.showTags ? `<div class="searchable-select-tags" id="${id}-tags" aria-live="polite" aria-label="Selected options"></div>` : ''}
      </div>
    `.trim();
  }

  /**
   * Render template directly into a container element
   * @param {string|HTMLElement} container - Container element or ID
   * @param {string} id - Unique identifier for this instance
   * @param {Object} config - Template configuration
   * @returns {HTMLElement} The rendered container element
   */
  static render(container, id, config = {}) {
    const element = typeof container === 'string'
      ? document.getElementById(container)
      : container;

    if (!element) {
      throw new Error(`Container element not found: ${container}`);
    }

    element.innerHTML = this.create(id, config);
    return element;
  }

  /**
   * Create and initialize a SearchableSelect in one call
   * @param {string|HTMLElement} container - Container element or ID
   * @param {string} id - Unique identifier for this instance
   * @param {Array|Object} options - Options data
   * @param {Object} templateConfig - Template configuration
   * @param {Object} componentConfig - SearchableSelect configuration
   * @returns {SearchableSelect} Initialized SearchableSelect instance
   */
  static renderAndInit(container, id, options, templateConfig = {}, componentConfig = {}) {
    // Render template
    this.render(container, id, templateConfig);

    // Wait for DOM to be ready, then initialize
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const instance = new SearchableSelect(id, options, componentConfig);
        resolve(instance);
      });
    });
  }

  /**
   * Lucide icon SVG templates
   * Source: https://lucide.dev
   */
  static icons = {
    chevronDown: `
      <svg class="searchable-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `.trim(),

    search: `
      <svg class="searchable-select-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    `.trim(),

    check: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `.trim(),

    x: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `.trim(),
  };

  /**
   * Helper method to create multiple searchable selects at once
   * @param {Array} configs - Array of configuration objects
   * @returns {Array} Array of SearchableSelect instances
   */
  static createMultiple(configs) {
    return configs.map(({ container, id, options, templateConfig, componentConfig }) => {
      return this.renderAndInit(container, id, options, templateConfig, componentConfig);
    });
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchableSelectTemplate;
}
