'use client';

import Link from 'next/link';

export default function AIResults() {
    // Mock diagnosis results
    const diagnoses = [
        {
            name: 'Pneumonia (Bacterial)',
            confidence: 89,
            severity: 'Moderate to Severe',
            features: [
                'Consolidation in right lower lobe',
                'Air bronchogram visible',
                'Increased opacity'
            ],
            recommendations: [
                'Immediate antibiotic therapy recommended',
                'Consider chest X-ray follow-up in 48-72 hours',
                'Monitor oxygen saturation',
                'Hospitalization may be required if respiratory distress present'
            ]
        },
        {
            name: 'Viral Pneumonia',
            confidence: 45,
            severity: 'Mild to Moderate',
            features: [
                'Clear lung fields',
                'Normal cardiac silhouette'
            ]
        },
        {
            name: 'Normal Chest X-ray',
            confidence: 12,
            severity: 'N/A',
            features: [
                'Clear lung fields',
                'Normal cardiac silhouette'
            ]
        }
    ];

    const getConfidenceClass = (confidence) => {
        if (confidence >= 70) return 'confidence-high';
        if (confidence >= 40) return 'confidence-medium';
        return 'confidence-low';
    };

    return (
        <div className="container">
            <div className="section-header">
                <span className="section-icon">🔬</span>
                <h1 className="section-title">AI Diagnostic Results</h1>
            </div>

            {diagnoses.map((diagnosis, index) => (
                <div key={index} className="card diagnosis-card mb-lg">
                    <div className="diagnosis-header">
                        <div>
                            <h3 className="diagnosis-title">{diagnosis.name}</h3>
                            <span className={`confidence-badge ${getConfidenceClass(diagnosis.confidence)}`}>
                                {diagnosis.confidence}% Confidence
                            </span>
                        </div>
                        <div className="diagnosis-severity">
                            <div className="diagnosis-severity-label">Severity</div>
                            <div className="diagnosis-severity-value">{diagnosis.severity}</div>
                        </div>
                    </div>

                    <div className="diagnosis-features">
                        <h4>Key Features Detected:</h4>
                        <ul>
                            {diagnosis.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    {diagnosis.recommendations && (
                        <div className="clinical-recommendations">
                            <h4>Clinical Recommendations:</h4>
                            <ul>
                                {diagnosis.recommendations.map((rec, i) => (
                                    <li key={i}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            <div className="action-buttons">
                <Link href="/conditions" className="btn btn-primary btn-lg">
                    View Probable Conditions
                </Link>
                <Link href="/imaging" className="btn btn-secondary btn-lg">
                    Upload New Image
                </Link>
            </div>
        </div>
    );
}
