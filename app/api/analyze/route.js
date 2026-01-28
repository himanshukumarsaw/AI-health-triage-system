import { NextResponse } from 'next/server';
import { analyzeSymptoms, calculateTriagePriority } from '@/app/lib/healthApi';

export async function POST(request) {
    try {
        const body = await request.json();
        const { patientName, age, primarySymptoms, painSeverity, temperature, heartRate } = body;

        // Validate required fields
        if (!primarySymptoms) {
            return NextResponse.json(
                { error: 'Primary symptoms are required' },
                { status: 400 }
            );
        }

        // Analyze symptoms using our healthcare API
        const probableConditions = analyzeSymptoms(primarySymptoms);

        // Calculate triage priority
        const triageResult = calculateTriagePriority(
            primarySymptoms,
            painSeverity || 5,
            { temperature, heartRate }
        );

        // Generate comprehensive report
        const report = {
            patientInfo: {
                name: patientName || 'Anonymous',
                age: age || 'Not specified',
                submittedAt: new Date().toISOString()
            },
            symptoms: {
                primary: primarySymptoms,
                painSeverity: painSeverity || 5,
                vitalSigns: {
                    temperature: temperature || 'Not recorded',
                    heartRate: heartRate || 'Not recorded'
                }
            },
            triage: {
                priority: triageResult.priority,
                urgencyScore: triageResult.urgencyScore,
                recommendation: triageResult.recommendation,
                estimatedWaitTime: triageResult.waitTime
            },
            analysis: {
                probableConditions: probableConditions.length > 0 ? probableConditions : [
                    {
                        condition: 'General Health Concern',
                        confidence: 70,
                        description: 'Your symptoms require professional medical evaluation for accurate diagnosis.'
                    }
                ],
                aiConfidence: probableConditions.length > 0 ?
                    Math.round(probableConditions.reduce((sum, c) => sum + c.confidence, 0) / probableConditions.length) :
                    70,
                disclaimer: 'This is an AI-assisted preliminary assessment. Always consult a qualified healthcare provider for medical advice.',
                generatedAt: new Date().toISOString()
            },
            recommendations: {
                immediate: getImmediateRecommendations(triageResult.priority, probableConditions),
                followUp: getFollowUpRecommendations(triageResult.priority),
                lifestyle: getLifestyleRecommendations(probableConditions)
            }
        };

        return NextResponse.json(report);
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze symptoms' },
            { status: 500 }
        );
    }
}

function getImmediateRecommendations(priority, conditions) {
    const recommendations = [];

    if (priority === 'URGENT') {
        recommendations.push('Seek emergency medical care immediately');
        recommendations.push('Call emergency services (112) if symptoms worsen');
        recommendations.push('Do not drive yourself to the hospital');
    } else if (priority === 'MODERATE') {
        recommendations.push('Schedule an appointment with your doctor within 24-48 hours');
        recommendations.push('Rest and stay hydrated');
        recommendations.push('Monitor your symptoms closely');
    } else {
        recommendations.push('Rest and monitor your symptoms');
        recommendations.push('Stay hydrated and get adequate sleep');
        recommendations.push('Consider over-the-counter medications for symptom relief');
    }

    return recommendations;
}

function getFollowUpRecommendations(priority) {
    if (priority === 'URGENT') {
        return ['Follow emergency room discharge instructions', 'Schedule follow-up within 24 hours'];
    } else if (priority === 'MODERATE') {
        return ['Follow up with your doctor if symptoms persist beyond 48 hours', 'Keep a symptom diary'];
    }
    return ['Seek medical attention if symptoms worsen or new symptoms develop', 'Annual health check-up recommended'];
}

function getLifestyleRecommendations(conditions) {
    const recommendations = [
        'Maintain a balanced diet rich in fruits and vegetables',
        'Get regular exercise (30 minutes of moderate activity daily)',
        'Ensure adequate sleep (7-9 hours for adults)',
        'Stay hydrated by drinking at least 8 glasses of water daily',
        'Practice stress management techniques'
    ];

    // Add condition-specific advice
    conditions.forEach(cond => {
        if (cond.condition.includes('Respiratory') || cond.condition.includes('Cold') || cond.condition.includes('Flu')) {
            recommendations.unshift('Avoid cold environments and stay warm');
        }
        if (cond.condition.includes('Gastro') || cond.condition.includes('Gastritis')) {
            recommendations.unshift('Avoid spicy and fatty foods');
        }
    });

    return recommendations.slice(0, 5);
}

export async function GET() {
    return NextResponse.json({
        status: 'Symptom Analysis API is running',
        version: '1.0.0',
        features: [
            'Symptom-based condition matching',
            'AI-powered triage priority calculation',
            'Comprehensive health recommendations',
            'Integration with OpenFDA drug database'
        ]
    });
}
