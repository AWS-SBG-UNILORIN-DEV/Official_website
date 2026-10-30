import nodemailer from 'nodemailer';
import { config } from './config.js';

const transport = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  connectionTimeout: config.smtp.connectionTimeoutMs,
  greetingTimeout: config.smtp.greetingTimeoutMs,
  socketTimeout: config.smtp.socketTimeoutMs,
  requireTLS: config.smtp.requireTls,
  disableFileAccess: true,
  disableUrlAccess: true,
  auth: config.smtp.user
    ? { user: config.smtp.user, pass: config.smtp.password }
    : undefined,
});

async function send({ to, subject, text }) {
  await transport.sendMail({ from: config.smtp.from, to, subject, text });
}

export function sendVerificationEmail(email, token) {
  const link = new URL('/verify-email', config.publicAppUrl);
  link.searchParams.set('token', token);
  return send({
    to: email,
    subject: 'Verify your AWS Student Builders Group account',
    text: `Verify your email within 24 hours by opening this link: ${link}`,
  });
}

export function sendPasswordResetEmail(email, token) {
  const link = new URL('/reset-password', config.publicAppUrl);
  link.searchParams.set('token', token);
  return send({
    to: email,
    subject: 'Reset your AWS Student Builders Group password',
    text: `Reset your password within one hour by opening this link: ${link}`,
  });
}
