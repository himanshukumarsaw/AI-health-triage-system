import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "AI-TriageMD - Intelligent Healthcare Triage System",
  description: "AI-powered medical triage system with rapid symptom analysis, priority-based care, and clinical decision support.",
  keywords: "healthcare, AI, triage, medical, diagnosis, symptoms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="page-content">
          {children}
        </main>
      </body>
    </html>
  );
}
