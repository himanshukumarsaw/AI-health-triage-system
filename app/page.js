import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              AI-Powered Healthcare
            </div>
            <h1 className="text-5xl font-bold text-slate-900 font-poppins leading-tight">
              Get expert second opinions worldwide.
            </h1>
            <p className="text-lg text-slate-600">
              Connect with top doctors from around the world and get the best advice for your health.
              Our AI-powered triage system ensures you receive priority-based care when you need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/intake" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                Start Assessment
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/imaging" className="bg-white hover:bg-slate-50 text-emerald-600 border-2 border-emerald-600 px-8 py-3 rounded-lg font-bold transition-colors">
                Upload Medical Image
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div>
                <p className="text-2xl font-bold text-emerald-600 font-poppins">50K+</p>
                <p className="text-sm text-slate-600">Patients Served</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600 font-poppins">500+</p>
                <p className="text-sm text-slate-600">Expert Doctors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600 font-poppins">98%</p>
                <p className="text-sm text-slate-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl p-8 shadow-lg">
              <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Dr. Sarah Mitchell</p>
                    <p className="text-sm text-slate-600">Cardiologist • Online</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">5.0 (2,847 reviews)</span>
                </div>
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-bold transition-colors">
                  Book Consultation
                </button>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-full px-4 py-2 shadow-lg text-sm font-medium text-emerald-600 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                2,500+ Doctors Online
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-full px-4 py-2 shadow-lg text-sm font-medium text-blue-600 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Avg. Response: 5 min
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-600 font-medium mb-8">Trusted by leading healthcare institutions</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-slate-600 font-semibold">Apollo Hospitals</div>
            <div className="text-slate-600 font-semibold">Max Healthcare</div>
            <div className="text-slate-600 font-semibold">Fortis</div>
            <div className="text-slate-600 font-semibold">AIIMS</div>
            <div className="text-slate-600 font-semibold">Medanta</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16" id="features">
        <div className="text-center space-y-6 mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">Our Services</span>
          <h2 className="text-4xl font-bold text-slate-900 font-poppins">What would you like to do today?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our comprehensive suite of AI-powered healthcare services designed to provide you with the best care possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Patient Intake */}
          <Link href="/intake" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border border-slate-100 hover:border-emerald-300 cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:from-emerald-200 group-hover:to-green-200 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Patient Intake</h3>
            <p className="text-slate-600 mb-4">
              Submit symptoms and medical history through our intelligent AI-powered assessment system for personalized health insights.
            </p>
            <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
              Start Assessment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>

          {/* Medical Imaging AI */}
          <Link href="/imaging" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border border-slate-100 hover:border-blue-300 cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Medical Imaging AI</h3>
            <p className="text-slate-600 mb-4">
              Upload X-rays, CT scans, and MRIs for instant AI-powered analysis with 89% diagnostic accuracy and detailed reports.
            </p>
            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
              Analyze Images
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>

          {/* Clinician Dashboard */}
          <Link href="/dashboard" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border border-slate-100 hover:border-purple-300 cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-6 group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Clinician Dashboard</h3>
            <p className="text-slate-600 mb-4">
              Real-time patient queue with AI-powered risk stratification, priority alerts, and intelligent scheduling.
            </p>
            <span className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
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
      <section className="bg-gradient-to-r from-emerald-600 to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-6 mb-12">
            <span className="inline-block bg-emerald-500 bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">Performance Metrics</span>
            <h2 className="text-4xl font-bold text-white font-poppins">Measurable Impact on Healthcare</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <p className="text-5xl font-bold font-poppins mb-2">67%</p>
              <p className="text-emerald-100">Reduction in Triage Time</p>
            </div>
            <div className="text-center text-white">
              <p className="text-5xl font-bold font-poppins mb-2">89%</p>
              <p className="text-emerald-100">Diagnostic Accuracy</p>
            </div>
            <div className="text-center text-white">
              <p className="text-5xl font-bold font-poppins mb-2">42%</p>
              <p className="text-emerald-100">Decrease in Wait Times</p>
            </div>
            <div className="text-center text-white">
              <p className="text-5xl font-bold font-poppins mb-2">24/7</p>
              <p className="text-emerald-100">AI Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">How It Works</span>
          <h2 className="text-4xl font-bold text-slate-900 font-poppins">Simple 3-Step Process</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-100">
            <div className="text-4xl font-bold text-emerald-600 font-poppins mb-4">01</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Submit Information</h3>
            <p className="text-slate-600">Enter your symptoms, medical history, or upload medical images through our secure platform.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-100">
            <div className="text-4xl font-bold text-blue-600 font-poppins mb-4">02</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Analysis</h3>
            <p className="text-slate-600">Our advanced AI analyzes your data and generates a comprehensive preliminary assessment.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-100">
            <div className="text-4xl font-bold text-purple-600 font-poppins mb-4">03</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Get Results</h3>
            <p className="text-slate-600">Receive your triage report with priority level, probable conditions, and recommended next steps.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white font-poppins">Ready to experience the future of healthcare?</h2>
          <p className="text-lg text-emerald-100">Join thousands of patients who have already benefited from our AI-powered triage system.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/intake" className="bg-white text-emerald-600 hover:bg-slate-50 px-8 py-3 rounded-lg font-bold transition-colors">
              Start Free Assessment
            </Link>
            <Link href="/auth" className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-lg font-bold transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 rounded-lg p-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span className="font-bold text-white text-lg">AI-TriageMD</span>
              </div>
              <p className="text-slate-400">
                Intelligent healthcare triage system powered by advanced AI technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <div className="space-y-2">
                <Link href="/intake" className="text-slate-400 hover:text-white transition-colors">Patient Intake</Link>
                <Link href="/imaging" className="text-slate-400 hover:text-white transition-colors block">Medical Imaging</Link>
                <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors block">Clinician Dashboard</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="#" className="text-slate-400 hover:text-white transition-colors block">About Us</Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors block">Careers</Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors block">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="#" className="text-slate-400 hover:text-white transition-colors block">Privacy Policy</Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors block">Terms of Service</Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors block">HIPAA Compliance</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>© 2026 AI-TriageMD. All rights reserved.</p>
          <p className="mt-2">Made with care for better healthcare.</p>
        </div>
      </footer>
    </>
  );
}
