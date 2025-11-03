/**
 * JADE Session Management
 * Centralized session key definitions and typed accessors
 * Prevents typos and provides consistent access to session data
 */

'use strict';

// Session key constants - single source of truth
const SESSION_KEYS = {
  // Authentication
  AUTH_EMAIL: 'authEmail',
  USER_EMAIL: 'userEmail',
  IS_AUTHENTICATED: 'isAuthenticated',
  AUTH_METHOD: 'authMethod',
  LOGIN_TIME: 'loginTime',

  // User State
  IS_NEW_USER: 'isNewUser',
  USER_NAME: 'userName',

  // Auth Flow
  AUTH_METHODS: 'authMethods',
  PENDING_MAGIC_LINK: 'pendingMagicLink',

  // Subscription
  SUBSCRIPTION_PLAN: 'subscriptionPlan',
  BILLING_PERIOD: 'billingPeriod',
  SUBSCRIPTION_PRICE: 'subscriptionPrice',

  // Onboarding
  ONBOARDING_DATA: 'onboardingData',
  ONBOARDING_COMPLETE: 'onboardingComplete',
  PROFILE_SETUP_COMPLETE: 'profileSetupComplete',

  // Toast Messages
  SHOW_TOAST: 'showToast'
};

/**
 * Type-safe session manager
 * Provides consistent, typed access to session storage
 */
const SessionManager = {
  // ===== Authentication =====

  getAuthEmail() {
    return getSession(SESSION_KEYS.AUTH_EMAIL);
  },

  setAuthEmail(email) {
    setSession(SESSION_KEYS.AUTH_EMAIL, email);
  },

  getUserEmail() {
    return getSession(SESSION_KEYS.USER_EMAIL);
  },

  setUserEmail(email) {
    setSession(SESSION_KEYS.USER_EMAIL, email);
  },

  isAuthenticated() {
    return getSession(SESSION_KEYS.IS_AUTHENTICATED) === true;
  },

  setAuthenticated(value) {
    setSession(SESSION_KEYS.IS_AUTHENTICATED, value);
  },

  getAuthMethod() {
    return getSession(SESSION_KEYS.AUTH_METHOD);
  },

  setAuthMethod(method) {
    setSession(SESSION_KEYS.AUTH_METHOD, method);
  },

  getLoginTime() {
    return getSession(SESSION_KEYS.LOGIN_TIME);
  },

  setLoginTime(time) {
    setSession(SESSION_KEYS.LOGIN_TIME, time);
  },

  // ===== User State =====

  isNewUser() {
    return getSession(SESSION_KEYS.IS_NEW_USER) === true;
  },

  setNewUser(value) {
    setSession(SESSION_KEYS.IS_NEW_USER, value);
  },

  getUserName() {
    return getSession(SESSION_KEYS.USER_NAME);
  },

  setUserName(name) {
    setSession(SESSION_KEYS.USER_NAME, name);
  },

  // ===== Auth Methods =====

  getAuthMethods() {
    return getSession(SESSION_KEYS.AUTH_METHODS);
  },

  setAuthMethods(methods) {
    setSession(SESSION_KEYS.AUTH_METHODS, methods);
  },

  // ===== Magic Link =====

  getPendingMagicLink() {
    return getSession(SESSION_KEYS.PENDING_MAGIC_LINK);
  },

  setPendingMagicLink(data) {
    setSession(SESSION_KEYS.PENDING_MAGIC_LINK, data);
  },

  // ===== Subscription =====

  getSubscriptionPlan() {
    return getSession(SESSION_KEYS.SUBSCRIPTION_PLAN);
  },

  setSubscriptionPlan(plan) {
    setSession(SESSION_KEYS.SUBSCRIPTION_PLAN, plan);
  },

  getBillingPeriod() {
    return getSession(SESSION_KEYS.BILLING_PERIOD);
  },

  setBillingPeriod(period) {
    setSession(SESSION_KEYS.BILLING_PERIOD, period);
  },

  getSubscriptionPrice() {
    return getSession(SESSION_KEYS.SUBSCRIPTION_PRICE);
  },

  setSubscriptionPrice(price) {
    setSession(SESSION_KEYS.SUBSCRIPTION_PRICE, price);
  },

  // ===== Onboarding =====

  getOnboardingData(key) {
    const data = getSession(SESSION_KEYS.ONBOARDING_DATA);
    return key && data ? data[key] : data;
  },

  setOnboardingData(data) {
    const existing = SessionManager.getOnboardingData() || {};
    setSession(SESSION_KEYS.ONBOARDING_DATA, { ...existing, ...data });
  },

  isOnboardingComplete() {
    return getSession(SESSION_KEYS.ONBOARDING_COMPLETE) === true;
  },

  setOnboardingComplete(value) {
    setSession(SESSION_KEYS.ONBOARDING_COMPLETE, value);
  },

  isProfileSetupComplete() {
    return getSession(SESSION_KEYS.PROFILE_SETUP_COMPLETE) === true;
  },

  setProfileSetupComplete(value) {
    setSession(SESSION_KEYS.PROFILE_SETUP_COMPLETE, value);
  },

  // ===== Toast Messages =====

  getToastMessage() {
    return getSession(SESSION_KEYS.SHOW_TOAST);
  },

  setToastMessage(message, type = 'success') {
    setSession(SESSION_KEYS.SHOW_TOAST, { message, type });
  },

  clearToastMessage() {
    clearSession(SESSION_KEYS.SHOW_TOAST);
  },

  // ===== Utilities =====

  /**
   * Clear all session data
   */
  clearAll() {
    sessionStorage.clear();
  },

  /**
   * Clear authentication data
   */
  clearAuth() {
    clearSession(SESSION_KEYS.AUTH_EMAIL);
    clearSession(SESSION_KEYS.USER_EMAIL);
    clearSession(SESSION_KEYS.IS_AUTHENTICATED);
    clearSession(SESSION_KEYS.AUTH_METHOD);
    clearSession(SESSION_KEYS.LOGIN_TIME);
    clearSession(SESSION_KEYS.IS_NEW_USER);
    clearSession(SESSION_KEYS.AUTH_METHODS);
    clearSession(SESSION_KEYS.PENDING_MAGIC_LINK);
  },

  /**
   * Clear onboarding data
   */
  clearOnboarding() {
    clearSession(SESSION_KEYS.ONBOARDING_DATA);
    clearSession(SESSION_KEYS.ONBOARDING_COMPLETE);
  },

  /**
   * Get all session keys (for debugging)
   */
  getAllKeys() {
    return SESSION_KEYS;
  },

  /**
   * Debug: print all session data
   */
  debugPrint() {
    console.group('Session Data');
    Object.entries(SESSION_KEYS).forEach(([name, key]) => {
      const value = getSession(key);
      if (value !== null) {
        console.log(`${name} (${key}):`, value);
      }
    });
    console.groupEnd();
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SESSION_KEYS,
    SessionManager
  };
}
