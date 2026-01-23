import React from 'react';

const Stat = ({ value, label }) => (
  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-md text-center">
    <div className="text-2xl font-bold text-[#001A3D]">{value}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);

export default function AboutPage({ setActivePage }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-[#001A3D] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-widest rounded-md">About</div>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-6 tracking-tight">JODDEX</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">We build the semantic layer for modern hiring — replacing brittle keyword systems with context-aware understanding that surfaces high-potential candidates.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          <div className="space-y-6">
            <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold mb-3">The Semantic Layer for Hiring</h2>
              <p className="text-gray-600 leading-relaxed">Our core vision is to allow software to reason about career trajectories, transferable skills, and role-fit beyond literal keyword matches. This reduces false negatives and uncovers candidates who are a strong cultural and technical fit.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
                <h4 className="font-semibold mb-2">Mission</h4>
                <p className="text-sm text-gray-600">Enable fair, explainable hiring with robust semantic signals.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
                <h4 className="font-semibold mb-2">Approach</h4>
                <p className="text-sm text-gray-600">Hybrid parsing + embedding pipelines with reproducible feature stores.</p>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <button onClick={() => setActivePage && setActivePage('home')} className="px-6 py-3 bg-[#001A3D] text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition-colors">Back to Home</button>
              <a href="#technical-vision" onClick={() => setActivePage && setActivePage('about')} className="px-6 py-3 border border-gray-200 rounded-xl bg-white text-[#001A3D] font-semibold hover:bg-gray-50 transition-colors">View Technical Vision</a>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">By the numbers</h3>
              <div className="grid grid-cols-3 gap-4">
                <Stat value="10k+" label="Resumes / hr" />
                <Stat value="500+" label="Derived signals" />
                <Stat value="Prototype" label="Stability" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Team & Collaboration</h3>
              <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
                <p className="text-gray-600">Small multidisciplinary team of ML researchers, backend engineers, and designers. We're actively seeking partners for design feedback and enterprise trials.</p>
              </div>
            </div>
          </div>
        </div>

        <section id="technical-vision" className="mb-12">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12 bg-[#001A3D] text-white">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Technical Vision</h2>
                <p className="text-gray-100 mb-6 leading-relaxed">Joddex is architected as an API-first, cloud-native service focused on explainability, modularity, and enterprise readiness. Below are the pillars that guide our implementation.</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/8 rounded-xl">
                    <h4 className="font-semibold text-white mb-2">Architecture</h4>
                    <p className="text-white/90 text-sm">Microservices for parsing, vectorization, and ranking. Stateless workers and an isolated data plane enable secure scaling.</p>
                  </div>

                  <div className="p-4 bg-white/8 rounded-xl">
                    <h4 className="font-semibold text-white mb-2">Models & Data</h4>
                    <p className="text-white/90 text-sm">Hybrid pipelines: rule-based extraction + transformer embeddings for semantic similarity and robust entity extraction.</p>
                  </div>

                  <div className="p-4 bg-white/8 rounded-xl">
                    <h4 className="font-semibold text-white mb-2">Security</h4>
                    <p className="text-white/90 text-sm">End-to-end encryption, RBAC, and audit logs. Designed for SOC2 readiness and enterprise integrations.</p>
                  </div>

                  <div className="p-4 bg-white/8 rounded-xl">
                    <h4 className="font-semibold text-white mb-2">Integration</h4>
                    <p className="text-white/90 text-sm">API-first with SDKs and webhooks; low-friction adapters for existing ATS workflows.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-white mb-2">Short-term Roadmap</h4>
                  <ul className="list-disc list-inside text-white/90 space-y-1 text-sm">
                    <li>Model explainability and per-recommendation rationale.</li>
                    <li>Enterprise connectors and SCIM provisioning.</li>
                    <li>Bias audit tooling and fairness reports.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <h4 className="font-semibold mb-2">Want to collaborate?</h4>
            <p className="text-gray-600 text-sm">Join the waitlist or contact us to explore early integration trials.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <h4 className="font-semibold mb-2">Open positions</h4>
            <p className="text-gray-600 text-sm">We're hiring senior ML and backend engineers. Please use the Contact section to get in touch about opportunities.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-gray-600 text-sm">For partnerships or inquiries, please use the Contact section on this site.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
