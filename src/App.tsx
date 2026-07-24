import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ResourcesPage from './pages/ResourcesPage';
import CertificationsPage from './pages/CertificationsPage';
import './index.css';

const App = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Smooth scroll to top when page changes, or to anchor if present
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

  if (currentHash.startsWith('#/resources')) {
    return <ResourcesPage />;
  }

  if (
    currentHash.startsWith('#/hall-of-certifications') ||
    currentHash.startsWith('#/certifications')
  ) {
    return <CertificationsPage />;
  }

  return <Home />;
};

export default App;
