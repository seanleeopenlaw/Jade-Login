/**
 * Magic Link Authentication Utilities
 * Handles token generation, verification, and magic link email simulation
 */

'use strict';

// Token expiry time (15 minutes)
const TOKEN_EXPIRY_MS = 15 * 60 * 1000;

// Rate limiting: max magic links per email per hour
const MAX_LINKS_PER_HOUR = 3;

// Storage keys
const STORAGE_KEYS = {
  TOKENS: 'magicLinkTokens',
  RATE_LIMIT: 'magicLinkRateLimit'
};

/**
 * Generate a secure random token
 * @returns {string} Base64 encoded token
 */
function generateSecureToken() {
  // In production, use crypto.randomBytes or backend generation
  // For demo, we'll use a combination of timestamp + random
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const randomPart2 = Math.random().toString(36).substring(2, 15);

  return btoa(`${timestamp}-${randomPart}-${randomPart2}`);
}

/**
 * Create a magic link token for an email
 * @param {string} email - User's email address
 * @returns {object} Token data or error
 */
function createMagicLinkToken(email) {
  if (!email || typeof email !== 'string') {
    return { error: 'Invalid email address' };
  }

  // Check rate limiting
  const rateLimitCheck = checkRateLimit(email);
  if (!rateLimitCheck.allowed) {
    return {
      error: `Too many requests. Please wait ${rateLimitCheck.waitMinutes} minutes before requesting another link.`
    };
  }

  const token = generateSecureToken();
  const now = Date.now();

  const tokenData = {
    email: email.toLowerCase(),
    token: token,
    createdAt: now,
    expiresAt: now + TOKEN_EXPIRY_MS,
    used: false,
    ip: 'simulated', // In production, capture real IP
    userAgent: navigator.userAgent
  };

  // Store token
  saveToken(tokenData);

  // Update rate limit
  updateRateLimit(email);

  return {
    success: true,
    token: token,
    email: email,
    expiresAt: tokenData.expiresAt,
    magicLink: generateMagicLinkURL(email, token)
  };
}

/**
 * Verify a magic link token
 * @param {string} email - User's email
 * @param {string} token - Token to verify
 * @returns {object} Verification result
 */
function verifyMagicLinkToken(email, token) {
  const tokens = getAllTokens();
  const tokenData = tokens.find(t =>
    t.email === email.toLowerCase() &&
    t.token === token
  );

  // Token not found
  if (!tokenData) {
    return {
      valid: false,
      error: 'Invalid sign-in link. Please request a new one.'
    };
  }

  // Token already used
  if (tokenData.used) {
    return {
      valid: false,
      error: 'This sign-in link has already been used. Please request a new one.'
    };
  }

  // Token expired
  if (Date.now() > tokenData.expiresAt) {
    return {
      valid: false,
      error: 'This sign-in link has expired. Please request a new one.',
      expired: true
    };
  }

  // Mark token as used
  tokenData.used = true;
  tokenData.usedAt = Date.now();
  saveToken(tokenData, true); // Update existing token

  return {
    valid: true,
    email: tokenData.email,
    createdAt: tokenData.createdAt
  };
}

/**
 * Generate magic link URL
 * @param {string} email - User's email
 * @param {string} token - Token
 * @returns {string} Full magic link URL
 */
function generateMagicLinkURL(email, token) {
  const baseURL = window.location.origin;
  const params = new URLSearchParams({
    token: token,
    email: encodeURIComponent(email)
  });

  return `${baseURL}/auth/verify.html?${params.toString()}`;
}

/**
 * Save token to storage
 * @param {object} tokenData - Token data object
 * @param {boolean} update - Whether to update existing token
 */
function saveToken(tokenData, update = false) {
  let tokens = getAllTokens();

  if (update) {
    // Update existing token
    tokens = tokens.map(t =>
      t.email === tokenData.email && t.token === tokenData.token
        ? tokenData
        : t
    );
  } else {
    // Add new token
    tokens.push(tokenData);
  }

  // Clean up old/expired tokens (keep last 10 per email)
  tokens = cleanupOldTokens(tokens);

  localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));
}

/**
 * Get all tokens from storage
 * @returns {array} Array of token objects
 */
