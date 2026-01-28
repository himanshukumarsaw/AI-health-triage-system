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

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'urgent': return 'patient-card-urgent';
            case 'moderate': return 'patient-card-moderate';
            case 'routine': return 'patient-card-routine';
            default: return '';
        }
    };

    const getStatusClass = (priority) => {
        switch (priority) {
            case 'urgent': return 'patient-status-urgent';
            case 'moderate': return 'patient-status-moderate';
            case 'routine': return 'patient-status-routine';
            default: return '';
        }
    };

    const getButtonClass = (priority) => {
        switch (priority) {
            case 'urgent': return 'btn-danger';
            case 'moderate': return 'btn-primary';
            case 'routine': return 'btn-success';
            default: return 'btn-primary';
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
                <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>
                    Clinic Dashboard - Patient Queue
                </h1>
                <Link href="/" className="btn btn-icon" style={{
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-white)'
                }}>
                    ←
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="dashboard-stats">
                <div className="stat-card stat-card-urgent">
                    <div className="stat-value stat-value-urgent">{stats.urgent}</div>
                    <div className="stat-label">Urgent cases</div>
                </div>
                <div className="stat-card stat-card-moderate">
                    <div className="stat-value stat-value-moderate">{stats.moderate}</div>
                    <div className="stat-label">Moderate priority</div>
                </div>
                <div className="stat-card stat-card-routine">
                    <div className="stat-value stat-value-routine">{stats.routine}</div>
                    <div className="stat-label">Routine case</div>
                </div>
                <div className="stat-card stat-card-info">
                    <div className="stat-value stat-value-info">{stats.avgTriageTime}</div>
                    <div className="stat-label">Avg Triage time</div>
                </div>
            </div>

            {/* Patient Queue */}
            <h2 style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 600,
                marginBottom: 'var(--space-lg)'
            }}>
                Active Patient Queue
            </h2>

            <div>
                {patients.map((patient) => (
                    <div
                        key={patient.id}
                        className={`patient-card ${getPriorityClass(patient.priority)}`}
                    >
                        <div className="patient-info">
                            <div className={`patient-status-dot ${getStatusClass(patient.priority)}`}></div>
                            <div>
                                <div>
                                    <span className="patient-name">{patient.name}</span>
                                    <span className="patient-age" style={{ marginLeft: 'var(--space-sm)' }}>
                                        Age: {patient.age}
                                    </span>
                                </div>
                                <div className="patient-complaint">
                                    Chief complaint: {patient.complaint}
                                </div>
                                <div className="patient-risk">
                                    Risk score: {patient.riskScore}/100
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                            <span className="patient-time">{patient.timeAgo}</span>
                            <Link
                                href={`/report`}
                                className="btn"
                                style={{
                                    background: patient.priority === 'urgent' ? 'var(--color-severity-high)' :
                                        patient.priority === 'moderate' ? 'var(--color-severity-moderate)' :
                                            'var(--color-primary)',
                                    color: 'var(--color-white)'
                                }}
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
