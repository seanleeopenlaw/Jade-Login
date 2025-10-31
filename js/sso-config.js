/**
 * SSO Domain Configuration
 * Maps email domains to available SSO providers
 */

'use strict';

// SSO Provider Configurations
const SSO_DOMAINS = {
  // Google Workspace domains (example)
  'google.com': {
    providers: ['google'],
    displayName: 'Google',
    logo: 'https://www.google.com/favicon.ico'
  },

  // Microsoft domains (example)
  'microsoft.com': {
    providers: ['microsoft'],
    displayName: 'Microsoft',
    logo: 'https://www.microsoft.com/favicon.ico'
  },

  // Example multi-provider organization
  'openlaw.io': {
    providers: ['google', 'microsoft'],
    displayName: 'OpenLaw',
    logo: null
  },

  // Demo organization domain (for prototype)
  'organisation.com': {
    providers: ['google', 'microsoft'],
    displayName: 'Your Organization',
    logo: null
  },

  // Add more domains as needed
  // Format:
  // 'company-domain.com': {
  //   providers: ['google', 'microsoft'],
  //   displayName: 'Company Name',
  //   logo: 'https://company.com/logo.png' (optional)
  // }
};

// Free email providers (no SSO available)
const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'icloud.com',
  'protonmail.com',
  'aol.com',
  'mail.com',
  'zoho.com'
];

/**
 * Detect SSO availability for an email address
 * @param {string} email - User's email address
 * @returns {object|null} SSO configuration or null if not available
 */
function detectSSO(email) {
  if (!email || typeof email !== 'string') {
    return null;
  }

  const domain = email.toLowerCase().split('@')[1];

  if (!domain) {
    return null;
  }

  // Check if domain is a free email provider
  if (FREE_EMAIL_DOMAINS.includes(domain)) {
    return null;
  }

  // Check if domain has SSO configured
  return SSO_DOMAINS[domain] || null;
}

/**
 * Get available auth methods for an email
 * @param {string} email - User's email address
 * @returns {object} Available authentication methods
 */
function getAuthMethods(email) {
  const ssoConfig = detectSSO(email);

  return {
    email: email,
    sso: ssoConfig,
    magicLink: true, // Always available as fallback
    hasSSO: ssoConfig !== null,
    providers: ssoConfig ? ssoConfig.providers : []
  };
}

/**
 * Check if an email domain is allowed (basic validation)
 * @param {string} email - User's email address
 * @returns {boolean} True if domain is valid
 */
function isValidDomain(email) {
  const domain = email.toLowerCase().split('@')[1];

  // Block obviously fake domains
  const blockedDomains = ['test.com', 'example.com', 'fake.com'];

  return domain && !blockedDomains.includes(domain);
}

/**
 * Get SSO provider display name
 * @param {string} provider - Provider key ('google', 'microsoft')
 * @returns {string} Display name
 */
function getProviderDisplayName(provider) {
  const names = {
    google: 'Google',
    microsoft: 'Microsoft'
  };

  return names[provider] || provider;
}

/**
 * Add a new SSO domain configuration (for admin/testing)
 * @param {string} domain - Email domain
 * @param {object} config - SSO configuration
 */
function addSSODomain(domain, config) {
  SSO_DOMAINS[domain.toLowerCase()] = config;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    detectSSO,
    getAuthMethods,
    isValidDomain,
    getProviderDisplayName,
    addSSODomain,
    SSO_DOMAINS,
    FREE_EMAIL_DOMAINS
  };
}
