'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PatientIntake() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        primarySymptoms: '',
        painSeverity: 5,
        temperature: '',
        heartRate: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // For patientName field, only allow letters and spaces
        if (name === 'patientName') {
            newValue = value.replace(/[^A-Za-z\s]/g, '');
        }

        // For age field, only allow positive numbers (0-150)
        if (name === 'age') {
            const numValue = parseInt(value);
            if (value === '') {
                newValue = '';
            } else if (numValue < 0) {
                newValue = '0';
            } else if (numValue > 150) {
                newValue = '150';
            } else {
                newValue = Math.abs(numValue).toString();
            }
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSliderChange = (e) => {
        setFormData(prev => ({ ...prev, painSeverity: parseInt(e.target.value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Store data in localStorage for the report page
        localStorage.setItem('patientData', JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString()
        }));

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        router.push('/report');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
            <div className="max-w-2xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 font-poppins mb-2">Patient Intake Form</h1>
                    <p className="text-lg text-slate-600">Please provide your symptoms and medical information</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Patient Name */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Patient Name *
                            </label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        {/* Age */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Age *
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                    placeholder="0-150"
                                    required
                                    min="0"
                                    max="150"
                                />
                            </div>

                            {/* Temperature */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Temperature (°F)
                                </label>
                                <input
                                    type="text"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                    placeholder="e.g., 98.6"
                                />
                            </div>
                        </div>

                        {/* Heart Rate */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Heart Rate (bpm)
                            </label>
                            <input
                                type="text"
                                name="heartRate"
                                value={formData.heartRate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                                placeholder="e.g., 72"
                            />
                        </div>

                        {/* Primary Symptoms */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                Primary Symptoms *
                            </label>
                            <textarea
                                name="primarySymptoms"
                                value={formData.primarySymptoms}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                                placeholder="Describe your symptoms in detail..."
                                required
                                rows="4"
                            />
                        </div>

                        {/* Pain Severity Slider */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-semibold text-slate-900">
                                    Pain/Severity Level
                                </label>
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-white font-bold">
                                    {formData.painSeverity}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={formData.painSeverity}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                            <div className="flex justify-between text-xs text-slate-600 mt-2 font-medium">
                                <span>Mild (1)</span>
                                <span>Moderate (5)</span>
                                <span>Severe (10)</span>
                            </div>
                        </div>

                        {/* AI Assistant Card */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 my-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">AI Symptom Assistant</h3>
                                    <p className="text-slate-600 text-sm mb-3">Need help describing your symptoms?</p>
                                    <a href="/chat" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                        Start AI Chat
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Analyzing Symptoms...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Generate Triage Report
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Info Card */}
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                    <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Information Notice
                    </h3>
                    <p className="text-emerald-800 text-sm">
                        The analysis provided is AI-assisted and not a medical diagnosis. Always consult with a qualified healthcare professional for medical advice.
                    </p>
                </div>
            </div>
        </div>
    );
}
