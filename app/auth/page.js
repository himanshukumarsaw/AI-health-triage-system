'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: '',
        role: 'patient'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        let value = e.target.value;

        // For fullName field, only allow letters and spaces
        if (e.target.name === 'fullName') {
            value = value.replace(/[^A-Za-z\s]/g, '');
        }

        setFormData({ ...formData, [e.target.name]: value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields');
            setIsLoading(false);
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Store user in localStorage (mock auth)
        localStorage.setItem('user', JSON.stringify({
            email: formData.email,
            fullName: formData.fullName || 'User',
            role: formData.role,
            isLoggedIn: true
        }));

        // Redirect based on role
        if (formData.role === 'clinician') {
            router.push('/dashboard');
        } else {
            router.push('/');
        }
    };

    return (
        <div className="container" style={{
            minHeight: 'calc(100vh - 200px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-2xl) var(--space-lg)'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '480px',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-2xl)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--color-border)',
                animation: 'fadeInUp 0.5s ease-out'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'var(--color-primary-gradient)',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto var(--space-md)',
                        fontSize: '32px',
                        boxShadow: 'var(--shadow-lg), 0 0 30px rgba(16, 185, 129, 0.3)'
                    }}>
                        🏥
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        AI-TriageMD
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-xs)' }}>
                        {isLogin ? 'Welcome back!' : 'Create your account'}
                    </p>
                </div>

                {/* Toggle Tabs */}
                <div style={{
                    display: 'flex',
                    background: 'var(--color-surface-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px',
                    marginBottom: 'var(--space-xl)'
                }}>
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        style={{
                            flex: 1,
                            padding: 'var(--space-sm) var(--space-md)',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: isLogin ? 'var(--color-white)' : 'transparent',
                            color: isLogin ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)',
                            boxShadow: isLogin ? 'var(--shadow-sm)' : 'none'
                        }}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        style={{
                            flex: 1,
                            padding: 'var(--space-sm) var(--space-md)',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: !isLogin ? 'var(--color-white)' : 'transparent',
                            color: !isLogin ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)',
                            boxShadow: !isLogin ? 'var(--shadow-sm)' : 'none'
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                        color: '#DC2626',
                        padding: 'var(--space-md)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: 'var(--space-lg)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter your full name"
                                    pattern="[A-Za-z\s]+"
                                    title="Please enter letters only"
                                    style={{ background: 'var(--color-white)' }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="+91 9876543210"
                                    pattern="[0-9+\s\-]+"
                                    title="Please enter a valid phone number"
                                    style={{ background: 'var(--color-white)' }}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="you@example.com"
                            required
                            style={{ background: 'var(--color-white)' }}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="••••••••"
                            required
                            style={{ background: 'var(--color-white)' }}
                        />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="••••••••"
                                    required
                                    style={{ background: 'var(--color-white)' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">I am a</label>
                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--space-md)',
                                    marginTop: 'var(--space-sm)'
                                }}>
                                    <label style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-sm)',
                                        padding: 'var(--space-md)',
                                        border: `2px solid ${formData.role === 'patient' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                        background: formData.role === 'patient' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                                        transition: 'all var(--transition-base)'
                                    }}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="patient"
                                            checked={formData.role === 'patient'}
                                            onChange={handleChange}
                                            style={{ accentColor: 'var(--color-primary)' }}
                                        />
                                        <span>👤 Patient</span>
                                    </label>
                                    <label style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-sm)',
                                        padding: 'var(--space-md)',
                                        border: `2px solid ${formData.role === 'clinician' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                        background: formData.role === 'clinician' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                                        transition: 'all var(--transition-base)'
                                    }}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="clinician"
                                            checked={formData.role === 'clinician'}
                                            onChange={handleChange}
                                            style={{ accentColor: 'var(--color-primary)' }}
                                        />
                                        <span>👨‍⚕️ Clinician</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    {isLogin && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: 'var(--space-lg)'
                        }}>
                            <a href="#" style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-primary)',
                                fontWeight: 500
                            }}>
                                Forgot password?
                            </a>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: 'var(--space-md)',
                            fontSize: 'var(--font-size-base)',
                            marginTop: 'var(--space-md)'
                        }}
                    >
                        {isLoading ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></span>
                                {isLogin ? 'Logging in...' : 'Creating account...'}
                            </span>
                        ) : (
                            isLogin ? '🔐 Login' : '🚀 Create Account'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    margin: 'var(--space-xl) 0'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>or continue with</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
                </div>

                {/* Social Login */}
                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                    <button
                        type="button"
                        style={{
                            flex: 1,
                            padding: 'var(--space-md)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--color-white)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-sm)',
                            fontWeight: 500,
                            transition: 'all var(--transition-base)'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'var(--color-surface-light)'}
                        onMouseOut={(e) => e.target.style.background = 'var(--color-white)'}
                    >
                        <span style={{ fontSize: '20px' }}>🔵</span> Google
                    </button>
                    <button
                        type="button"
                        style={{
                            flex: 1,
                            padding: 'var(--space-md)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--color-white)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-sm)',
                            fontWeight: 500,
                            transition: 'all var(--transition-base)'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'var(--color-surface-light)'}
                        onMouseOut={(e) => e.target.style.background = 'var(--color-white)'}
                    >
                        <span style={{ fontSize: '20px' }}>⚫</span> Apple
                    </button>
                </div>

                {/* Footer */}
                <p style={{
                    textAlign: 'center',
                    marginTop: 'var(--space-xl)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-muted)'
                }}>
                    By continuing, you agree to our{' '}
                    <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Privacy Policy</a>
                </p>

                {/* Back to Home */}
                <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
                    <Link href="/" style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)'
                    }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
