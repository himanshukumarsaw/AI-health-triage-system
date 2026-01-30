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
    <header className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 shadow-xl">
      {/* Navigation */}
      <nav className="bg-emerald-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl hover:text-emerald-100 transition-colors">
            <div className="bg-white rounded-lg p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span>ABHASH</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-white cursor-pointer hover:text-emerald-100 transition-colors">
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

            <Link href="/" className={`text-white hover:text-emerald-100 transition-colors font-medium ${pathname === '/' ? 'border-b-2 border-white' : ''}`}>
              Home
            </Link>

            <Link href="/intake" className={`text-white hover:text-emerald-100 transition-colors font-medium ${pathname === '/intake' ? 'border-b-2 border-white' : ''}`}>
              Patient Intake
            </Link>

            <Link href="/dashboard" className={`text-white hover:text-emerald-100 transition-colors font-medium ${pathname === '/dashboard' ? 'border-b-2 border-white' : ''}`}>
              Dashboard
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">{userName}</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth" className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-2 rounded-lg font-bold transition-colors">
                Get Started
              </Link>
            )}
          </div>

          <button className="md:hidden text-white flex flex-col gap-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="w-6 h-0.5 bg-white block"></span>
            <span className="w-6 h-0.5 bg-white block"></span>
            <span className="w-6 h-0.5 bg-white block"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-700 border-t border-emerald-500">
            <Link href="/" className="block text-white px-4 py-3 hover:bg-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/intake" className="block text-white px-4 py-3 hover:bg-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Patient Intake</Link>
            <Link href="/imaging" className="block text-white px-4 py-3 hover:bg-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Medical Imaging</Link>
            <Link href="/dashboard" className="block text-white px-4 py-3 hover:bg-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            <Link href="/auth" className="block text-white px-4 py-3 hover:bg-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Login / Sign Up</Link>
          </div>
        )}
      </nav>

    </header>
  );
}
