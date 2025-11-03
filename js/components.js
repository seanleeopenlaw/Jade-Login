/**
 * JADE Reusable Component Factories
 * Create common HTML elements programmatically to reduce duplication
 */

'use strict';

/**
 * Create error message container
 * @param {string} containerId - ID for the container (default: 'error-message')
 * @returns {HTMLElement} Error message element
 */
function createErrorMessage(containerId = 'error-message') {
  const container = document.createElement('div');
  container.id = containerId;
  container.className = 'error-message';
  container.setAttribute('role', 'alert');
  container.setAttribute('aria-live', 'assertive');

  container.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <path d="M12 8v4m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <span class="error-text"></span>
  `;

  return container;
}

/**
 * Create page header with logo and title
 * @param {Object} options - Configuration
 * @param {string} options.logoSrc - Path to logo image
 * @param {string} options.logoAlt - Alt text for logo
 * @param {string} options.title - Page title
 * @param {string} options.subtitle - Optional subtitle text
 * @param {boolean} options.showLogo - Show logo (default: true)
 * @returns {HTMLElement} Header element
 */
function createPageHeader(options = {}) {
  const {
    logoSrc = '../jade_logo.svg',
    logoAlt = 'JADE Legal Research',
    title = '',
    subtitle = '',
    showLogo = true
  } = options;

  const header = document.createElement('div');
  header.className = 'text-center mb-8';

  let html = '';

  if (showLogo) {
    html += `<img src="${logoSrc}" alt="${logoAlt}" class="h-10 mx-auto mb-8" />`;
  }

  html += `
    <h1 class="text-3xl sm:text-4xl font-bold mb-3" style="font-family: var(--font-serif); line-height: 1.2;">
      ${title}
    </h1>
  `;

  if (subtitle) {
    html += `<p class="text-base jade-text-muted">${subtitle}</p>`;
  }

  header.innerHTML = html;
  return header;
}

/**
 * Create form card container
 * @param {string} content - HTML content or empty string
 * @param {string} padding - Padding class (default: 'p-6 sm:p-8')
 * @returns {HTMLElement} Card element
 */
function createFormCard(content = '', padding = 'p-6 sm:p-8') {
  const card = document.createElement('div');
  card.className = `card ${padding}`;

  if (content) {
    card.innerHTML = content;
  }

  return card;
}

/**
 * Create loading spinner element
 * @param {string} size - Spinner size: 'sm', 'md', 'lg' (default: 'md')
 * @returns {HTMLElement} Spinner element
 */
function createSpinner(size = 'md') {
  const spinner = document.createElement('div');
  spinner.className = size === 'md' ? 'spinner' : `spinner spinner-${size}`;
  return spinner;
}

/**
 * Create input field with label and error container
 * @param {Object} options - Configuration
 * @param {string} options.id - Input ID
 * @param {string} options.type - Input type (default: 'text')
 * @param {string} options.label - Label text
 * @param {string} options.placeholder - Placeholder text
 * @param {boolean} options.required - Required field (default: false)
 * @param {string} options.autocomplete - Autocomplete attribute
 * @returns {HTMLElement} Form field container
 */
function createInputField(options = {}) {
  const {
    id,
    type = 'text',
    label = '',
    placeholder = '',
    required = false,
    autocomplete = ''
  } = options;

  const container = document.createElement('div');

  let html = '';

  if (label) {
    html += `<label for="${id}" class="block text-sm font-medium mb-2">${label}</label>`;
  }

  html += `
    <input
      type="${type}"
      id="${id}"
      name="${id}"
      class="input-field"
      placeholder="${placeholder}"
      ${required ? 'required' : ''}
      ${autocomplete ? `autocomplete="${autocomplete}"` : ''}
      ${required ? 'aria-required="true"' : ''}
      aria-describedby="${id}-error"
    />
    <div id="${id}-error" style="display: none; color: var(--error); font-size: 0.875rem; font-weight: 500; margin-top: 0.5rem;"></div>
  `;

  container.innerHTML = html;
  return container;
}

/**
 * Create submit button
 * @param {Object} options - Configuration
 * @param {string} options.id - Button ID
 * @param {string} options.text - Button text
 * @param {string} options.type - Button type: 'primary' or 'secondary' (default: 'primary')
 * @returns {HTMLElement} Button element
 */
function createButton(options = {}) {
  const {
    id = '',
    text = 'Submit',
    type = 'primary'
  } = options;

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = `btn-${type}`;
  if (id) button.id = id;
  button.textContent = text;

  return button;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createErrorMessage,
    createPageHeader,
    createFormCard,
    createSpinner,
    createInputField,
    createButton
  };
}