function getAllTokens() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TOKENS);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error parsing tokens:', e);
    return [];
  }
}

/**
 * Clean up old and expired tokens
 * @param {array} tokens - Array of tokens
 * @returns {array} Cleaned token array
 */
function cleanupOldTokens(tokens) {
  const now = Date.now();

  // Remove expired tokens (older than 1 hour)
  const oneHourAgo = now - (60 * 60 * 1000);
  const activeTokens = tokens.filter(t => t.createdAt > oneHourAgo);

  // Keep max 10 tokens per email
  const emailGroups = {};
  activeTokens.forEach(token => {
    if (!emailGroups[token.email]) {
      emailGroups[token.email] = [];
    }
    emailGroups[token.email].push(token);
  });

  const cleanedTokens = [];
  Object.values(emailGroups).forEach(group => {
    // Sort by createdAt descending, keep latest 10
    const sorted = group.sort((a, b) => b.createdAt - a.createdAt);
    cleanedTokens.push(...sorted.slice(0, 10));
  });

  return cleanedTokens;
}

/**
 * Check rate limiting for an email
 * @param {string} email - User's email
 * @returns {object} Rate limit status
 */
function checkRateLimit(email) {
  const rateLimits = getRateLimits();
  const emailKey = email.toLowerCase();
  const now = Date.now();
  const oneHourAgo = now - (60 * 60 * 1000);

  if (!rateLimits[emailKey]) {
    return { allowed: true };
  }

  // Filter requests in last hour
  const recentRequests = rateLimits[emailKey].filter(time => time > oneHourAgo);

  if (recentRequests.length >= MAX_LINKS_PER_HOUR) {
    const oldestRequest = Math.min(...recentRequests);
    const waitTime = oldestRequest + (60 * 60 * 1000) - now;
    const waitMinutes = Math.ceil(waitTime / (60 * 1000));

    return {
      allowed: false,
      waitMinutes: waitMinutes
    };
  }

  return { allowed: true };
}

/**
 * Update rate limit for an email
 * @param {string} email - User's email
 */
function updateRateLimit(email) {
  const rateLimits = getRateLimits();
  const emailKey = email.toLowerCase();
  const now = Date.now();

  if (!rateLimits[emailKey]) {
    rateLimits[emailKey] = [];
  }

  rateLimits[emailKey].push(now);

  // Clean up old entries (older than 1 hour)
  const oneHourAgo = now - (60 * 60 * 1000);
  rateLimits[emailKey] = rateLimits[emailKey].filter(time => time > oneHourAgo);

  localStorage.setItem(STORAGE_KEYS.RATE_LIMIT, JSON.stringify(rateLimits));
}

/**
 * Get rate limits from storage
 * @returns {object} Rate limit data
 */
function getRateLimits() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RATE_LIMIT);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('Error parsing rate limits:', e);
    return {};
  }
}

/**
 * Simulate sending magic link email
 * @param {string} email - User's email
 * @param {string} magicLink - Magic link URL
 * @returns {Promise} Resolves when "email sent"
 */
async function sendMagicLinkEmail(email, magicLink) {
  // In production, this would call your email API (SendGrid, AWS SES, etc.)
  // For demo, we'll simulate a delay and log the link

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('='.repeat(60));
      console.log('📧 MAGIC LINK EMAIL (Demo Mode)');
      console.log('='.repeat(60));
      console.log(`To: ${email}`);
      console.log(`Subject: Your JADE sign-in link`);
      console.log('');
      console.log('Click the link below to sign in to JADE:');
      console.log('');
      console.log(`🔗 ${magicLink}`);
      console.log('');
      console.log('This link will expire in 15 minutes.');
      console.log('='.repeat(60));

      resolve({ success: true });
    }, 500);
  });
}

/**
 * Get token expiry time in minutes
 * @returns {number} Expiry time in minutes
 */
function getTokenExpiryMinutes() {
  return TOKEN_EXPIRY_MS / (60 * 1000);
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createMagicLinkToken,
    verifyMagicLinkToken,
    sendMagicLinkEmail,
    getTokenExpiryMinutes,
    generateMagicLinkURL
  };
}
