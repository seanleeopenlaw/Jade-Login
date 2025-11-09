/**
 * JADE Searchable Select Component
 * Reusable searchable multi-select with tags
 *
 * @param {string} id - Unique identifier for this instance
 * @param {Array|Object} options - Options data (flat array or categorized object)
 * @param {Object} config - Configuration options
 */

class SearchableSelect {
  constructor(id, options, config = {}) {
    this.id = id;
    this.options = options;
    this.selected = new Set();
    this.disabled = false;

    // Configuration with defaults
    this.config = {
      // Text customization
      triggerPlaceholder: 'Select options...',
      searchPlaceholder: 'Search...',
      noResultsMessage: 'No results found',

      // Selection behavior
      maxSelections: null, // null = unlimited
      minSelections: 0,
      allowClearAll: true,
      closeOnSelect: false,

      // Search behavior
      caseSensitive: false,
      searchFields: ['label'], // Which fields to search

      // UI customization
      showCounter: false,
      showTags: true,
      dropdownMaxHeight: '400px',

      // Validation
      required: false,
      validator: null, // Custom validation function

      // Event callbacks
      onChange: null,
      onSearch: null,
      onOpen: null,
      onClose: null,
      onSelect: null,
      onDeselect: null,
      onValidate: null,

      // Initial state
      initialValues: [],
      disabled: false,

      // Override defaults with provided config
      ...config
    };

    // Get DOM elements
    this.trigger = document.getElementById(`${id}-trigger`);
    this.input = document.getElementById(`${id}-search-input`);
    this.dropdown = document.getElementById(`${id}-dropdown`);
    this.optionsContainer = document.getElementById(`${id}-options`);
    this.tagsContainer = document.getElementById(`${id}-tags`);
    this.counter = document.getElementById(`${id}-counter`);

    // Apply initial configuration
    this.applyConfig();

    // Initialize
    this.init();
  }

  applyConfig() {
    // Set placeholders
    if (this.trigger) {
      const triggerText = this.trigger.querySelector('.searchable-select-trigger-text');
      if (triggerText) {
        triggerText.textContent = this.config.triggerPlaceholder;
      }
    }

    if (this.input) {
      this.input.placeholder = this.config.searchPlaceholder;
    }

    // Set initial values
    if (this.config.initialValues && this.config.initialValues.length > 0) {
      this.selected = new Set(this.config.initialValues);
    }

    // Set disabled state
    if (this.config.disabled) {
      this.disable();
    }

    // Apply max height
    if (this.dropdown) {
      this.dropdown.style.maxHeight = this.config.dropdownMaxHeight;
    }
  }

