// Patient Queue API
let patientQueue = [
    {
        id: 1,
        name: 'Raja Ram',
        age: 45,
        complaint: 'Chest pain, shortness of breath',
        riskScore: 58,
        priority: 'moderate',
        timestamp: Date.now() - 120000, // 2 minutes ago
        status: 'waiting'
    },
    {
        id: 2,
        name: 'Sahil singh',
        age: 35,
        complaint: 'Chest pain, shortness of breath',
        riskScore: 85,
        priority: 'routine',
        timestamp: Date.now() - 780000, // 13 minutes ago
        status: 'waiting'
    },
    {
        id: 3,
        name: 'Sohan Kumar',
        age: 21,
        complaint: 'Chest pain, shortness of breath',
        riskScore: 65,
        priority: 'urgent',
        timestamp: Date.now() - 1560000, // 26 minutes ago
        status: 'waiting'
    }
];

export async function GET() {
    // Format timestamps as relative time
    const formattedQueue = patientQueue.map(patient => ({
        ...patient,
        timeAgo: formatTimeAgo(patient.timestamp)
    }));

    // Calculate stats
    const stats = {
        urgent: patientQueue.filter(p => p.priority === 'urgent').length,
        moderate: patientQueue.filter(p => p.priority === 'moderate').length,
        routine: patientQueue.filter(p => p.priority === 'routine').length,
        avgTriageTime: '18 min'
    };

    return Response.json({
        success: true,
        patients: formattedQueue,
        stats
    });
}

export async function POST(request) {
    const data = await request.json();

    const newPatient = {
        id: patientQueue.length + 1,
        name: data.patientName,
        age: parseInt(data.age),
        complaint: data.primarySymptoms,
        riskScore: calculateRiskScore(data),
        priority: calculatePriority(data),
        timestamp: Date.now(),
        status: 'waiting'
    };

    patientQueue.unshift(newPatient);

    return Response.json({
        success: true,
        patient: newPatient
    });
}

function calculateRiskScore(data) {
    const severity = data.painSeverity || 5;
    return Math.min(severity * 10 + Math.floor(Math.random() * 20), 100);
}

function calculatePriority(data) {
    const severity = data.painSeverity || 5;
    if (severity >= 8) return 'urgent';
    if (severity >= 5) return 'moderate';
    return 'routine';
}

function formatTimeAgo(timestamp) {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 Min ago';
    return `${minutes} Min ago`;
}
