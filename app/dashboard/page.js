'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ClinicianDashboard() {
    // Mock patient queue data
    const [patients] = useState([
        {
            id: 1,
            name: 'Raja Ram',
            age: 45,
            complaint: 'Chest pain, shortness of breath',
            riskScore: 58,
            priority: 'moderate',
            timeAgo: '2 Min ago'
        },
        {
            id: 2,
            name: 'Sahil singh',
            age: 35,
            complaint: 'Chest pain, shortness of breath',
            riskScore: 85,
            priority: 'routine',
            timeAgo: '13 Min ago'
        },
        {
            id: 3,
            name: 'Sohan Kumar',
            age: 21,
            complaint: 'Chest pain, shortness of breath',
            riskScore: 65,
            priority: 'urgent',
            timeAgo: '26 Min ago'
        }
    ]);

    const stats = {
        urgent: 3,
        moderate: 8,
        routine: 12,
        avgTriageTime: '18 min'
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent':
                return { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-500', text: 'text-red-600' };
            case 'moderate':
                return { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-500', text: 'text-yellow-600' };
            case 'routine':
                return { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-500', text: 'text-green-600' };
            default:
                return { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-500', text: 'text-slate-600' };
        }
    };

    const getPriorityLabel = (priority) => {
        switch (priority) {
            case 'urgent': return 'URGENT';
            case 'moderate': return 'MODERATE';
            case 'routine': return 'ROUTINE';
            default: return priority.toUpperCase();
        }
    };

    const getButtonColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-600 hover:bg-red-700';
            case 'moderate': return 'bg-yellow-600 hover:bg-yellow-700';
            case 'routine': return 'bg-green-600 hover:bg-green-700';
            default: return 'bg-blue-600 hover:bg-blue-700';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 font-poppins mb-2">Clinical Dashboard</h1>
                        <p className="text-slate-600">Real-time patient queue management and triage</p>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-lg border border-slate-200 transition-colors font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back Home
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {/* Urgent Cases */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-slate-600 font-medium text-sm">Urgent Cases</p>
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-red-600 font-poppins">{stats.urgent}</p>
                        <p className="text-xs text-slate-500 mt-1">High priority patients</p>
                    </div>

                    {/* Moderate Cases */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-slate-600 font-medium text-sm">Moderate Priority</p>
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M15 5H9m0 0V3m0 2v-2m0 0h6m-6 0H3m0 0a9 9 0 018.835-8.835m0 0h6m-6 0V3m6 0a9 9 0 01-8.835 8.835" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-yellow-600 font-poppins">{stats.moderate}</p>
                        <p className="text-xs text-slate-500 mt-1">Medium priority patients</p>
                    </div>

                    {/* Routine Cases */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-slate-600 font-medium text-sm">Routine Cases</p>
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-green-600 font-poppins">{stats.routine}</p>
                        <p className="text-xs text-slate-500 mt-1">Low priority patients</p>
                    </div>

                    {/* Avg Triage Time */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-slate-600 font-medium text-sm">Avg Triage Time</p>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-blue-600 font-poppins">{stats.avgTriageTime}</p>
                        <p className="text-xs text-slate-500 mt-1">Average response time</p>
                    </div>
                </div>

                {/* Patient Queue Section */}
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 font-poppins mb-2">Active Patient Queue</h2>
                        <p className="text-slate-600">Total patients: {patients.length}</p>
                    </div>

                    <div className="space-y-4">
                        {patients.map((patient) => {
                            const colors = getPriorityColor(patient.priority);
                            const buttonColor = getButtonColor(patient.priority);

                            return (
                                <div
                                    key={patient.id}
                                    className={`bg-white rounded-xl shadow-md p-6 border-2 ${colors.border} hover:shadow-lg transition-all`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4 flex-1">
                                            {/* Priority Badge */}
                                            <div className={`flex-shrink-0 ${colors.bg} rounded-lg p-3 h-fit`}>
                                                <span className={`inline-flex items-center justify-center w-10 h-10 ${colors.badge} text-white rounded-full font-bold text-sm`}>
                                                    {patient.priority === 'urgent' ? '!' : patient.priority === 'moderate' ? '⚠' : '✓'}
                                                </span>
                                            </div>

                                            {/* Patient Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <h3 className="text-lg font-bold text-slate-900">{patient.name}</h3>
                                                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${colors.text} ${colors.bg}`}>
                                                        {getPriorityLabel(patient.priority)}
                                                    </span>
                                                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Age: {patient.age}</span>
                                                </div>
                                                <p className="text-slate-600 mb-2">
                                                    <span className="font-semibold">Chief Complaint:</span> {patient.complaint}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                                                        <div
                                                            className={`h-full rounded-full ${
                                                                patient.riskScore >= 70
                                                                    ? 'bg-red-500'
                                                                    : patient.riskScore >= 40
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-green-500'
                                                            }`}
                                                            style={{ width: `${patient.riskScore}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700 min-w-fit">Risk: {patient.riskScore}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Time and Action */}
                                        <div className="text-right ml-4">
                                            <p className="text-sm text-slate-500 mb-3">{patient.timeAgo}</p>
                                            <Link
                                                href={`/report`}
                                                className={`inline-flex items-center gap-2 ${buttonColor} text-white px-6 py-2 rounded-lg font-semibold transition-colors`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                View Report
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
