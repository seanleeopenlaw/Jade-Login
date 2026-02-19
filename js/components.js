/**
 * JADE Reusable Component Factories
 * Create common HTML elements programmatically to reduce duplication
 */

'use strict';

/**
 * Create error message container
 * Uses semantic <error-alert> custom element
 * @param {string} containerId - ID for the container (default: 'error-message')
 * @returns {HTMLElement} Error message element
 */
function createErrorMessage(containerId = 'error-message') {
  const container = document.createElement('error-alert');
  container.id = containerId;
  container.setAttribute('role', 'alert');
  container.setAttribute('aria-live', 'assertive');

  container.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <path d="M12 8v4m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <span></span>
  `;

  return container;
}

/**
 * Create page header with logo and title
 * Uses semantic <page-header> custom element
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

  const header = document.createElement('page-header');

  let html = '';

  if (showLogo) {
    html += `<img src="${logoSrc}" alt="${logoAlt}" />`;
  }

  html += `<h1>${title}</h1>`;

  if (subtitle) {
    html += `<p>${subtitle}</p>`;
  }

  header.innerHTML = html;
  return header;
}

/**
 * Create form card container
 * Uses semantic <form-card> custom element
 * @param {string} content - HTML content or empty string
 * @param {string} padding - Padding class (default: 'p-6 sm:p-8')
 * @returns {HTMLElement} Card element
 */
function createFormCard(content = '', padding = 'p-6 sm:p-8') {
  const card = document.createElement('form-card');
  card.className = padding;

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

/**
 * Create auth footer with logo, links, and copyright
 * Uses semantic custom elements for cleaner markup
 * @param {Object} options - Configuration
 * @param {string} options.basePath - Base path for links (default: '')
 * @returns {HTMLElement} Footer element
 */
function createAuthFooter(options = {}) {
  const { basePath = '' } = options;

  const footer = document.createElement('footer');
  footer.className = 'ui2-footer';

  // Monochrome JADE logo SVG (gray)
  const logoSvg = `<svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.042 0C11.0777 0 11.0957 0.0179983 11.0957 0.0537109V10.8545C11.0957 11.9801 10.7479 13.0258 10.0508 13.9365C9.27341 14.9549 8.2551 15.5974 7.02246 15.8926C6.75468 15.9462 6.5135 15.9732 6.24512 16C6.2094 16 6.19141 15.982 6.19141 15.9463V5.17188C6.19152 3.80532 6.67327 2.59904 7.61133 1.60742C8.33515 0.856855 9.19252 0.374875 10.2109 0.133789C10.4787 0.0802297 10.7736 0.0267941 11.042 0ZM3.93627e-07 8.68164C0.107149 8.68164 0.187774 8.70801 0.294922 8.70801C0.910817 8.76155 1.47379 8.94905 2.03613 9.2168C3.08142 9.75252 3.85914 10.5299 4.39551 11.5752C4.69014 12.1376 4.85071 12.7546 4.9043 13.3975C4.93108 13.5582 4.93066 13.7192 4.93066 13.8799V15.9434C4.93066 15.9968 4.90406 15.9971 4.85059 15.9971C4.18029 15.9435 3.53721 15.7829 2.94727 15.4883C1.92878 14.9793 1.15159 14.2289 0.615235 13.2373C0.320592 12.7016 0.160444 12.1381 0.0800785 11.5488C0.0532914 11.4149 0.0531547 11.2804 0.0263676 11.1465V11.1201C-0.000415181 10.2893 1.92503e-07 9.4858 3.93627e-07 8.68164ZM20.7852 5.00977L20.0977 5.11914V10.4316C20.0977 11.0995 19.9578 11.4788 19.5791 11.9971L18.6025 13.3223C18.3734 13.3123 18.1538 13.2226 18.0342 13.083L18.7021 11.2295V5.11914L17.8652 5.00977V4.91992C17.8652 4.69082 17.9249 4.46165 18.0244 4.33203H20.8848L20.7852 5.00977ZM26.7773 10.3447L27.3252 10.4541V10.5439C27.3252 10.7531 27.2656 11.0021 27.166 11.1318H24.4053L24.5049 10.4541L25.3027 10.3447L24.7139 8.65039L22.7705 8.76953L22.2227 10.3447L23.0693 10.4541V10.5439C23.0693 10.7531 23.0096 11.0021 22.9199 11.1318H20.6777L20.7676 10.4541L21.2158 10.3447L23.4785 4.33496L24.5947 4.23535L26.7773 10.3447ZM39.3789 6.14844C39.2194 6.24811 38.9302 6.29785 38.7109 6.29785H38.6016L38.3125 5.12207H36.5479V7.30469H38.6514C38.6813 7.43424 38.7012 7.59392 38.7012 7.7334C38.7012 7.87297 38.6813 8.0228 38.6514 8.15234L37.7939 8.08203H36.5479V10.3945L38.4521 10.2949L38.7412 9.11914H38.8506C39.0699 9.11914 39.3591 9.17865 39.5186 9.27832V11.1318H34.3359L34.4248 10.4541L35.1426 10.3447V5.12207L34.3457 5.0127V4.92285C34.3457 4.71366 34.3956 4.4646 34.4951 4.33496H38.1133L39.3789 4.23535V6.14844ZM30.6875 4.33203C32.611 4.33203 34.0369 5.46788 34.0371 7.7002C34.0371 9.93286 32.4721 11.1299 30.668 11.1299H27.6084L27.6973 10.4521L28.415 10.3418V5.11914L27.6182 5.00977V4.91992C27.6182 4.71067 27.668 4.46163 27.7676 4.33203H30.6875ZM29.8203 10.3018L30.877 10.3916C31.6943 10.1823 32.4824 9.46441 32.4824 7.7002C32.4823 5.70715 31.6244 5.10938 30.5879 5.10938H29.8203V10.3018ZM23.0098 8.03223H24.5049L23.8076 5.96875H23.7178L23.0098 8.03223Z" fill="currentColor"/>
  </svg>`;

  footer.innerHTML = `
    ${logoSvg}
    <nav aria-label="Footer links">
      <a href="mailto:help@jade.io">Contact</a>
      <a href="https://jade.io/t/privacy_policy.html" target="_blank" rel="noopener">Privacy Policy</a>
      <a href="https://jade.io/t/terms_of_use.html" target="_blank" rel="noopener">Terms of Use</a>
    </nav>
    <copyright>
      &copy; 2002 - ${new Date().getFullYear()} BarNetwork Pty Limited (ABN 32 092 121 198). All rights reserved.
    </copyright>
  `;

  return footer;
}

/**
 * Initialize auth footer on page load
 * Call this function to automatically append footer to body
 * @param {Object} options - Configuration options for createAuthFooter
 */
function initAuthFooter(options = {}) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(createAuthFooter(options));
    });
  } else {
    document.body.appendChild(createAuthFooter(options));
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createErrorMessage,
    createPageHeader,
    createFormCard,
    createSpinner,
    createInputField,
    createButton,
    createAuthFooter,
    initAuthFooter
  };
}
