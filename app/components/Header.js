'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(userData.isLoggedIn);
      setUserName(userData.fullName || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header className="header">
      {/* Top Banner */}
      <div className="header-top">
        <div className="header-top-content">
          <h1 className="header-title">AI-TriageMD</h1>
          <p className="header-subtitle">Intelligent Healthcare Triage System powered by Advanced AI</p>
          <div className="header-tagline">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Rapid Analysis
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Priority-Based Care
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Clinical Decision Support
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span>ABHASH</span>
        </Link>

        <div className="nav-actions">
          <div className="language-select">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>English</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>

          <Link href="/intake" className={`nav-link ${pathname === '/intake' ? 'active' : ''}`}>
            Patient Intake
          </Link>

          <Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>

          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-name">{userName}</span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="btn btn-primary" style={{ padding: '10px 24px' }}>
              Get Started
            </Link>
          )}

          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link href="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/intake" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Patient Intake</Link>
          <Link href="/imaging" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Medical Imaging</Link>
          <Link href="/dashboard" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          <Link href="/auth" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Login / Sign Up</Link>
        </div>
      )}
    </header>
  );
}
