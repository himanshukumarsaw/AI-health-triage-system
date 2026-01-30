import "./globals.css";
import Header from "./components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-health-triage-system.netlify.app';

export const metadata = {
  title: {
    default: "AI-TriageMD - Intelligent Healthcare Triage System",
    template: "%s | AI-TriageMD",
  },
  description: "AI-powered medical triage system with rapid symptom analysis, priority-based care, and clinical decision support.",
  keywords: ["healthcare", "AI", "triage", "medical", "diagnosis", "symptoms", "health assessment"],
  authors: [{ name: "AI-TriageMD Team" }],
  creator: "AI-TriageMD",
  metadataBase: new URL(siteUrl),

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AI-TriageMD",
    title: "AI-TriageMD - Intelligent Healthcare Triage System",
    description: "AI-powered medical triage system with rapid symptom analysis, priority-based care, and clinical decision support.",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "AI-TriageMD - Intelligent Healthcare Triage System",
    description: "AI-powered medical triage system with rapid symptom analysis and clinical decision support.",
  },

  // PWA & Mobile
  manifest: "/manifest.json",
  themeColor: "#059669",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-green-50 text-slate-900">
        <Header />
        <main className="page-content min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
