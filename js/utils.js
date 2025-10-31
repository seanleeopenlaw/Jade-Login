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
 */
function showLoading(button, text = 'Loading...') {
  if (!button.dataset.originalText) {
    button.dataset.originalText = button.textContent;
  }
  button.textContent = text;
  button.disabled = true;
}

/**
 * Hide loading state on button
 */
function hideLoading(button) {
  if (button.dataset.originalText) {
    button.textContent = button.dataset.originalText;
    delete button.dataset.originalText;
  }
  button.disabled = false;
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
