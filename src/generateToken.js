const crypto = require('crypto');

// Generate a random token key (32 bytes or 256 bits)
const tokenKey = crypto.randomBytes(32).toString('hex');

console.log(tokenKey);
