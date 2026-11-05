import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ResourcesPage from './pages/ResourcesPage';
import CertificationsPage from './pages/CertificationsPage';
import { AuthProvider } from './auth/AuthProvider';
import AuthPage from './pages/AuthPage';
import './auth/auth.css';
import './index.css';

const AppRoutes = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      if (window.location.hash.startsWith('#/')) window.scrollTo({ top: 0, behavior: 'instant' });
      if (
        window.location.hash.startsWith('#/resources') ||
        window.location.hash.startsWith('#/hall-of-certifications') ||
        window.location.hash.startsWith('#/certifications')
      ) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const authPath = pathname === '/verify-email' || pathname === '/reset-password' || pathname === '/auth/callback'
    ? pathname.slice(1)
    : currentHash.startsWith('#/') ? currentHash.slice(2).split('?')[0] : '';

  if (['signin', 'signup', 'forgot-password', 'reset-password', 'verify-email', 'auth/callback', 'complete-profile', 'account'].includes(authPath)) {
    return <AuthPage route={authPath as 'signin' | 'signup' | 'forgot-password' | 'reset-password' | 'verify-email' | 'auth/callback' | 'complete-profile' | 'account'} />;
  }

  if (currentHash.startsWith('#/resources')) return <ResourcesPage />;
  if (currentHash.startsWith('#/hall-of-certifications') || currentHash.startsWith('#/certifications')) return <CertificationsPage />;
  return <Home />;
};

export default function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>;
}
