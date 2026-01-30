'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
            <div className="text-center px-6">
                <h1 className="text-9xl font-bold text-emerald-600 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-slate-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                    It might have been moved or doesn&apos;t exist.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
