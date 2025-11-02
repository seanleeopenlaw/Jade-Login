/**
 * JADE Loading State Transitions
 * Reusable functions for loading → success/error state transitions
 */

'use strict';

/**
 * Transition from loading to success state
 * @param {Object} options - Configuration
 * @param {number} options.loadingDuration - Time to show loading (default: 1500ms)
 * @param {number} options.successDelay - Time before completing (default: 1000ms)
 * @param {string} options.loadingStateId - ID of loading container (default: 'loading-state')
 * @param {string} options.successStateId - ID of success container (default: 'success-state')
 * @returns {Promise} Resolves when transition complete
 */
async function transitionToSuccess(options = {}) {
  const {
    loadingDuration = 1500,
    successDelay = 1000,
    loadingStateId = 'loading-state',
    successStateId = 'success-state'
  } = options;

  // Show loading state for specified duration
  await delay(loadingDuration);

  // Fade out loading text
  const loadingTexts = document.querySelectorAll('.loading-text');
  loadingTexts.forEach(el => el.classList.add('fade-out'));

  await delay(300); // Wait for fade out

  // Switch states
  const loadingState = document.getElementById(loadingStateId);
  const successState = document.getElementById(successStateId);

  if (loadingState) loadingState.style.display = 'none';
  if (successState) successState.style.display = 'block';

  await delay(100); // Small delay for DOM update

  // Animate success icon and text
  const successIcon = document.querySelector('.success-icon');
  const successTexts = document.querySelectorAll('.success-text');

  if (successIcon) successIcon.classList.add('show');
  successTexts.forEach(el => el.classList.add('fade-in'));

  // Wait for success display
  await delay(successDelay);
}

/**
 * Transition from loading to error state
 * @param {Object} options - Configuration
 * @param {string} options.errorMessage - Error message to display
 * @param {string} options.loadingStateId - ID of loading container (default: 'loading-state')
 * @param {string} options.errorStateId - ID of error container (default: 'error-state')
 * @returns {Promise} Resolves when transition complete
 */
async function transitionToError(options = {}) {
  const {
    errorMessage = 'An error occurred',
    loadingStateId = 'loading-state',
    errorStateId = 'error-state'
  } = options;

  // Fade out loading
  const loadingState = document.getElementById(loadingStateId);
  const errorState = document.getElementById(errorStateId);

  if (loadingState) loadingState.style.display = 'none';
  if (errorState) errorState.style.display = 'block';

  const errorTextEl = document.querySelector('#error-message');
  if (errorTextEl) {
    errorTextEl.textContent = errorMessage;
  }
}

/**
 * Show loading state on button
 * Enhanced version with spinner support
 * @param {HTMLElement} button - Button element
 * @param {string} text - Loading text (default: 'Loading...')
 * @param {boolean} showSpinner - Show spinner icon (default: false)
 */
function showButtonLoading(button, text = 'Loading...', showSpinner = false) {
  if (!button.dataset.originalContent) {
    button.dataset.originalContent = button.innerHTML;
  }

  if (showSpinner) {
    button.innerHTML = `<span class="spinner spinner-sm" style="display: inline-block; margin-right: 0.5rem;"></span>${text}`;
  } else {
    button.textContent = text;
  }

  button.disabled = true;
  button.style.opacity = '0.7';
  button.style.cursor = 'not-allowed';
}

/**
 * Hide loading state on button
 * @param {HTMLElement} button - Button element
 */
function hideButtonLoading(button) {
  if (button.dataset.originalContent) {
    button.innerHTML = button.dataset.originalContent;
    delete button.dataset.originalContent;
  }

  button.disabled = false;
  button.style.opacity = '';
  button.style.cursor = '';
}

/**
 * Utility: Promise-based delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    transitionToSuccess,
    transitionToError,
    showButtonLoading,
    hideButtonLoading,
    delay
  };
}
