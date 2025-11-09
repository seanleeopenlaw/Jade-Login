/**
 * JADE Utility Functions
 * Simple utilities for the prototype
 */

'use strict';

/**
 * Show error message to user
 */
function showError(message, containerId = 'error-message') {
  const errorEl = document.getElementById(containerId);
  const errorText = errorEl.querySelector('.error-text');

  if (errorEl && errorText) {
    errorText.textContent = message;
    errorEl.style.display = 'flex';
    setTimeout(() => hideError(containerId), 10000);
  }
}

/**
 * Hide error message
 */
function hideError(containerId = 'error-message') {
  const errorEl = document.getElementById(containerId);
  if (errorEl) {
    errorEl.style.display = 'none';
  }
}

/**
 * Show loading state on button
 * Enhanced version with spinner support
 * @param {HTMLElement} button - Button element
 * @param {string} text - Loading text (default: 'Loading...')
 * @param {Object} options - Additional options
 * @param {boolean} options.showSpinner - Show spinner icon (default: false)
 */
function showLoading(button, text = 'Loading...', options = {}) {
  const { showSpinner = false } = options;

  // Store original content
  if (!button.dataset.originalContent) {
    button.dataset.originalContent = button.innerHTML;
  }

  // Update button content
  if (showSpinner) {
    button.innerHTML = `<span class="spinner spinner-sm" style="display: inline-block; margin-right: 0.5rem;"></span>${text}`;
  } else {
    button.textContent = text;
  }

  // Disable button with visual feedback
  button.disabled = true;
  button.classList.add('loading');
  button.style.opacity = '0.7';
  button.style.cursor = 'not-allowed';
}

/**
 * Hide loading state on button
 * @param {HTMLElement} button - Button element
 */
function hideLoading(button) {
  if (button.dataset.originalContent) {
    button.innerHTML = button.dataset.originalContent;
    delete button.dataset.originalContent;
  }

  button.disabled = false;
  button.classList.remove('loading');
  button.style.opacity = '';
  button.style.cursor = '';
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

/**
 * Validate domain (for SSO check)
 */
function isValidDomain(email) {
  // Simple check - just ensure there's a domain
  return email.includes('@') && email.split('@')[1].length > 0;
}

/**
 * Validate password strength
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
 * Session storage helpers
 */
function getSession(key, defaultValue = null) {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}

function setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function clearSession(key = null) {
  if (key) {
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.clear();
  }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success', duration = 2000) {
  const existingToast = document.getElementById('toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = `toast toast-${type}`;

  // Icon
  let icon = '';
  if (type === 'success') {
    icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  } else if (type === 'error') {
    icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  const iconDiv = document.createElement('div');
  iconDiv.className = 'toast-icon';
  iconDiv.innerHTML = icon;

  const messageDiv = document.createElement('div');
  messageDiv.className = 'toast-message';
  messageDiv.textContent = message;

  toast.appendChild(iconDiv);
  toast.appendChild(messageDiv);
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

/**
 * ========================================
 * ONBOARDING UTILITIES
 * ========================================
 */

/**
 * Check if user should go through onboarding
 * @param {string} email - User's email address
 * @returns {boolean} True if user should see onboarding flow
 */
function shouldShowOnboarding(email) {
  // For prototype: new@email.com always goes through onboarding flow
  if (email === 'new@email.com') return true;

  // All other users skip onboarding
  return false;
}

/**
 * Mark onboarding as complete
 * Saves to both localStorage (persistent) and sessionStorage (current session)
 */
function markOnboardingComplete() {
  localStorage.setItem('profileSetupComplete', 'true');
  setSession('profileSetupComplete', true);
}

/**
 * Get onboarding data from session storage
 * @param {string} [key] - Optional key to get specific data
 * @returns {object|any|null} Onboarding data object, specific value, or null
 */
function getOnboardingData(key) {
  const data = sessionStorage.getItem('onboardingData');
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    return key ? parsed[key] : parsed;
  } catch (e) {
    console.error('Error parsing onboarding data:', e);
    return null;
  }
}

/**
 * Save onboarding data to session storage
 * Merges with existing data
 * @param {object} data - Data to save
 */
function saveOnboardingData(data) {
  const existing = getOnboardingData() || {};
  const updated = { ...existing, ...data };
  sessionStorage.setItem('onboardingData', JSON.stringify(updated));
}

/**
 * Clear onboarding data from session storage
 */
function clearOnboardingData() {
  sessionStorage.removeItem('onboardingData');
}

/**
 * Check if email belongs to enterprise organization with auto Pro access
 * @param {string} email - User's email address
 * @returns {boolean} True if enterprise email
 */
function isEnterpriseEmail(email) {
  const domain = email.toLowerCase().split('@')[1];
  const enterpriseDomains = ['organisation.com'];
  return enterpriseDomains.includes(domain);
}

/**
 * Determine post-auth redirect URL based on user state
 * @param {string} email - User's email address
 * @returns {string} Redirect URL path
 */
function getPostAuthRedirect(email) {
  // Enterprise users go directly to Pro app
  if (isEnterpriseEmail(email)) {
    return 'app-loading.html?target=pro';
  }

  if (shouldShowOnboarding(email)) {
    return 'account-setup-step1.html';
  }

  return '2-plan-selection.html';
}
