'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TriageReport() {
    const [patientData, setPatientData] = useState(null);
    const [analysisReport, setAnalysisReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const fetchAnalysis = async () => {
            // Get patient data from localStorage
            const storedData = localStorage.getItem('patientData');

            if (storedData) {
                const data = JSON.parse(storedData);
                setPatientData(data);

                try {
                    // Call the analyze API
                    const response = await fetch('/api/analyze', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        const report = await response.json();
                        setAnalysisReport(report);
                    }
                } catch (error) {
                    console.error('Analysis failed:', error);
                }
            } else {
                // Use mock data if no data stored
                setPatientData({
                    patientName: 'Demo Patient',
                    age: '32',
                    temperature: '98.6F',
                    heartRate: '72bpm',
                    primarySymptoms: 'Fever, Headache'
                });
            }

            setLoading(false);
        };

        fetchAnalysis();

        // Set current time
        const now = new Date();
        setCurrentTime(now.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }));
    }, []);

    const triageResults = analysisReport?.triage || {
        priority: 'MODERATE',
        urgencyScore: 65,
        waitTime: '2-4 hours',
    };

    const aiConfidence = analysisReport?.analysis?.aiConfidence || 85;
    const probableConditions = analysisReport?.analysis?.probableConditions || [];
    const recommendations = analysisReport?.recommendations || {};

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'URGENT': return 'priority-urgent';
            case 'MODERATE': return 'priority-moderate';
            case 'LOW': return 'priority-low';
            default: return 'priority-moderate';
        }
    };

    const handleDownload = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="container text-center" style={{ padding: 'var(--space-3xl) 0' }}>
                <div className="spinner" style={{ margin: '0 auto' }}></div>
                <p className="mt-lg">AI is analyzing your symptoms...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="back-nav">
                <Link href="/" className="back-link">
                    ← Back To Home
                </Link>
                <span className="timestamp">{currentTime}</span>
            </div>

            <div className="section-header">
                <span className="section-icon">📄</span>
                <h1 className="section-title">AI Triage Analysis Report</h1>
            </div>

            {/* Priority Card */}
            <div className={`priority-card ${getPriorityClass(triageResults.priority)} mb-xl`}>
                <div className="priority-icon">
                    <span style={{
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255,255,255,0.5)'
                    }}>
                        {triageResults.priority === 'URGENT' ? '🚨' : triageResults.priority === 'MODERATE' ? '⚠️' : '✅'}
                    </span>
                    <div>
                        <div className="priority-label">{triageResults.priority} PRIORITY</div>
                        <div className="priority-details">
                            Urgency Score: <strong>{triageResults.urgencyScore}/100</strong> |
                            Wait Time: <strong>{triageResults.estimatedWaitTime || triageResults.waitTime}</strong>
                        </div>
                    </div>
                </div>
                <div className="ai-confidence">
                    <div className="ai-confidence-value">{aiConfidence}%</div>
                    <div className="ai-confidence-label">AI Confidence</div>
                </div>
            </div>

            {/* Recommendation Banner */}
            {triageResults.recommendation && (
                <div style={{
                    background: triageResults.priority === 'URGENT' ? 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)' :
                        triageResults.priority === 'MODERATE' ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' :
                            'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                    padding: 'var(--space-lg)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--space-xl)',
                    border: `1px solid ${triageResults.priority === 'URGENT' ? '#FCA5A5' : triageResults.priority === 'MODERATE' ? '#FCD34D' : '#6EE7B7'}`
                }}>
                    <strong>📋 Recommendation:</strong> {triageResults.recommendation}
                </div>
            )}

            {/* Patient Information */}
            <div className="patient-info-card mb-xl">
                <h3 className="patient-info-title">Patient Information</h3>
                <div className="patient-info-grid">
                    <div className="patient-info-row">
                        <span className="patient-info-label">Name:</span>
                        <span className="patient-info-value">{patientData?.patientName || 'N/A'}</span>
                    </div>
                    <div className="patient-info-row">
                        <span className="patient-info-label">Age:</span>
                        <span className="patient-info-value">{patientData?.age || 'N/A'}</span>
                    </div>
                    <div className="patient-info-row">
                        <span className="patient-info-label">Temperature:</span>
                        <span className="patient-info-value">{patientData?.temperature || 'Not recorded'}</span>
                    </div>
                    <div className="patient-info-row">
                        <span className="patient-info-label">Heart Rate:</span>
                        <span className="patient-info-value">{patientData?.heartRate || 'Not recorded'}</span>
                    </div>
                    <div className="patient-info-row">
                        <span className="patient-info-label">Symptoms:</span>
                        <span className="patient-info-value">{patientData?.primarySymptoms || 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* Probable Conditions */}
            {probableConditions.length > 0 && (
                <div className="card mb-xl">
                    <h3 className="card-title" style={{ marginBottom: 'var(--space-lg)' }}>
                        🔬 Probable Conditions (AI Analysis)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {probableConditions.map((condition, index) => (
                            <div key={index} className="condition-card" style={{ '--index': index }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 className="condition-card-title">{condition.condition}</h4>
                                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                                            {condition.description}
                                        </p>
                                    </div>
                                    <span style={{
                                        background: condition.confidence > 70 ? 'var(--color-primary)' :
                                            condition.confidence > 50 ? 'var(--color-accent-orange)' :
                                                'var(--color-text-muted)',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: 'var(--font-size-sm)',
                                        fontWeight: 600
                                    }}>
                                        {condition.confidence}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommendations */}
            {recommendations.immediate && (
                <div className="card mb-xl">
                    <h3 className="card-title" style={{ marginBottom: 'var(--space-lg)' }}>
                        💊 Recommendations
                    </h3>
                    <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                        <div>
                            <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
                                Immediate Actions:
                            </h4>
                            <ul style={{ paddingLeft: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                                {recommendations.immediate.map((rec, i) => (
                                    <li key={i} style={{ marginBottom: 'var(--space-xs)' }}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                        {recommendations.lifestyle && (
                            <div>
                                <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
                                    Lifestyle Recommendations:
                                </h4>
                                <ul style={{ paddingLeft: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                                    {recommendations.lifestyle.map((rec, i) => (
                                        <li key={i} style={{ marginBottom: 'var(--space-xs)' }}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <div style={{
                background: 'var(--color-surface-light)',
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-xl)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-muted)',
                textAlign: 'center'
            }}>
                ⚠️ <strong>Disclaimer:</strong> This is an AI-assisted preliminary assessment.
                Always consult a qualified healthcare provider for medical advice, diagnosis, or treatment.
            </div>

            {/* Download Button */}
            <button onClick={handleDownload} className="download-btn">
                ⬇️
            </button>

            <div className="action-buttons">
                <Link href="/conditions" className="btn btn-primary btn-lg">
                    View Conditions
                </Link>
                <Link href="/intake" className="btn btn-secondary btn-lg">
                    New Assessment
                </Link>
            </div>
        </div>
    );
}
