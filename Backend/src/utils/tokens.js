import { createHash, randomBytes } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export function hashOpaqueToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export function createOpaqueToken() {
  return randomBytes(32).toString('base64url');
}

export function createAccessToken(studentId) {
  return jwt.sign({}, config.accessTokenSecret, {
    algorithm: 'HS256',
    subject: studentId,
    issuer: config.accessTokenIssuer,
    audience: config.accessTokenAudience,
    expiresIn: config.accessTokenTtlSeconds,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.accessTokenSecret, {
    algorithms: ['HS256'],
    issuer: config.accessTokenIssuer,
    audience: config.accessTokenAudience,
  });
}
