// Free Healthcare APIs Integration
// These APIs are completely free and don't require API keys

// 1. OpenFDA API - Drug and medical device information
const OPENFDA_BASE = 'https://api.fda.gov';

// 2. Disease.sh API - COVID-19 and health statistics  
const DISEASE_SH_BASE = 'https://disease.sh/v3/covid-19';

// 3. Open Disease API - Disease information
const OPEN_DISEASE_BASE = 'https://disease.sh/v3';

/**
 * Search for drug information by name
 */
export async function searchDrugs(drugName) {
    try {
        const response = await fetch(
            `${OPENFDA_BASE}/drug/label.json?search=openfda.brand_name:"${drugName}"&limit=5`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Drug search error:', error);
        return [];
    }
}

/**
 * Get drug adverse events/side effects
 */
export async function getDrugAdverseEvents(drugName) {
    try {
        const response = await fetch(
            `${OPENFDA_BASE}/drug/event.json?search=patient.drug.openfda.brand_name:"${drugName}"&limit=10`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Adverse events error:', error);
        return [];
    }
}

/**
 * Get health statistics for a country
 */
export async function getHealthStats(country = 'india') {
    try {
        const response = await fetch(`${DISEASE_SH_BASE}/countries/${country}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Health stats error:', error);
        return null;
    }
}

/**
 * Get global health statistics
 */
export async function getGlobalHealthStats() {
    try {
        const response = await fetch(`${DISEASE_SH_BASE}/all`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Global stats error:', error);
        return null;
    }
}

/**
 * Symptom-based condition mapping (local database)
 * Since most symptom checker APIs require paid subscriptions,
 * we use a comprehensive local database for basic triage
 */
export const symptomConditionDatabase = {
    // Respiratory symptoms
    'cough': ['Common Cold', 'Bronchitis', 'Pneumonia', 'COVID-19', 'Asthma'],
    'shortness of breath': ['Asthma', 'COPD', 'Pneumonia', 'Heart Failure', 'Anxiety'],
    'chest pain': ['Angina', 'Heart Attack', 'Costochondritis', 'GERD', 'Pulmonary Embolism'],
    'wheezing': ['Asthma', 'COPD', 'Allergic Reaction', 'Bronchitis'],

    // Cardiac symptoms
    'palpitations': ['Arrhythmia', 'Anxiety', 'Hyperthyroidism', 'Anemia'],
    'rapid heartbeat': ['Tachycardia', 'Anxiety', 'Dehydration', 'Fever'],

    // Neurological symptoms
    'headache': ['Tension Headache', 'Migraine', 'Sinusitis', 'Hypertension', 'Dehydration'],
    'dizziness': ['Vertigo', 'Low Blood Pressure', 'Anemia', 'Inner Ear Infection', 'Dehydration'],
    'confusion': ['Delirium', 'Stroke', 'Hypoglycemia', 'Infection', 'Medication Side Effect'],
    'numbness': ['Peripheral Neuropathy', 'Stroke', 'Carpal Tunnel', 'Multiple Sclerosis'],

    // Gastrointestinal symptoms
    'nausea': ['Gastritis', 'Food Poisoning', 'Pregnancy', 'Migraine', 'Medication Side Effect'],
    'vomiting': ['Gastroenteritis', 'Food Poisoning', 'Migraine', 'Appendicitis'],
    'abdominal pain': ['Gastritis', 'Appendicitis', 'IBS', 'Gallstones', 'Kidney Stones'],
    'diarrhea': ['Gastroenteritis', 'Food Poisoning', 'IBS', 'Infection'],

    // General symptoms
    'fever': ['Viral Infection', 'Bacterial Infection', 'COVID-19', 'Flu', 'UTI'],
    'fatigue': ['Anemia', 'Thyroid Disorder', 'Depression', 'Sleep Disorder', 'Diabetes'],
    'weakness': ['Anemia', 'Dehydration', 'Electrolyte Imbalance', 'Infection'],
    'weight loss': ['Diabetes', 'Hyperthyroidism', 'Cancer', 'Depression', 'Infection'],

    // Musculoskeletal symptoms
    'joint pain': ['Arthritis', 'Gout', 'Lupus', 'Injury', 'Viral Infection'],
    'back pain': ['Muscle Strain', 'Herniated Disc', 'Sciatica', 'Kidney Infection'],
    'muscle pain': ['Fibromyalgia', 'Viral Infection', 'Overexertion', 'Medication Side Effect'],

    // Skin symptoms
    'rash': ['Allergic Reaction', 'Eczema', 'Psoriasis', 'Viral Infection', 'Drug Reaction'],
    'itching': ['Allergic Reaction', 'Eczema', 'Liver Disease', 'Dry Skin'],

    // ENT symptoms
    'sore throat': ['Pharyngitis', 'Tonsillitis', 'Strep Throat', 'Common Cold', 'Mono'],
    'runny nose': ['Common Cold', 'Allergies', 'Sinusitis', 'Flu'],
    'ear pain': ['Otitis Media', 'Otitis Externa', 'TMJ', 'Referred Pain'],
};

/**
 * Analyze symptoms and return probable conditions with confidence
 */
export function analyzeSymptoms(symptomsText) {
    const symptoms = symptomsText.toLowerCase();
    const matchedConditions = {};

    // Check each symptom keyword
    Object.entries(symptomConditionDatabase).forEach(([symptom, conditions]) => {
        if (symptoms.includes(symptom)) {
            conditions.forEach((condition, index) => {
                // Higher confidence for first-listed conditions
                const confidence = 100 - (index * 15);
                if (!matchedConditions[condition] || matchedConditions[condition] < confidence) {
                    matchedConditions[condition] = Math.max(confidence, 20);
                }
            });
        }
    });

    // Sort by confidence and return top 5
    return Object.entries(matchedConditions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([condition, confidence]) => ({
            condition,
            confidence: Math.min(confidence, 95),
            description: getConditionDescription(condition)
        }));
}

/**
 * Get condition descriptions
 */
function getConditionDescription(condition) {
    const descriptions = {
        'Common Cold': 'A viral infection of the upper respiratory tract causing runny nose, congestion, and mild symptoms.',
        'Bronchitis': 'Inflammation of the bronchial tubes causing cough and mucus production.',
        'Pneumonia': 'Lung infection causing inflammation and fluid in the air sacs.',
        'COVID-19': 'Respiratory illness caused by the SARS-CoV-2 virus.',
        'Asthma': 'Chronic condition causing airway inflammation and breathing difficulty.',
        'Migraine': 'Severe headache often accompanied by nausea and light sensitivity.',
        'Tension Headache': 'Common headache type causing mild to moderate pain.',
        'Gastritis': 'Inflammation of the stomach lining causing pain and discomfort.',
        'Gastroenteritis': 'Inflammation of the stomach and intestines causing vomiting and diarrhea.',
        'Flu': 'Influenza virus infection causing fever, body aches, and respiratory symptoms.',
        'Anemia': 'Condition where blood lacks enough healthy red blood cells.',
        'Diabetes': 'Metabolic disorder affecting blood sugar regulation.',
        'Arthritis': 'Inflammation of joints causing pain and stiffness.',
        'Hypertension': 'High blood pressure that can lead to serious health problems.',
        'Anxiety': 'Mental health condition causing excessive worry and physical symptoms.',
        'Depression': 'Mental health disorder causing persistent sadness and loss of interest.',
        'UTI': 'Urinary tract infection causing pain and frequent urination.',
    };

    return descriptions[condition] || 'A medical condition requiring professional evaluation.';
}

/**
 * Calculate triage priority based on symptoms
 */
export function calculateTriagePriority(symptoms, painLevel = 5, vitalSigns = {}) {
    let urgencyScore = 0;
    const symptomsLower = symptoms.toLowerCase();

    // Critical symptoms (immediate attention)
    const criticalSymptoms = ['chest pain', 'difficulty breathing', 'unconscious', 'stroke', 'heart attack', 'severe bleeding', 'seizure'];
    const hasCritical = criticalSymptoms.some(s => symptomsLower.includes(s));
    if (hasCritical) urgencyScore += 40;

    // High priority symptoms
    const highPrioritySymptoms = ['shortness of breath', 'high fever', 'severe pain', 'confusion', 'numbness', 'vomiting blood'];
    const hasHighPriority = highPrioritySymptoms.some(s => symptomsLower.includes(s));
    if (hasHighPriority) urgencyScore += 25;

    // Pain level contribution
    urgencyScore += painLevel * 3;

    // Vital signs contribution
    if (vitalSigns.temperature) {
        const temp = parseFloat(vitalSigns.temperature);
        if (temp > 103) urgencyScore += 20;
        else if (temp > 101) urgencyScore += 10;
    }

    if (vitalSigns.heartRate) {
        const hr = parseInt(vitalSigns.heartRate);
        if (hr > 120 || hr < 50) urgencyScore += 15;
    }

    // Determine priority level
    let priority, recommendation, waitTime;

    if (urgencyScore >= 60) {
        priority = 'URGENT';
        recommendation = 'Seek immediate medical attention. Visit the emergency room.';
        waitTime = 'Immediate';
    } else if (urgencyScore >= 40) {
        priority = 'MODERATE';
        recommendation = 'Schedule an appointment with a doctor within 24-48 hours.';
        waitTime = '24-48 hours';
    } else {
        priority = 'LOW';
        recommendation = 'Monitor symptoms. Consider telemedicine consultation if symptoms persist.';
        waitTime = 'Non-urgent';
    }

    return {
        urgencyScore: Math.min(urgencyScore, 100),
        priority,
        recommendation,
        waitTime,
        timestamp: new Date().toISOString()
    };
}
