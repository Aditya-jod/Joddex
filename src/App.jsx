import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './styles/animations.css';
import {
  BrainCircuit,
  ChevronRight,
  Fingerprint,
  Globe,
  Cpu,
  Lock,
  Linkedin,
  Instagram,
  Menu,
  X,
} from 'lucide-react';
import AboutPage from './pages/About';

// Theme
const COLORS = {
  primary: '#001A3D',
  accent: '#3B82F6',
  border: '#E5E7EB',
};

// Motion presets
const SPRING_STIFF = { type: 'spring', stiffness: 800, damping: 70 };
const SPRING_MED = { type: 'spring', stiffness: 500, damping: 40 };

// Grid background
const GridPattern = ({ size = 64, opacity = 0.06 }) => {
  const gridColor = '#001A3D';
  const bg = `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`;
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: bg,
          backgroundSize: `${size}px ${size}px`,
          willChange: 'background-position',
        }}
      />
    </div>
  );
};

// Feature card
function FeatureCard({ icon: Icon, title, description, className = '' }) {
  const ref = useRef(null);
  const [styleVars, setStyleVars] = useState({});

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((rect.height / 2 - y) / rect.height) * 6;
    const ry = ((x - rect.width / 2) / rect.width) * 6;
    setStyleVars({ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)` });
  }
  function handleLeave() {
    setStyleVars({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)' });
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative p-8 rounded-3xl border border-gray-100 border-l-4 bg-white overflow-hidden ${className} card-tilt`}
      style={{ borderLeftColor: COLORS.accent, willChange: 'transform', ...styleVars }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.15 }}
      whileHover={{ scale: 1.02 }}
      transition={SPRING_MED}
    >
      {Icon && (
        <div aria-hidden className="absolute top-4 right-4 pointer-events-none opacity-30 z-0">
          <Icon className="w-24 h-24 text-gray-200" />
        </div>
      )}

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
          {Icon ? <Icon className="w-5 h-5 text-gray-500" /> : null}
        </div>
        <h3 className="text-lg font-bold text-[#001A3D] mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </motion.article>
  );
}

function PricingCard({ tier }) {
  return (
    <motion.div className="p-8 rounded-3xl border bg-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.15 }} transition={SPRING_MED}>
      <h4 className="text-xs font-bold uppercase mb-4 text-gray-500">{tier.name}</h4>
      <div className="h-10 bg-gray-100 rounded-md mb-4 animate-pulse" />
      <div className="inline-block px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-bold text-sm">Launching Soon</div>
    </motion.div>
  );
}

function Navbar({ setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = ['About', 'Products', 'Pricing', 'Contact'];

  return (
    <motion.nav initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING_STIFF }} className="fixed w-full z-50 bg-white/25 backdrop-blur-2xl border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('home')}>
          <div className="w-10 h-10 bg-[#001A3D] rounded-xl flex items-center justify-center">
            <BrainCircuit className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-[#001A3D]">JODDEX</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((n) => (
            <button key={n} onClick={() => setActivePage(n.toLowerCase())} className="text-sm font-semibold text-gray-600 hover:text-[#001A3D]">
              {n}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex">
          <button onClick={() => setActivePage('contact')} className="px-4 py-2 bg-[#001A3D] text-white rounded-lg flex items-center">
            Contact Us <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen((s) => !s)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4">
          {navLinks.map((n) => (
            <button key={n} onClick={() => setActivePage(n.toLowerCase())} className="block w-full text-left py-2">
              {n}
            </button>
          ))}
        </div>
      )}
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-48 pb-32 px-6 lg:px-8 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div className="inline-flex items-center space-x-3 bg-white border border-blue-100 px-4 py-1.5 rounded-full mb-10 shadow-sm" animate={{ scale: [1, 1.02, 1] }} transition={{ type: 'spring', stiffness: 200, damping: 18, repeat: Infinity, repeatType: 'mirror' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
          </span>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">Alpha v1.0.4 Live</span>
        </motion.div>

        <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING_STIFF, delay: 0.08 }} className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#001A3D] mb-6">
          AI that Understands
        </motion.h1>

        <motion.h2 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING_STIFF, delay: 0.18 }} className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 mb-6">
          Resumes Like Humans.
        </motion.h2>

        <motion.p initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING_MED, delay: 0.28 }} className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Joddex replaces keyword matching with <span className="text-[#001A3D] font-semibold">neural context</span>.
        </motion.p>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING_MED, delay: 0.36 }} className="flex justify-center gap-4">
          <motion.button whileHover={{ x: 2 }} className="px-8 py-3 bg-[#001A3D] text-white rounded-lg flex items-center">
            Join the Waitlist <ChevronRight className="w-4 h-4 ml-2" />
          </motion.button>

          <motion.button whileHover={{ scale: 1.02 }} className="px-8 py-3 border rounded-lg">
            View Technical Vision
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    if (activePage !== 'home') {
      const el = document.getElementById(activePage);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePage]);

  return (
    <div className="min-h-screen bg-white text-[#001A3D] font-sans antialiased">
      <Navbar setActivePage={setActivePage} />

      {activePage === 'about' ? (
        <AboutPage setActivePage={setActivePage} />
      ) : (
        <main>
          <div id="home">
            <Hero />
          </div>

          <section id="products" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-bold text-[#001A3D]">Engineered for Precision</h2>
                <p className="text-gray-600">Legacy systems rely on simple strings.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard icon={Fingerprint} title="Identity Neutrality" description="Automated obfuscation of demographic markers." className="md:col-span-1" />
              <FeatureCard icon={Globe} title="Global Context Engine" description="Understands educational equivalence across 180+ countries." className="md:col-span-1" />
              <FeatureCard icon={Cpu} title="Neural Matching" description="Matches candidates based on skill adjacency." className="md:col-span-1" />
            </div>
          </section>

          <section id="pricing" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <PricingCard tier={{ name: 'Launching Soon' }} />
              <PricingCard tier={{ name: 'Launching Soon' }} />
              <PricingCard tier={{ name: 'Launching Soon' }} />
            </div>
          </section>

          <section id="contact" className="py-24 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-[#001A3D] rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="mb-6">Interested in the product or want to discuss partnerships? Reach out and we'll respond within 2 business days.</p>
              <div className="flex justify-center gap-3">
                <input type="email" placeholder="your@work.email" className="px-4 py-3 rounded-lg" />
                <button className="px-6 py-3 bg-white text-[#001A3D] rounded-lg">Contact Us</button>
              </div>
            </div>
          </section>
        </main>
      )}

      <footer className="bg-[#0c121d] text-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">© {new Date().getFullYear()} Joddex Labs. All rights reserved.</div>
      </footer>
    </div>
  );
}
