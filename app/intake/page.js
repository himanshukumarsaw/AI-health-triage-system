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
        <div className="container">
            <div className="section-header">
                <span className="section-icon">👤</span>
                <h1 className="section-title">Patient Symptoms Intake</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
                <div className="form-group">
                    <label className="form-label">Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter patient name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter age"
                        required
                        min="0"
                        max="150"
                        style={{ maxWidth: '150px' }}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Primary Symptoms</label>
                    <textarea
                        name="primarySymptoms"
                        value={formData.primarySymptoms}
                        onChange={handleChange}
                        className="form-input form-textarea"
                        placeholder="Describe the primary symptoms"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Pain/Severity: {formData.painSeverity}/10</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData.painSeverity}
                            onChange={handleSliderChange}
                            className="slider-input"
                        />
                        <div className="slider-labels">
                            <span>Mild</span>
                            <span>Moderate</span>
                            <span>Severe</span>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Temperature</label>
                    <input
                        type="text"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., 97.7F"
                        style={{ maxWidth: '150px' }}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Heart Rate (bpm)</label>
                    <input
                        type="text"
                        name="heartRate"
                        value={formData.heartRate}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., 72"
                        style={{ maxWidth: '150px' }}
                    />
                </div>

                <div className="ai-assistant">
                    <p><strong>AI Symptom Assistant</strong></p>
                    <p>
                        <a href="/chat">Start a Conversation</a> to get a personalized symptoms assistance
                    </p>
                </div>

                <button
                    type="submit"
                    className="btn btn-success mt-xl"
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Analyzing...' : 'Analyze and generate triage report'}
                </button>
            </form>

            {isSubmitting && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p className="loading-text">AI is analyzing your symptoms...</p>
                </div>
            )}
        </div>
    );
}
