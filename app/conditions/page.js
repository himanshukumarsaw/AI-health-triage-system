'use client';

import Link from 'next/link';

export default function ProbableConditions() {
    const conditions = [
        {
            id: 1,
            name: 'Upper Respiratory Infection',
            description: 'Requires further clinical evaluation for confirmation'
        },
        {
            id: 2,
            name: 'Viral Syndrome',
            description: 'Requires further clinical evaluation for confirmation'
        },
        {
            id: 3,
            name: 'Gastroenteritis',
            description: 'Requires further clinical evaluation for confirmation'
        }
    ];

    const nextSteps = [
        'Schedule appointment with primary care physician within 24-48 hours',
        'Visit urgent care clinic if symptoms worsen',
        'Monitor vital signs regularly',
        'Stay hydrated and rest'
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container">
            <div className="section-header">
                <span className="section-icon">📈</span>
                <h2 className="section-title">Probable Conditions (AI-Generated)</h2>
            </div>

            <div style={{ maxWidth: '800px' }}>
                {conditions.map((condition) => (
                    <div key={condition.id} className="condition-card">
                        <h3 className="condition-card-title">
                            {condition.id}. {condition.name}
                        </h3>
                        <p className="condition-card-description">
                            {condition.description}
                        </p>
                    </div>
                ))}

                <div className="recommended-steps">
                    <h3>
                        <span style={{ color: 'var(--color-primary)' }}>✓</span>
                        Recommended Next Steps
                    </h3>
                    <ul>
                        {nextSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>

                <div className="action-buttons">
                    <Link href="/intake" className="btn btn-secondary btn-lg">
                        New Assessment
                    </Link>
                    <button onClick={handlePrint} className="btn btn-accent btn-lg">
                        Print Report
                    </button>
                </div>
            </div>
        </div>
    );
}
