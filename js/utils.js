/**
 * JADE Utility Functions
 * Common utilities for forms, validation, and UI interactions
 */

'use strict';

/**
 * Show error message to user
 * @param {string} message - Error message to display
 * @param {string} containerId - ID of the error container element
 */
function showError(message, containerId = 'error-message') {
  const errorEl = document.getElementById(containerId);
  const errorText = errorEl.querySelector('.error-text');

  if (errorEl && errorText) {
    errorText.textContent = message;
    errorEl.style.display = 'flex';
    errorEl.setAttribute('role', 'alert');
    errorEl.setAttribute('aria-live', 'assertive');

    // Auto-hide after 10 seconds
    setTimeout(() => hideError(containerId), 10000);
  }
}

/**
 * Hide error message
 * @param {string} containerId - ID of the error container element
 */
function hideError(containerId = 'error-message') {
  const errorEl = document.getElementById(containerId);
  if (errorEl) {
    errorEl.style.display = 'none';
    errorEl.removeAttribute('role');
    errorEl.removeAttribute('aria-live');
  }
}

/**
 * Show loading state on button
 * @param {HTMLButtonElement} button - Button element
 * @param {string} text - Loading text to display
 */
function showLoading(button, text = 'Loading...') {
  if (!button.dataset.originalText) {
    button.dataset.originalText = button.textContent;
  }
  button.textContent = text;
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
}

/**
 * Hide loading state on button
 * @param {HTMLButtonElement} button - Button element
 */
function hideLoading(button) {
  if (button.dataset.originalText) {
    button.textContent = button.dataset.originalText;
    delete button.dataset.originalText;
  }
  button.disabled = false;
  button.removeAttribute('aria-busy');
}

/**
 * Redirect with delay
 * @param {string} url - URL to redirect to
 * @param {number} delay - Delay in milliseconds
 */
function redirectWithDelay(url, delay = 800) {
  setTimeout(() => {
    window.location.href = url;
  }, delay);
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with requirements met
 */
function validatePassword(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    isValid: password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
  };
}

/**
 * Toggle password visibility
 * @param {string} inputId - ID of the password input
 * @param {string} iconId - ID of the toggle icon
 */
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input && icon) {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    // Update ARIA label
    icon.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');

    // Update icon (SVG paths would be updated here in actual implementation)
    icon.innerHTML = isPassword
      ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
      : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  }
}

/**
 * Get or create session data
 * @param {string} key - Session storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} - Session value
 */
function getSession(key, defaultValue = null) {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}

/**
 * Set session data
 * @param {string} key - Session storage key
 * @param {*} value - Value to store
 */
function setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * Clear session data
 * @param {string} key - Optional key to clear, or clears all if not provided
 */
function clearSession(key = null) {
  if (key) {
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.clear();
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated, false otherwise
 */
function isAuthenticated() {
  return !!getSession('userEmail');
}

/**
 * Require authentication - redirect to login if not authenticated
 * @param {string} loginUrl - URL to redirect to if not authenticated
 */
function requireAuth(loginUrl = '1-gated-landing.html') {
  if (!isAuthenticated()) {
    window.location.href = loginUrl;
  }
}

/**
 * Set up session timeout
 * @param {number} timeout - Timeout in milliseconds (default: 30 minutes)
 * @param {string} loginUrl - URL to redirect to on timeout
 */
function setupSessionTimeout(timeout = 30 * 60 * 1000, loginUrl = '1-gated-landing.html') {
  let sessionTimer;

  function resetTimer() {
    clearTimeout(sessionTimer);
    sessionTimer = setTimeout(() => {
      alert('Your session has expired. Please log in again.');
      clearSession();
      window.location.href = loginUrl;
    }, timeout);
  }

  // Reset timer on user activity
  ['click', 'keydown', 'mousemove', 'scroll'].forEach(event => {
    document.addEventListener(event, resetTimer, { passive: true });
  });

  resetTimer();
}
