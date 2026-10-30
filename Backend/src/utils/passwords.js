import { randomBytes } from 'node:crypto';
import bcrypt from 'bcrypt';
import { config } from '../config.js';

let dummyPasswordHashPromise;

export function hashPassword(password) {
  return bcrypt.hash(password, config.bcryptSaltRounds);
}

export async function verifyPassword(password, passwordHash) {
  if (!passwordHash) {
    dummyPasswordHashPromise ??= hashPassword(randomBytes(32).toString('base64url'));
    passwordHash = await dummyPasswordHashPromise;
  }
  return bcrypt.compare(password, passwordHash);
}
