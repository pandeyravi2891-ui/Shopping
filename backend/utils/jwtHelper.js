const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token with a 1 hour expiry.
 * @param {Object} payload - Payload to encode (e.g., { userId, email })
 * @returns {string} Signed JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };
