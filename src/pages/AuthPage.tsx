import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { FiArrowLeft, FiCheckCircle, FiEye, FiEyeOff, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../auth/AuthProvider';
import { AuthApiError, requestPasswordReset, resendVerification, resetPassword, signUp, verifyEmail } from '../auth/authApi';

type Route = 'signin' | 'signup' | 'forgot-password' | 'reset-password' | 'verify-email' | 'account';
type Fields = Record<string, string>;

function ErrorMessage({ error }: { error: unknown }) {
  if (!error) return null;
  const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
  const details = error instanceof AuthApiError ? error.details : [];
  return <div className="auth-alert auth-alert-error" role="alert"><strong>{message}</strong>{details.length > 0 && <ul>{details.map((item, index) => <li key={`${item.field}-${index}`}>{item.field ? `${item.field}: ` : ''}{item.message}</li>)}</ul>}</div>;
}

function Field({ label, name, value, onChange, type = 'text', required = true, autoComplete, hint }: { label: string; name: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; autoComplete?: string; hint?: string }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  return <label className="auth-field"><span>{label}</span><div className="auth-input-wrap"><input name={name} value={value} onChange={event => onChange(event.target.value)} type={isPassword && visible ? 'text' : type} required={required} autoComplete={autoComplete} />{isPassword && <button className="auth-password-toggle" type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <FiEyeOff /> : <FiEye />}</button>}</div>{hint && <small>{hint}</small>}</label>;
}

function AuthShell({ children, title, subtitle, mode }: { children: ReactNode; title: string; subtitle: string; mode: 'member' | 'student' }) {
  return <main className="auth-page"><a href="/#Home" className="auth-logo"><img src="/icon-3.png" alt="AWS Student Builders Group" /></a><div className="auth-shell"><aside className="auth-aside"><span className="auth-eyebrow"><span /> AWS STUDENT BUILDERS GROUP</span><h1>{mode === 'member' ? <>Build your<br /><em>cloud future.</em></> : <>Your next step<br /><em>starts here.</em></>}</h1><p>{mode === 'member' ? 'A community for curious minds ready to learn, build, and grow with AWS.' : 'Create your student account to join the AWS builders community at the University of Ilorin.'}</p><div className="auth-aside-image" role="img" aria-label="Students learning together" /><div className="auth-aside-footer">Learn together. Build together. Grow together.</div></aside><section className="auth-panel"><a className="auth-back" href="/#Home"><FiArrowLeft /> Back to website</a><div className="auth-form-content"><div className="auth-form-icon"><FiUser /></div><p className="auth-kicker">{mode === 'member' ? 'MEMBER ACCESS' : 'STUDENT COMMUNITY'}</p><h2>{title}</h2><p className="auth-subtitle">{subtitle}</p>{children}</div><p className="auth-privacy"><FiLock /> Your account details are securely protected.</p></section></div><footer className="auth-copyright">© {new Date().getFullYear()} AWS Student Builders Group, University of Ilorin</footer></main>;
}

