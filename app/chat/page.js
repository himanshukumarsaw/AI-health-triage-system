'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ChatPage() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! 👋 I'm your AI Health Assistant. I can help you understand your symptoms, provide health information, and guide you to appropriate care.\n\nHow can I help you today? You can:\n• Describe your symptoms\n• Ask about health conditions\n• Get general wellness advice\n\n⚠️ Note: I provide general health information only. Always consult a healthcare professional for medical advice."
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // AI Response Generator
    const generateAIResponse = async (userMessage) => {
        const message = userMessage.toLowerCase();

        // Simulated AI response delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Symptom-based responses
        if (message.includes('headache') || message.includes('head pain')) {
            return `I understand you're experiencing headache. Let me help you understand this better.

**Common causes of headaches include:**
• Tension or stress
• Dehydration
• Lack of sleep
• Eye strain
• Migraine

**Immediate relief suggestions:**
1. Rest in a quiet, dark room
2. Drink water to stay hydrated
3. Apply a cold or warm compress
4. Take over-the-counter pain relievers (if appropriate)

**When to seek immediate care:**
🚨 If accompanied by fever, stiff neck, confusion, or sudden severe onset

Would you like me to ask more questions to better understand your symptoms?`;
        }

        if (message.includes('fever') || message.includes('temperature')) {
            return `Fever is your body's natural response to infection. Let me help assess this.

**Key questions to consider:**
• What is your temperature reading?
• How long have you had the fever?
• Are there other symptoms like cough, body aches, or fatigue?

**General guidance:**
• Stay hydrated with plenty of fluids
• Rest as much as possible
• Light clothing can help regulate temperature
• Over-the-counter fever reducers may help

**Seek medical attention if:**
🚨 Temperature is above 103°F (39.4°C)
🚨 Fever lasts more than 3 days
🚨 Accompanied by severe headache, rash, or difficulty breathing

Can you tell me more about your symptoms?`;
        }

        if (message.includes('cough') || message.includes('cold') || message.includes('flu')) {
            return `Cough and cold symptoms are very common. Let me provide some guidance.

**Types of cough:**
• Dry cough - often viral or allergic
• Wet/productive cough - may indicate infection

**Home remedies that may help:**
1. Warm liquids like tea with honey
2. Steam inhalation
3. Throat lozenges
4. Adequate rest
5. Humidifier in your room

**Warning signs to watch:**
🚨 Coughing blood
🚨 Difficulty breathing
🚨 Persistent cough > 2 weeks
🚨 High fever with chills

Would you like to describe your cough in more detail?`;
        }

        if (message.includes('stomach') || message.includes('nausea') || message.includes('vomiting') || message.includes('diarrhea')) {
            return `Gastrointestinal symptoms can have various causes. Let me help.

**Possible causes:**
• Food poisoning
• Viral gastroenteritis (stomach flu)
• Dietary issues
• Stress or anxiety

**Immediate care:**
1. **Hydration is key** - small sips of water or electrolyte drinks
2. BRAT diet (Bananas, Rice, Applesauce, Toast) when feeling better
3. Avoid dairy and fatty foods temporarily
4. Rest your digestive system

**Seek medical care if:**
🚨 Severe abdominal pain
🚨 Blood in vomit or stool
🚨 Signs of dehydration (dark urine, dizziness)
🚨 Symptoms last > 48 hours

How long have you been experiencing these symptoms?`;
        }

        if (message.includes('chest pain') || message.includes('heart')) {
            return `⚠️ **Important Notice about Chest Pain**

Chest pain can have many causes, but some require immediate attention.

**Seek emergency care (call 112) immediately if you have:**
🚨 Crushing or squeezing chest pain
🚨 Pain radiating to arm, jaw, or back
🚨 Shortness of breath
🚨 Sweating, nausea, or dizziness with chest pain

**Less urgent causes may include:**
• Muscle strain
• Acid reflux (GERD)
• Anxiety or panic attack
• Costochondritis (rib inflammation)

**If your pain is mild and not emergency-related:**
Can you describe the pain? (Sharp, dull, burning, pressure)
When did it start?
What makes it better or worse?

Please seek immediate medical attention if you have any doubt.`;
        }

        if (message.includes('anxiety') || message.includes('stress') || message.includes('worried') || message.includes('mental')) {
            return `I hear you. Mental health is just as important as physical health. 💙

**Immediate calming techniques:**
1. **Deep breathing**: Inhale 4 seconds, hold 4, exhale 4
2. **Grounding**: Name 5 things you see, 4 you hear, 3 you feel
3. **Progressive muscle relaxation**

**Long-term wellness tips:**
• Regular exercise (even 20 min walks help)
• Quality sleep (7-9 hours)
• Limit caffeine and alcohol
• Connect with supportive people
• Consider mindfulness or meditation apps

**Professional support:**
If anxiety is affecting your daily life, speaking with a mental health professional can be very helpful.

Would you like to talk more about what's causing your stress?`;
        }

        if (message.includes('tired') || message.includes('fatigue') || message.includes('exhausted') || message.includes('weak')) {
            return `Fatigue is a common concern that can have many causes.

**Common causes of tiredness:**
• Poor sleep quality
• Stress or mental health
• Nutritional deficiencies (iron, B12, vitamin D)
• Dehydration
• Underlying health conditions

**Energy-boosting tips:**
1. Aim for 7-9 hours of sleep
2. Stay hydrated throughout the day
3. Regular physical activity (paradoxically boosts energy)
4. Balanced diet with whole foods
5. Limit screen time before bed

**When to see a doctor:**
• Fatigue lasting more than 2 weeks
• Accompanied by unexplained weight loss
• Severe weakness or dizziness
• Other concerning symptoms

Have you noticed any patterns in your fatigue?`;
        }

        if (message.includes('thank') || message.includes('thanks')) {
            return `You're welcome! 😊 I'm glad I could help.

Remember:
• Stay hydrated and get adequate rest
• Don't hesitate to seek professional medical advice for persistent or concerning symptoms
• You can always come back to chat if you have more questions

Take care of yourself! Is there anything else you'd like to know?`;
        }

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return `Hello! 👋 I'm here to help you with your health concerns.

Feel free to tell me about:
• Any symptoms you're experiencing
• Health questions you have
• General wellness advice you need

What would you like to discuss today?`;
        }

        if (message.includes('bye') || message.includes('goodbye')) {
            return `Take care! 👋 Remember to:
• Stay hydrated
• Get plenty of rest
• Seek medical attention if symptoms worsen

Feel free to come back anytime you have health questions. Stay healthy! 🌟`;
        }

        // Default response for unrecognized queries
        return `Thank you for sharing that with me. To better assist you, could you please provide more details?

**I can help with:**
• Symptom assessment and guidance
• General health information
• When to seek medical care
• Wellness and prevention tips

**Please tell me:**
1. What specific symptoms are you experiencing?
2. When did they start?
3. How severe are they on a scale of 1-10?
4. Any other relevant information?

The more details you share, the better I can guide you.`;
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setInputValue('');

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // Show typing indicator
        setIsTyping(true);

        // Generate AI response
        const aiResponse = await generateAIResponse(userMessage);

        setIsTyping(false);

        // Add AI response
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickPrompts = [
        "I have a headache",
        "Feeling feverish",
        "Stomach ache",
        "Feeling anxious",
        "Very tired lately"
    ];

    return (
        <div className="container" style={{
            height: 'calc(100vh - 150px)',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 'var(--space-lg)'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-lg)',
                paddingTop: 'var(--space-lg)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'var(--color-primary-gradient)',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        🤖
                    </div>
                    <div>
                        <h1 style={{
                            fontFamily: 'var(--font-family-display)',
                            fontSize: 'var(--font-size-xl)',
                            fontWeight: 700,
                            margin: 0
                        }}>
                            AI Health Assistant
                        </h1>
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-xs)'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                background: 'var(--color-primary)',
                                borderRadius: '50%',
                                animation: 'pulse 2s infinite'
                            }}></span>
                            Online • Ready to help
                        </p>
                    </div>
                </div>
                <Link href="/" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                    ← Back
                </Link>
            </div>

            {/* Chat Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-lg)',
                marginBottom: 'var(--space-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
            }}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                            marginBottom: 'var(--space-md)'
                        }}
                    >
                        <div style={{
                            maxWidth: '80%',
                            padding: 'var(--space-md) var(--space-lg)',
                            borderRadius: message.role === 'user'
                                ? 'var(--radius-lg) var(--radius-lg) 0 var(--radius-lg)'
                                : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) 0',
                            background: message.role === 'user'
                                ? 'var(--color-primary-gradient)'
                                : 'var(--color-surface-light)',
                            color: message.role === 'user' ? 'white' : 'var(--color-text-primary)',
                            boxShadow: 'var(--shadow-sm)',
                            whiteSpace: 'pre-line',
                            lineHeight: 1.6
                        }}>
                            {message.content}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginBottom: 'var(--space-md)'
                    }}>
                        <div style={{
                            padding: 'var(--space-md) var(--space-lg)',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--color-surface-light)',
                            display: 'flex',
                            gap: '6px'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                background: 'var(--color-primary)',
                                borderRadius: '50%',
                                animation: 'pulse 1s infinite'
                            }}></span>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                background: 'var(--color-primary)',
                                borderRadius: '50%',
                                animation: 'pulse 1s infinite 0.2s'
                            }}></span>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                background: 'var(--color-primary)',
                                borderRadius: '50%',
                                animation: 'pulse 1s infinite 0.4s'
                            }}></span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
                <div style={{
                    display: 'flex',
                    gap: 'var(--space-sm)',
                    flexWrap: 'wrap',
                    marginBottom: 'var(--space-md)'
                }}>
                    {quickPrompts.map((prompt, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setInputValue(prompt);
                                inputRef.current?.focus();
                            }}
                            style={{
                                padding: '8px 16px',
                                background: 'var(--color-white)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: 'var(--font-size-sm)',
                                cursor: 'pointer',
                                transition: 'all var(--transition-base)'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.borderColor = 'var(--color-primary)';
                                e.target.style.background = 'rgba(16, 185, 129, 0.05)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.borderColor = 'var(--color-border)';
                                e.target.style.background = 'var(--color-white)';
                            }}
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            )}

            {/* Input Area */}
            <div style={{
                display: 'flex',
                gap: 'var(--space-md)',
                alignItems: 'flex-end'
            }}>
                <div style={{
                    flex: 1,
                    background: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--color-border)',
                    padding: 'var(--space-md)',
                    transition: 'border-color var(--transition-base)'
                }}>
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Describe your symptoms or ask a health question..."
                        style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            resize: 'none',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: 1.5,
                            minHeight: '48px',
                            maxHeight: '120px',
                            fontFamily: 'inherit'
                        }}
                        rows={1}
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    style={{
                        width: '56px',
                        height: '56px',
                        background: inputValue.trim() && !isTyping
                            ? 'var(--color-primary-gradient)'
                            : 'var(--color-border)',
                        border: 'none',
                        borderRadius: 'var(--radius-lg)',
                        cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        boxShadow: inputValue.trim() && !isTyping ? 'var(--shadow-md)' : 'none',
                        transition: 'all var(--transition-base)'
                    }}
                >
                    ➤
                </button>
            </div>
        </div>
    );
}
