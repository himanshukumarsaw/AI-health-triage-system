import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              AI-Powered Healthcare
            </div>
            <h1>Get expert second opinions worldwide.</h1>
            <p>
              Connect with top doctors from around the world and get the best advice for your health.
              Our AI-powered triage system ensures you receive priority-based care when you need it most.
            </p>
            <div className="hero-buttons">
              <Link href="/intake" className="btn btn-primary btn-lg">
                Start Assessment
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/imaging" className="btn btn-secondary btn-lg">
                Upload Medical Image
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">50K+</span>
                <span className="hero-stat-label">Patients Served</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">500+</span>
                <span className="hero-stat-label">Expert Doctors</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">98%</span>
                <span className="hero-stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-visual">
              {/* Professional Medical Illustration */}
              <div className="hero-card hero-card-main">
                <div className="hero-card-header">
                  <div className="avatar avatar-lg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="hero-card-name">Dr. Sarah Mitchell</p>
                    <p className="hero-card-role">Cardiologist • Online</p>
                  </div>
                </div>
                <div className="hero-card-rating">
                  <div className="stars">★★★★★</div>
                  <span>5.0 (2,847 reviews)</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                  Book Consultation
                </button>
              </div>

              <div className="hero-card hero-card-floating hero-card-top">
                <div className="status-badge status-success">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  2,500+ Doctors Online
                </div>
              </div>

              <div className="hero-card hero-card-floating hero-card-bottom">
                <div className="status-badge status-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Avg. Response: 5 min
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="container">
          <p className="trust-label">Trusted by leading healthcare institutions</p>
          <div className="trust-logos">
            <div className="trust-logo">Apollo Hospitals</div>
            <div className="trust-logo">Max Healthcare</div>
            <div className="trust-logo">Fortis</div>
            <div className="trust-logo">AIIMS</div>
            <div className="trust-logo">Medanta</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container section" id="features">
        <div className="section-header-centered">
          <span className="section-label">Our Services</span>
          <h2 className="section-title-large">What would you like to do today?</h2>
          <p className="section-description">
            Choose from our comprehensive suite of AI-powered healthcare services designed to provide you with the best care possible.
          </p>
        </div>

        <div className="features-grid">
          {/* Patient Intake */}
          <Link href="/intake" className="feature-card-pro">
            <div className="feature-icon feature-icon-green">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="feature-title">Patient Intake</h3>
            <p className="feature-description">
              Submit symptoms and medical history through our intelligent AI-powered assessment system for personalized health insights.
            </p>
            <span className="feature-link">
              Start Assessment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>

          {/* Medical Imaging AI */}
          <Link href="/imaging" className="feature-card-pro">
            <div className="feature-icon feature-icon-blue">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3 className="feature-title">Medical Imaging AI</h3>
            <p className="feature-description">
              Upload X-rays, CT scans, and MRIs for instant AI-powered analysis with 89% diagnostic accuracy and detailed reports.
            </p>
            <span className="feature-link">
              Upload Images
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>

          {/* Clinician Dashboard */}
          <Link href="/dashboard" className="feature-card-pro">
            <div className="feature-icon feature-icon-purple">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <h3 className="feature-title">Clinician Dashboard</h3>
            <p className="feature-description">
              Real-time patient queue with AI-powered risk stratification, priority alerts, and intelligent scheduling.
            </p>
            <span className="feature-link">
              View Dashboard
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* System Impact Metrics */}
      <section className="metrics-section">
        <div className="container">
          <div className="section-header-centered" style={{ marginBottom: 'var(--space-2xl)' }}>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Performance Metrics</span>
            <h2 className="section-title-large" style={{ color: 'white' }}>Measurable Impact on Healthcare</h2>
          </div>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-value">67%</div>
              <div className="metric-label">Reduction in Triage Time</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">89%</div>
              <div className="metric-label">Diagnostic Accuracy</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">42%</div>
              <div className="metric-label">Decrease in Wait Times</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">24/7</div>
              <div className="metric-label">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container section">
        <div className="section-header-centered">
          <span className="section-label">How It Works</span>
          <h2 className="section-title-large">Simple 3-Step Process</h2>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3 className="step-title">Submit Information</h3>
            <p className="step-description">Enter your symptoms, medical history, or upload medical images through our secure platform.</p>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h3 className="step-title">AI Analysis</h3>
            <p className="step-description">Our advanced AI analyzes your data and generates a comprehensive preliminary assessment.</p>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h3 className="step-title">Get Results</h3>
            <p className="step-description">Receive your triage report with priority level, probable conditions, and recommended next steps.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to experience the future of healthcare?</h2>
            <p>Join thousands of patients who have already benefited from our AI-powered triage system.</p>
            <div className="cta-buttons">
              <Link href="/intake" className="btn btn-light btn-lg">
                Start Free Assessment
              </Link>
              <Link href="/auth" className="btn btn-outline-light btn-lg">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo" style={{ marginBottom: '16px' }}>
                <div className="logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span>AI-TriageMD</span>
              </div>
              <p className="footer-description">
                Intelligent healthcare triage system powered by advanced AI technology.
              </p>
            </div>
            <div className="footer-links">
              <h4>Services</h4>
              <Link href="/intake">Patient Intake</Link>
              <Link href="/imaging">Medical Imaging</Link>
              <Link href="/dashboard">Clinician Dashboard</Link>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <Link href="#">About Us</Link>
              <Link href="#">Careers</Link>
              <Link href="#">Contact</Link>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">HIPAA Compliance</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 AI-TriageMD. All rights reserved.</p>
            <p>Made with care for better healthcare.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
