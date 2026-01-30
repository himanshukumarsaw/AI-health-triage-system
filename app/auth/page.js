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
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-slate-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 font-poppins mb-2">AI-TriageMD</h1>
                        <p className="text-slate-600 text-sm">Intelligent Healthcare Triage</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8">
                        <button
                            onClick={() => {
                                setIsLogin(true);
                                setError('');
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                                isLogin
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                setIsLogin(false);
                                setError('');
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                                !isLogin
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        {/* Full Name (Sign Up Only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        {/* Phone (Sign Up Only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        )}

                        {/* Role Selection (Sign Up Only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Account Type
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                >
                                    <option value="patient">Patient</option>
                                    <option value="clinician">Healthcare Professional</option>
                                </select>
                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Confirm Password (Sign Up Only) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-slate-600 text-sm mt-6">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                        >
                            {isLogin ? 'Sign up' : 'Login'}
                        </button>
                    </p>

                    {/* Security Notice */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Your data is encrypted and secure
                        </p>
                    </div>
                </div>

                {/* Guest Access Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
