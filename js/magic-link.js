/**
 * JADE Magic Link Authentication
 * Simple magic link system for prototype
 */

'use strict';

const STORAGE_KEYS = {
  TOKENS: 'magicLinkTokens'
};

/**
 * Generate a simple token for demo
 */
function generateToken() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 15);
  return btoa(`${timestamp}-${randomString}`);
}

/**
 * Create a magic link token
 */
function createMagicLinkToken(email) {
  if (!email || typeof email !== 'string') {
    return { error: 'Invalid email address' };
  }

  const token = generateToken();
  const now = Date.now();
  const expiresAt = now + (15 * 60 * 1000); // 15 minutes

  const tokenData = {
    email: email.toLowerCase(),
    token,
    createdAt: now,
    expiresAt,
    used: false
  };

  // Save token
  saveToken(tokenData);

  // Create magic link
  const baseURL = window.location.origin;
  const magicLink = `${baseURL}/auth/verify.html?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

  return {
    success: true,
    token,
    email,
    magicLink,
    expiresAt
  };
}

/**
 * Save token to session storage
 */
function saveToken(tokenData) {
  const tokens = getAllTokens();

  // Update existing token or add new one
  const existingIndex = tokens.findIndex(t => t.email === tokenData.email);

  if (existingIndex !== -1) {
    tokens[existingIndex] = tokenData;
  } else {
    tokens.push(tokenData);
  }

  sessionStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));
}

/**
 * Get all tokens
 */
function getAllTokens() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.TOKENS);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error parsing tokens:', e);
    return [];
  }
}

/**
 * Verify magic link token
 */
function verifyMagicLinkToken(email, token) {
  const tokens = getAllTokens();
  const tokenData = tokens.find(t => t.email === email.toLowerCase() && t.token === token);

  if (!tokenData) {
    return {
      valid: false,
      error: 'Invalid sign-in link. Please request a new one.'
    };
  }

  // Check if expired
  if (Date.now() > tokenData.expiresAt) {
    return {
      valid: false,
      error: 'This sign-in link has expired. Please request a new one.'
    };
  }

  // Check if already used
  if (tokenData.used) {
    return {
      valid: false,
      error: 'This sign-in link has already been used. Please request a new one.'
    };
  }

  // Mark as used
  tokenData.used = true;
  saveToken(tokenData);

  return {
    valid: true,
    email: tokenData.email
  };
}

/**
 * Simulate sending magic link email (for demo)
 */
async function sendMagicLinkEmail(email, magicLink) {
  // In a real app, this would call an API to send email
  console.log('='.repeat(60));
  console.log('📧 MAGIC LINK EMAIL (Demo Mode)');
  console.log('='.repeat(60));
  console.log(`To: ${email}`);
  console.log(`🔗 ${magicLink}`);
  console.log('This link will expire in 15 minutes.');
  console.log('='.repeat(60));

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return { success: true };
}
