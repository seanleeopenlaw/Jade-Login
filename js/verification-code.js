/**
 * JADE Verification Code Input
 * Reusable class for handling 6-digit verification code inputs
 */

class VerificationCodeInput {
  /**
   * Create a verification code input handler
   * @param {Object} options - Configuration options
   * @param {string} options.containerSelector - CSS selector for the container with inputs
   * @param {string} options.inputSelector - CSS selector for individual digit inputs (default: '.verification-code-digit')
   * @param {string} options.buttonSelector - CSS selector for the verify button (optional)
   * @param {Function} options.onComplete - Callback when all 6 digits are entered (optional)
   * @param {Function} options.onVerify - Callback when verify button is clicked (optional)
   */
  constructor(options) {
    this.container = document.querySelector(options.containerSelector);
    if (!this.container) {
      throw new Error(`Container not found: ${options.containerSelector}`);
    }

    this.inputSelector = options.inputSelector || '.verification-code-digit';
    this.inputs = Array.from(this.container.querySelectorAll(this.inputSelector));

    if (this.inputs.length === 0) {
      throw new Error(`No inputs found with selector: ${this.inputSelector}`);
    }

    this.button = options.buttonSelector ? document.querySelector(options.buttonSelector) : null;
    this.onComplete = options.onComplete || null;
    this.onVerify = options.onVerify || null;

    this._init();
  }

  /**
   * Initialize event listeners
   * @private
   */
  _init() {
    this.inputs.forEach((input, index) => {
      // Input event - auto-focus next
      input.addEventListener('input', (e) => this._handleInput(e, index));

      // Keydown event - handle backspace
      input.addEventListener('keydown', (e) => this._handleKeydown(e, index));

      // Paste event - distribute pasted code
      input.addEventListener('paste', (e) => this._handlePaste(e, index));
    });

    // Verify button click handler
    if (this.button && this.onVerify) {
      this.button.addEventListener('click', () => {
        const code = this.getCode();
        if (this.isComplete()) {
          this.onVerify(code);
        }
      });
    }

    // Initial button state
    this._updateButtonState();
  }

  /**
   * Handle input event - only allow numbers and auto-focus next
   * @private
   */
  _handleInput(e, index) {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    e.target.value = value;

    // Auto-focus next input if digit entered
    if (value && index < this.inputs.length - 1) {
      this.inputs[index + 1].focus();
    }

    // Update button state and trigger completion callback
    this._updateButtonState();

    if (this.isComplete() && this.onComplete) {
      this.onComplete(this.getCode());
    }
  }

  /**
   * Handle keydown event - backspace navigation
   * @private
   */
  _handleKeydown(e, index) {
    // Backspace: focus previous input if current is empty
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      this.inputs[index - 1].focus();
    }

    // Enter: trigger verify if all digits filled
    if (e.key === 'Enter' && this.isComplete() && this.button) {
      e.preventDefault();
      this.button.click();
    }
  }

  /**
   * Handle paste event - distribute 6-digit code across inputs
   * @private
   */
  _handlePaste(e, index) {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, ''); // Only digits

    // Fill inputs with pasted data
    for (let i = 0; i < Math.min(pastedData.length, this.inputs.length); i++) {
      if (this.inputs[i]) {
        this.inputs[i].value = pastedData[i];
      }
    }

    // Focus last filled input or next empty
    const lastIndex = Math.min(pastedData.length, this.inputs.length - 1);
    this.inputs[lastIndex].focus();

    // Update button state and trigger completion callback
    this._updateButtonState();

    if (this.isComplete() && this.onComplete) {
      this.onComplete(this.getCode());
    }
  }

  /**
   * Update verify button enabled/disabled state
   * @private
   */
  _updateButtonState() {
    if (this.button) {
      this.button.disabled = !this.isComplete();
    }
  }

  /**
   * Check if all inputs are filled
   * @returns {boolean} True if all 6 digits are entered
   */
  isComplete() {
    return this.inputs.every(input => input.value.length === 1);
  }

  /**
   * Get the complete 6-digit code
   * @returns {string} The 6-digit code
   */
  getCode() {
    return this.inputs.map(input => input.value).join('');
  }

  /**
   * Clear all inputs
   */
  clear() {
    this.inputs.forEach(input => {
      input.value = '';
    });
    this.inputs[0].focus();
    this._updateButtonState();
  }

  /**
   * Set error state on all inputs
   * @param {boolean} error - True to show error state, false to clear
   */
  setError(error) {
    this.inputs.forEach(input => {
      if (error) {
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
  }

  /**
   * Disable all inputs
   * @param {boolean} disabled - True to disable, false to enable
   */
  setDisabled(disabled) {
    this.inputs.forEach(input => {
      input.disabled = disabled;
    });
    if (this.button) {
      this.button.disabled = disabled || !this.isComplete();
    }
  }

  /**
   * Focus the first input
   */
  focus() {
    this.inputs[0].focus();
  }
}

// Export for module usage (if using ES6 modules)
// export default VerificationCodeInput;
