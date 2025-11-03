/**
 * JADE Form Validation Utilities
 * Reusable validation functions with consistent error handling
 */

'use strict';

/**
 * Validate email input with error display
 * @param {HTMLInputElement} emailInput - Email input element
 * @param {Object} options - Configuration options
 * @param {string} options.errorSelector - CSS selector for error element (default: '#email-error')
 * @param {boolean} options.checkDomain - Validate domain existence (default: false)
 * @param {string} options.emptyMessage - Message for empty field
 * @param {string} options.invalidMessage - Message for invalid email
 * @param {string} options.domainMessage - Message for invalid domain
 * @returns {boolean} True if valid, false otherwise
 */
function validateEmailField(emailInput, options = {}) {
  const {
    errorSelector = '#email-error',
    checkDomain = false,
    emptyMessage = 'Please enter your email address',
    invalidMessage = 'Please enter a valid email address',
    domainMessage = 'Please use a valid email domain'
  } = options;

  const email = emailInput.value.trim();
  const errorEl = document.querySelector(errorSelector);

  // Helper to show error
  const showFieldError = (message) => {
    emailInput.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
    return false;
  };

  // Helper to clear error
  const clearFieldError = () => {
    emailInput.classList.remove('error');
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }
    return true;
  };

  // Validation checks
  if (!email) {
    return showFieldError(emptyMessage);
  }

  if (!isValidEmail(email)) {
    return showFieldError(invalidMessage);
  }

  if (checkDomain && !isValidDomain(email)) {
    return showFieldError(domainMessage);
  }

  return clearFieldError();
}

/**
 * Setup real-time email validation
 * Adds event listeners for blur and input events
 * @param {HTMLInputElement} emailInput - Email input element
 * @param {Object} options - Validation options (same as validateEmailField)
 */
function setupEmailValidation(emailInput, options = {}) {
  const errorSelector = options.errorSelector || '#email-error';

  // Validate on blur
  emailInput.addEventListener('blur', () => {
    validateEmailField(emailInput, options);
  });

  // Clear error on input
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
      emailInput.classList.remove('error');
      const errorEl = document.querySelector(errorSelector);
      if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
      }
    }
    // Also hide global error message if present
    if (typeof hideError === 'function') {
      hideError();
    }
  });
}

/**
 * Validate required text field
 * @param {HTMLInputElement} input - Input element
 * @param {string} fieldName - Human-readable field name
 * @param {string} errorSelector - CSS selector for error element
 * @returns {boolean} True if valid, false otherwise
 */
function validateRequired(input, fieldName = 'This field', errorSelector = null) {
  const value = input.value.trim();

  if (!value) {
    input.classList.add('error');

    if (errorSelector) {
      const errorEl = document.querySelector(errorSelector);
      if (errorEl) {
        errorEl.textContent = `${fieldName} is required`;
        errorEl.style.display = 'block';
      }
    } else if (typeof showError === 'function') {
      showError(`${fieldName} is required`);
    }

    return false;
  }

  input.classList.remove('error');

  if (errorSelector) {
    const errorEl = document.querySelector(errorSelector);
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }
  }

  return true;
}

/**
 * Validate phone number format
 * @param {HTMLInputElement} phoneInput - Phone input element
 * @param {Object} options - Configuration options
 * @returns {boolean} True if valid, false otherwise
 */
function validatePhoneField(phoneInput, options = {}) {
  const {
    errorSelector = '#mobile-error',
    emptyMessage = 'Please enter your mobile number',
    invalidMessage = 'Please enter a valid mobile number'
  } = options;

  const phone = phoneInput.value.trim();
  const errorEl = document.querySelector(errorSelector);

  // Helper to show error
  const showFieldError = (message) => {
    phoneInput.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
    return false;
  };

  // Helper to clear error
  const clearFieldError = () => {
    phoneInput.classList.remove('error');
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }
    return true;
  };

  // Allow empty for optional fields
  if (!phone) {
    return clearFieldError();
  }

  // Basic phone validation (10+ digits)
  const phonePattern = /^[\d\s\-\+\(\)]{10,}$/;
  if (!phonePattern.test(phone)) {
    return showFieldError(invalidMessage);
  }

  return clearFieldError();
}

/**
 * Validate name field (no numbers or special characters)
 * @param {HTMLInputElement} nameInput - Name input element
 * @param {Object} options - Configuration options
 * @returns {boolean} True if valid, false otherwise
 */
function validateNameField(nameInput, options = {}) {
  const {
    errorSelector = null,
    fieldName = 'Name',
    emptyMessage = `Please enter your ${fieldName.toLowerCase()}`,
    invalidMessage = `${fieldName} should only contain letters`
  } = options;

  const name = nameInput.value.trim();
  const errorEl = errorSelector ? document.querySelector(errorSelector) : null;

  // Helper to show error
  const showFieldError = (message) => {
    nameInput.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    } else if (typeof showError === 'function') {
      showError(message);
    }
    return false;
  };

  // Helper to clear error
  const clearFieldError = () => {
    nameInput.classList.remove('error');
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }
    return true;
  };

  if (!name) {
    return showFieldError(emptyMessage);
  }

  // Allow letters, spaces, hyphens, apostrophes
  const namePattern = /^[a-zA-Z\s\-']+$/;
  if (!namePattern.test(name)) {
    return showFieldError(invalidMessage);
  }

  return clearFieldError();
}

/**
 * Clear all validation errors in a form
 * @param {HTMLFormElement} form - Form element
 */
function clearFormErrors(form) {
  // Remove error class from all inputs
  const inputs = form.querySelectorAll('.error');
  inputs.forEach(input => input.classList.remove('error'));

  // Hide all error messages
  const errorMessages = form.querySelectorAll('[id$="-error"]');
  errorMessages.forEach(error => {
    error.style.display = 'none';
    error.textContent = '';
  });

  // Hide global error if present
  if (typeof hideError === 'function') {
    hideError();
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateEmailField,
    setupEmailValidation,
    validateRequired,
    validatePhoneField,
    validateNameField,
    clearFormErrors
  };
}