  init() {
    // Render initial options
    this.renderOptions();

    // Event listeners
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    this.input.addEventListener('input', () => this.handleSearch());

    // Prevent dropdown from closing when clicking inside it
    this.dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest(`#${this.id}-searchable`)) {
        this.hideDropdown();
      }
    });
  }

  renderOptions(searchTerm = '') {
    // Clear container
    this.optionsContainer.innerHTML = '';

    // If options have categories, render by category
    if (this.options.categories) {
      this.renderCategorizedOptions(searchTerm);
    } else {
      // Fallback to flat list
      this.renderFlatOptions(searchTerm);
    }
  }

  renderCategorizedOptions(searchTerm = '') {
    const categories = this.options.categories;
    let hasResults = false;

    categories.forEach(category => {
      // Filter items in this category
      const filtered = category.items.filter(opt => this.matchesSearch(opt, searchTerm));

      if (filtered.length > 0) {
        hasResults = true;

        // Category header
        const header = document.createElement('div');
        header.className = 'searchable-select-category';
        header.textContent = category.name;
        this.optionsContainer.appendChild(header);

        // Options
        filtered.forEach(opt => {
          const optionEl = this.createOptionElement(opt);
          this.optionsContainer.appendChild(optionEl);
        });
      }
    });

    if (!hasResults) {
      this.showNoResults(searchTerm);
    }
  }

  renderFlatOptions(searchTerm = '') {
    // Filter options based on search
    const filtered = this.options.filter(opt => this.matchesSearch(opt, searchTerm));

    if (filtered.length === 0) {
      this.showNoResults(searchTerm);
      return;
    }

    // Render all options
    filtered.forEach(opt => {
      const optionEl = this.createOptionElement(opt);
      this.optionsContainer.appendChild(optionEl);
    });
  }

  matchesSearch(option, searchTerm) {
    if (!searchTerm) return true;

    const term = this.config.caseSensitive ? searchTerm : searchTerm.toLowerCase();

    // Search across configured fields
    return this.config.searchFields.some(field => {
      const value = option[field];
      if (!value) return false;

      const fieldValue = this.config.caseSensitive ? value : value.toLowerCase();
      return fieldValue.includes(term);
    });
  }

  createOptionElement(opt) {
    const optionEl = document.createElement('div');
    optionEl.className = 'searchable-select-option';
    if (this.selected.has(opt.value)) {
      optionEl.classList.add('selected');
    }
    optionEl.textContent = opt.label;
    optionEl.dataset.value = opt.value;

    optionEl.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent dropdown from closing
      this.toggleOption(opt.value);
    });

    return optionEl;
  }

  showNoResults(searchTerm) {
    const message = searchTerm
      ? `${this.config.noResultsMessage} for "${searchTerm}"`
      : this.config.noResultsMessage;

    this.optionsContainer.innerHTML = `
      <div class="searchable-select-no-results">${message}</div>
    `;
  }

  handleSearch() {
    const searchTerm = this.input.value;
    this.renderOptions(searchTerm);
    this.showDropdown();

    // Trigger onSearch callback
    if (this.config.onSearch && typeof this.config.onSearch === 'function') {
      this.config.onSearch(searchTerm, this.getSelected());
    }
  }

  toggleOption(value) {
    if (this.selected.has(value)) {
      this.deselect(value);
    } else {
      this.select(value);
    }

    // Close dropdown if configured to do so
    if (this.config.closeOnSelect) {
      this.hideDropdown();
    }
  }

  select(value) {
    // Check max selections
    if (this.config.maxSelections && this.selected.size >= this.config.maxSelections) {
      console.warn(`Maximum ${this.config.maxSelections} selections allowed`);
      return;
    }

    this.selected.add(value);
    this.updateUI();

    // Trigger onSelect callback
    if (this.config.onSelect && typeof this.config.onSelect === 'function') {
      const option = this.findOption(value);
      this.config.onSelect(value, option, this.getSelected());
    }

    // Trigger onChange callback
    this.triggerChange();
  }

  deselect(value) {
    this.selected.delete(value);
    this.updateUI();

    // Trigger onDeselect callback
    if (this.config.onDeselect && typeof this.config.onDeselect === 'function') {
      const option = this.findOption(value);
      this.config.onDeselect(value, option, this.getSelected());
    }

    // Trigger onChange callback
    this.triggerChange();
  }

  triggerChange() {
    if (this.config.onChange && typeof this.config.onChange === 'function') {
      this.config.onChange(this.getSelected(), this.validate());
    }
  }

  updateUI() {
    // Update options
    this.renderOptions(this.input.value);

    // Update tags
    this.renderTags();

    // Update counter
    this.updateCounter();
  }

  renderTags() {
    this.tagsContainer.innerHTML = '';

    this.selected.forEach(value => {
      const option = this.findOption(value);
      if (!option) return;

      const tag = document.createElement('div');
      tag.className = 'searchable-select-tag';
      tag.innerHTML = `
        <span>${option.label}</span>
        <span class="searchable-select-tag-remove">×</span>
      `;

      tag.querySelector('.searchable-select-tag-remove').addEventListener('click', () => {
        this.deselect(value);
      });

      this.tagsContainer.appendChild(tag);
    });
  }

  findOption(value) {
    // Check if options have categories
    if (this.options.categories) {
      for (const category of this.options.categories) {
        const found = category.items.find(opt => opt.value === value);
        if (found) return found;
      }
      return null;
    } else {
      return this.options.find(opt => opt.value === value);
    }
  }

  updateCounter() {
    if (!this.counter) return;

    if (this.config.showCounter && this.selected.size > 0) {
      this.counter.textContent = this.selected.size;
      this.counter.style.display = 'block';
    } else {
      this.counter.style.display = 'none';
    }
  }

  toggleDropdown() {
    if (this.dropdown.classList.contains('active')) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  }

  showDropdown() {
    if (this.disabled) return;

    this.dropdown.classList.add('active');
    this.trigger.classList.add('active');

    // Check if there's enough space below, otherwise show above
    this.adjustDropdownPosition();

    // Focus search input when dropdown opens
    setTimeout(() => {
      this.input.focus();
    }, 100);

    // Trigger onOpen callback
    if (this.config.onOpen && typeof this.config.onOpen === 'function') {
      this.config.onOpen(this.getSelected());
    }
  }

  adjustDropdownPosition() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const dropdownHeight = 500; // max possible height
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    // If not enough space below but enough above, show above
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      this.dropdown.classList.add('dropdown-above');
    } else {
      this.dropdown.classList.remove('dropdown-above');
    }
  }

  hideDropdown() {
    this.dropdown.classList.remove('active');
    this.trigger.classList.remove('active');
    this.input.value = ''; // Clear search
    this.renderOptions(); // Reset to full list

    // Trigger onClose callback
    if (this.config.onClose && typeof this.config.onClose === 'function') {
      this.config.onClose(this.getSelected());
    }
  }

  // Don't close dropdown when selecting options
  preventClose(e) {
    e.stopPropagation();
  }

  // ============================================
  // PUBLIC API METHODS
  // ============================================

  /**
   * Get currently selected values
   * @returns {Array} Array of selected values
   */
  getSelected() {
    return Array.from(this.selected);
  }

  /**
   * Get selected options with full data
   * @returns {Array} Array of selected option objects
   */
  getSelectedOptions() {
    return this.getSelected().map(value => this.findOption(value)).filter(Boolean);
  }

  /**
   * Set selected values
   * @param {Array} values - Array of values to select
   */
  setSelected(values) {
    this.selected = new Set(values);
    this.updateUI();
    this.triggerChange();
  }

  /**
   * Clear all selections
   */
  clear() {
    if (!this.config.allowClearAll) {
      console.warn('Clear all is disabled in configuration');
      return;
    }

    this.selected.clear();
    this.updateUI();
    this.triggerChange();
  }

  /**
   * Disable the component
   */
  disable() {
    this.disabled = true;
    if (this.trigger) {
      this.trigger.disabled = true;
      this.trigger.style.opacity = '0.5';
      this.trigger.style.cursor = 'not-allowed';
    }
    if (this.input) {
      this.input.disabled = true;
    }
  }

  /**
   * Enable the component
   */
  enable() {
    this.disabled = false;
    if (this.trigger) {
      this.trigger.disabled = false;
      this.trigger.style.opacity = '1';
      this.trigger.style.cursor = 'pointer';
    }
    if (this.input) {
      this.input.disabled = false;
    }
  }

  /**
   * Validate current selection
   * @returns {Object} Validation result {valid: boolean, errors: Array}
   */
  validate() {
    const errors = [];

    // Check required
    if (this.config.required && this.selected.size === 0) {
      errors.push('At least one option must be selected');
    }

    // Check min selections
    if (this.config.minSelections > 0 && this.selected.size < this.config.minSelections) {
      errors.push(`At least ${this.config.minSelections} option(s) must be selected`);
    }

    // Check max selections
    if (this.config.maxSelections && this.selected.size > this.config.maxSelections) {
      errors.push(`Maximum ${this.config.maxSelections} option(s) allowed`);
    }

    // Custom validator
    if (this.config.validator && typeof this.config.validator === 'function') {
      const customError = this.config.validator(this.getSelected(), this.getSelectedOptions());
      if (customError) {
        errors.push(customError);
      }
    }

    const result = {
      valid: errors.length === 0,
      errors: errors
    };

    // Trigger onValidate callback
    if (this.config.onValidate && typeof this.config.onValidate === 'function') {
      this.config.onValidate(result);
    }

    return result;
  }

  /**
   * Destroy the component and remove event listeners
   */
  destroy() {
    // Remove event listeners
    document.removeEventListener('click', this.hideDropdown);

    // Clear containers
    if (this.optionsContainer) this.optionsContainer.innerHTML = '';
    if (this.tagsContainer) this.tagsContainer.innerHTML = '';

    // Clear selected
    this.selected.clear();
  }

  /**
   * Update configuration options
   * @param {Object} newConfig - New configuration options
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.applyConfig();
    this.updateUI();
  }
}