export default function AuthPage({ route }: { route: Route }) {
  const { user, signIn, signOut, loading } = useAuth();
  const [fields, setFields] = useState<Fields>({ fullName: '', email: '', password: '', department: '', matricNumber: '', level: '100', courseOfStudy: '', newPassword: '' });
  const [error, setError] = useState<unknown>(null);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [verificationBusy, setVerificationBusy] = useState(true);
  const set = (name: string) => (value: string) => setFields(previous => ({ ...previous, [name]: value }));
  const token = new URLSearchParams(window.location.search).get('token') || new URLSearchParams(window.location.hash.split('?')[1] || '').get('token') || '';

  useEffect(() => {
    if (route !== 'verify-email') return;
    verifyEmail(token).then(message => { setVerified(true); setNotice(message || 'Your email is verified. You can now sign in.'); }).catch(setError).finally(() => setVerificationBusy(false));
  }, [route, token]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>, action: () => Promise<void>) {
    event.preventDefault(); setBusy(true); setError(null); setNotice('');
    try { await action(); } catch (caught) { setError(caught); } finally { setBusy(false); }
  }

  if (route === 'verify-email') return <AuthShell mode="member" title={verificationBusy ? 'Checking your link…' : verified ? 'Email verified' : 'Verification link issue'} subtitle={verificationBusy ? 'Please give us a moment to confirm your email address.' : notice || 'This link may have expired. You can request another from the sign-in page.'}><ErrorMessage error={error} />{!verificationBusy && <div className={`auth-alert ${verified ? 'auth-alert-success' : 'auth-alert-error'}`} role="status">{verified ? <FiCheckCircle /> : null}{notice || 'This verification link is invalid or has expired.'}</div>}<a className="auth-submit auth-submit-link" href="#/signin">Continue to sign in <span>→</span></a></AuthShell>;

  if (route === 'account') {
    if (loading) return <AuthShell mode="member" title="Loading your account" subtitle="Checking your secure session."><div className="auth-loading" /></AuthShell>;
    if (!user) return <AuthShell mode="member" title="Sign in to continue" subtitle="Your account session has ended. Sign in to view your profile."><a className="auth-submit auth-submit-link" href="#/signin">Sign in <span>→</span></a></AuthShell>;
    return <AuthShell mode="member" title={`Welcome, ${user.fullName.split(' ')[0]}`} subtitle="Your AWS Student Builders Group account."><div className="auth-profile"><div className="auth-avatar">{user.fullName.split(' ').map(name => name[0]).slice(0, 2).join('').toUpperCase()}</div><h3>{user.fullName}</h3><p>{user.email}</p><dl><div><dt>Department</dt><dd>{user.department}</dd></div><div><dt>Course of study</dt><dd>{user.courseOfStudy}</dd></div><div><dt>Matric number</dt><dd>{user.matricNumber}</dd></div><div><dt>Level</dt><dd>{user.level} level</dd></div></dl><p className={user.isVerified ? 'auth-verified' : 'auth-unverified'}>{user.isVerified ? 'Email verified' : 'Email verification pending'}</p><button className="auth-submit auth-secondary-submit" onClick={() => void signOut().finally(() => { window.location.hash = '#/signin'; })}>Sign out</button></div></AuthShell>;
  }

  if (route === 'forgot-password') return <AuthShell mode="member" title="Reset your password" subtitle="Enter the email linked to your account and we’ll send a reset link."><form className="auth-form" onSubmit={event => handleSubmit(event, async () => { const message = await requestPasswordReset(fields.email); setNotice(message || 'If an account with that email exists, a reset link has been sent.'); })}><ErrorMessage error={error} />{notice && <div className="auth-alert auth-alert-success" role="status">{notice}</div>}<Field label="Email address" name="email" value={fields.email} onChange={set('email')} type="email" autoComplete="email" /><button className="auth-submit" disabled={busy}>{busy ? 'Sending link…' : 'Send reset link'} <span>→</span></button></form><p className="auth-switch"><a href="#/signin">Back to sign in</a></p></AuthShell>;

  if (route === 'reset-password') return <AuthShell mode="member" title="Choose a new password" subtitle="Make it strong and different from your other passwords."><form className="auth-form" onSubmit={event => handleSubmit(event, async () => { const message = await resetPassword(token, fields.newPassword); setNotice(message || 'Password updated. You can now sign in.'); })}><ErrorMessage error={error} />{notice && <div className="auth-alert auth-alert-success" role="status">{notice}</div>}{!token && <div className="auth-alert auth-alert-error">This reset link is missing its token. Please request another one.</div>}<Field label="New password" name="newPassword" value={fields.newPassword} onChange={set('newPassword')} type="password" autoComplete="new-password" hint="8+ characters with uppercase, lowercase, a number, and a symbol." /><button className="auth-submit" disabled={busy || !token}>{busy ? 'Updating…' : 'Update password'} <span>→</span></button></form><p className="auth-switch">Remembered it? <a href="#/signin">Sign in</a></p></AuthShell>;

  if (route === 'signup') return <AuthShell mode="student" title="Create your account" subtitle="Use your student details to get started."><form className="auth-form auth-form-signup" onSubmit={event => handleSubmit(event, async () => { await signUp({ fullName: fields.fullName, email: fields.email, password: fields.password, department: fields.department, matricNumber: fields.matricNumber, level: fields.level, courseOfStudy: fields.courseOfStudy }); setNotice('Account created. Check your email for a verification link before signing in.'); })}><ErrorMessage error={error} />{notice && <div className="auth-alert auth-alert-success" role="status">{notice}<button type="button" className="auth-inline-button" onClick={async () => { setBusy(true); setError(null); try { const message = await resendVerification(fields.email); setNotice(message || 'If an unverified account exists, a new link has been sent.'); } catch (caught) { setError(caught); } finally { setBusy(false); } }}>Resend verification email</button></div>}<Field label="Full name" name="fullName" value={fields.fullName} onChange={set('fullName')} autoComplete="name" /><Field label="Email address" name="email" value={fields.email} onChange={set('email')} type="email" autoComplete="email" /><Field label="Password" name="password" value={fields.password} onChange={set('password')} type="password" autoComplete="new-password" hint="8+ characters, uppercase, lowercase, number, and symbol." /><div className="auth-field-row"><Field label="Department" name="department" value={fields.department} onChange={set('department')} /><Field label="Matric number" name="matricNumber" value={fields.matricNumber} onChange={set('matricNumber')} /></div><div className="auth-field-row"><label className="auth-field"><span>Level</span><select value={fields.level} onChange={event => set('level')(event.target.value)}>{['100', '200', '300', '400', '500'].map(level => <option key={level} value={level}>{level} level</option>)}</select></label><Field label="Course of study" name="courseOfStudy" value={fields.courseOfStudy} onChange={set('courseOfStudy')} /></div><button className="auth-submit" disabled={busy}>{busy ? 'Creating account…' : 'Create account'} <span>→</span></button></form><p className="auth-switch">Already have an account? <a href="#/signin">Sign in</a></p></AuthShell>;

  return <AuthShell mode="member" title="Welcome back" subtitle="Sign in to pick up where your cloud journey left off."><form className="auth-form" onSubmit={event => handleSubmit(event, async () => { await signIn(fields.email, fields.password); window.location.hash = '#/account'; })}><ErrorMessage error={error} />{notice && <div className="auth-alert auth-alert-success" role="status">{notice}</div>}<Field label="Email address" name="email" value={fields.email} onChange={set('email')} type="email" autoComplete="email" /><Field label="Password" name="password" value={fields.password} onChange={set('password')} type="password" autoComplete="current-password" /><div className="auth-form-options"><label><input type="checkbox" /> Remember me</label><a href="#/forgot-password">Forgot password?</a></div><button className="auth-submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <span>→</span></button></form><p className="auth-switch">New to the community? <a href="#/signup">Create an account</a></p>{error instanceof AuthApiError && error.code === 'EMAIL_NOT_VERIFIED' && <button className="auth-resend" onClick={async () => { setBusy(true); setError(null); try { const message = await resendVerification(fields.email); setNotice(message || 'If an unverified account exists, a new link has been sent.'); } catch (caught) { setError(caught); } finally { setBusy(false); } }}>Resend verification email</button>}</AuthShell>;
}
