import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Globe,
  Lock,
  Search,
  LayoutDashboard,
  Timer,
  CheckCircle2,
  ArrowUpRight,
  Fingerprint,
  Menu,
  X,
  Cpu,
  BarChart3,
  Layers,
  Instagram,
  Linkedin
} from 'lucide-react';

import FeatureCard from './components/FeatureCard';
import AboutPage from './pages/About';
import './styles/animations.css';

// --- Theme Constants ---
const COLORS = {
  primary: '#001A3D', // Deep Ink Blue
  accent: '#3B82F6',  // Professional Blue
  textMain: '#111827',
  textMuted: '#4B5563',
  border: '#E5E7EB'
};

// --- Navbar Component ---
const Navbar = ({ activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavLinks = () => {
    const baseLinks = [
      { 
        name: 'About', 
        action: () => setActivePage('about') 
      },
      { 
        name: 'Products', 
        action: activePage === 'about' 
          ? () => { setActivePage('home'); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100); }
          : () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
      },
      { 
        name: 'Pricing', 
        action: activePage === 'about' 
          ? () => { setActivePage('home'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100); }
          : () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
      },
      { 
        name: 'Contact', 
        action: activePage === 'about' 
          ? () => { setActivePage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }
          : () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    ];
    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Brand */}
        <button 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => setActivePage('home')}
          type="button"
        >
          <div className="relative">
            <img 
              src="/Joddex.png" 
              alt="JODDEX Logo" 
              className="w-10 h-10 rounded-xl relative z-10 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#001A3D]">JODDEX</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={item.action}
              className="px-5 py-2 text-[13px] font-semibold text-gray-500 hover:text-[#001A3D] transition-colors tracking-wide uppercase relative group"
            >
              {item.name}
              <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#001A3D] transition-all duration-500 group-hover:w-1/2 group-hover:left-1/4"></span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          <button onClick={activePage === 'about' ? () => { setActivePage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); } : () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2.5 bg-[#001A3D] text-white text-[13px] rounded-lg font-bold hover:bg-blue-600 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-500 active:scale-95 shadow-lg shadow-blue-900/10 uppercase tracking-wider flex items-center">
            Contact Us
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#001A3D]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                item.action();
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-bold text-gray-600 py-2 uppercase tracking-wider"
            >
              {item.name}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
               <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="w-full py-3 text-center text-sm font-bold bg-[#001A3D] text-white rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-500">Contact Us</button>
            </div>
        </div>
      )}
    </nav>
  );
};

// --- Hero Section ---
const Hero = ({ setActivePage, scrollY }) => (
  <section className="relative pt-48 pb-32 px-6 lg:px-8 overflow-visible bg-white">
    {/* Technical Background Pattern - Parallax */}
    <div 
      className="absolute inset-0 z-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: 'radial-gradient(#001A3D 1px, transparent 1px)', 
        backgroundSize: '32px 32px',
        transform: `translateY(${scrollY * 0.3}px)`
      }}
    >
    </div>
    
    {/* Ambient Glows - Parallax */}
    <div 
      className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 -z-10 pointer-events-none"
      style={{ transform: `translateY(${scrollY * -0.2}px) translateX(33.333%) scale(${1 + scrollY * 0.0001})` }}
    ></div>
    <div 
      className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gray-100/60 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 -z-10 pointer-events-none"
      style={{ transform: `translateY(${scrollY * 0.1}px) translateX(-25%) scale(${1 + scrollY * 0.00005})` }}
    ></div>

    {/* Proof Snippets - Glassmorphism, Absolute Positioning, Bobbing Animation, Lower Z-Index */}
    <div className="absolute top-[25%] left-[20%] z-1 proof-badge delay-0 float-1 flex items-center gap-2 bg-[#001A3D] backdrop-blur-lg px-4 py-2 rounded-full shadow-sm border border-gray-100">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-sm font-semibold text-white">No Keyword Matching</span>
    </div>
    <div className="absolute top-[25%] right-[20%] z-1 proof-badge delay-1 float-2 flex items-center gap-2 bg-[#001A3D] backdrop-blur-lg px-4 py-2 rounded-full shadow-sm border border-gray-100">
      <BarChart3 className="w-4 h-4 text-blue-200" />
      <span className="text-sm font-semibold text-white">99.2% Accuracy</span>
    </div>
    <div className="absolute bottom-[25%] left-[20%] z-1 proof-badge delay-2 float-3 flex items-center gap-2 bg-[#001A3D] backdrop-blur-lg px-4 py-2 rounded-full shadow-sm border border-gray-100">
      <Timer className="w-4 h-4 text-purple-200" />
      <span className="text-sm font-semibold text-white">0.42s Parse Time</span>
    </div>
    <div className="absolute bottom-[25%] right-[20%] z-1 proof-badge delay-3 float-4 flex items-center gap-2 bg-[#001A3D] backdrop-blur-lg px-4 py-2 rounded-full shadow-sm border border-gray-100">
      <ShieldCheck className="w-4 h-4 text-green-200" />
      <span className="text-sm font-semibold text-white">Bias Shield Active</span>
    </div>
    <div className="absolute left-[10%] top-[50%] z-1 proof-badge delay-4 float-5 flex items-center gap-2 bg-[#001A3D] backdrop-blur-lg px-4 py-2 rounded-full shadow-sm border border-gray-100">
      <Zap className="w-4 h-4 text-yellow-200" />
      <span className="text-sm font-semibold text-white">Neural Context</span>
    </div>
    <div className="absolute right-[10%] top-[50%] z-1 proof-badge delay-5 float-6 flex items-center gap-2 bg-[#001A3D] backdrop-blur-lg px-4 py-2 rounded-full shadow-sm border border-gray-100">
      <Fingerprint className="w-4 h-4 text-red-200" />
      <span className="text-sm font-semibold text-white">Identity Neutrality</span>
    </div>

    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="inline-flex items-center space-x-3 bg-white border border-blue-100 px-4 py-1.5 rounded-full mb-10 shadow-lg animate-bounce">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </span>
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">Beyond Matching. Real Intelligence.</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#001A3D] mb-8 tracking-[-0.03em] leading-[0.95]">
        <span className="slide-left inline-block" style={{ animationDuration: '3000ms', animationDelay: '300ms' }}>AI that Understands</span>
        <br />
        <span className="slide-right inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200" style={{ animationDuration: '3000ms', animationDelay: '600ms' }}>
          Resumes Like Humans<span className="blink">.</span>
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
        Joddex replaces keyword matching with <span className="text-[#001A3D] font-semibold">neural context</span>. We identify the top-tier talent that legacy ATS systems overlook.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button className="w-full sm:w-auto px-10 py-4 bg-[#001A3D] text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-900/10 hover:bg-black hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 group">
          Join the Waitlist
          <ChevronRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => {
            if (setActivePage) setActivePage('about');
            setTimeout(() => {
              const el = document.getElementById('technical-vision');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
          }}
          className="w-full sm:w-auto px-10 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-sm hover:border-[#001A3D] hover:bg-gray-50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-500">
          View Technical Vision
        </button>
        
      </div>

      
    </div>
  </section>
);

// --- Feature Section ---

// --- Pricing Card ---
const PricingCard = ({ tier }) => (
  <div className={`flex flex-col p-8 rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl`}>
    <div className="mb-4">
      <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 text-gray-400`}>
        {tier.name}
      </h3>
      <div className="inline-block px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-bold text-sm">Launching Soon</div>
    </div>

    <div className="space-y-3 mb-6 flex-grow text-gray-600">
      {tier.features && tier.features.map((f, i) => (
        <div key={i} className="flex items-center text-[13px] font-medium text-gray-700">
          <div className="w-1.5 h-1.5 rounded-full mr-3 bg-blue-900"></div>
          {f}
        </div>
      ))}
    </div>

    <button className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#001A3D] text-white hover:bg-blue-700 border border-[#001A3D]`}>
      Launching Soon
    </button>
  </div>
);

// --- Main App Component ---
export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [firstVisit, setFirstVisit] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // First-visit experience and global reveal trigger
  useEffect(() => {
    try {
      const visited = localStorage.getItem('joddex_first_visit_v1');
      if (!visited) {
        setFirstVisit(true);
        localStorage.setItem('joddex_first_visit_v1', '1');
      } else {
        // not first visit, trigger quick reveals
        setTimeout(() => triggerGlobalReveal(), 120);
      }
    } catch (e) {
      // ignore storage errors
      setTimeout(() => triggerGlobalReveal(), 120);
    }
  }, []);

  // IntersectionObserver: reveal elements as they enter viewport (works on reload and scroll)
  useEffect(() => {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    const selector = '.reveal, .slide-left, .slide-right, .card-3d, .card-3d-strong';
    document.querySelectorAll(selector).forEach(el => io.observe(el));

    // Trigger initial reveals for elements in view
    setTimeout(() => {
      document.querySelectorAll('.reveal, .slide-left, .slide-right, .card-3d, .card-3d-strong').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view');
        }
      });
    }, 100);

    return () => io.disconnect();
  }, []);

  // Pointer-driven parallax: set CSS variables on root for dramatic motion
  useEffect(() => {
    let raf = null;
    function onPointer(e) {
      const x = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? window.innerWidth/2;
      const y = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY) ?? window.innerHeight/2;
      const px = (x / window.innerWidth - 0.5) * 2; // -1..1
      const py = (y / window.innerHeight - 0.5) * 2; // -1..1

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--tiltX', (px * 12).toFixed(2));
        document.documentElement.style.setProperty('--tiltY', (-py * 12).toFixed(2));
        document.documentElement.style.setProperty('--mx', `${Math.round((px * 50) + 50)}%`);
        document.documentElement.style.setProperty('--my', `${Math.round(((-py) * 50) + 50)}%`);
      });
    }

    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function triggerGlobalReveal() {
    const selector = ['.slide-left', '.slide-right', '.reveal', '.card-3d', '.card-3d-strong'].join(', ');
    const els = Array.from(document.querySelectorAll(selector));
    els.forEach((el, i) => {
      const base = Math.min(i * 200, 2000);
      el.style.setProperty('--delay', `${base}ms`);
      setTimeout(() => el.classList.add('in-view'), 60 + base);
    });
  }

  function handleEnterSite() {
    // fade overlay then trigger reveals
    const ov = document.getElementById('first-visit-overlay');
    if (ov) {
      ov.classList.add('hidden');
      setTimeout(() => setFirstVisit(false), 420);
    } else {
      setFirstVisit(false);
    }
    setTimeout(() => triggerGlobalReveal(), 460);
  }

  return (
    <div className="min-h-screen bg-white text-[#001A3D] selection:bg-blue-100 selection:text-[#001A3D] font-sans antialiased">
      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-[#001A3D] rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl font-bold text-[#001A3D]">Loading JODDEX...</div>
          </div>
        </div>
      )}

      {firstVisit && (
        <div id="first-visit-overlay" className="first-visit-overlay overlay-fade">
          <div>
            <div className="brand">JODDEX</div>
            <div className="subtitle">Beyond Matching. Real Intelligence.</div>
            <button onClick={handleEnterSite} className="enter-btn">Enter site</button>
          </div>
        </div>
      )}

      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      {activePage === 'about' ? (
        <AboutPage setActivePage={setActivePage} />
      ) : (
        <main>
          <div id="home">
            <Hero setActivePage={setActivePage} scrollY={scrollY} />
          </div>

          {/* Products Section - Bento Grid Layout */}
          <section id="products" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold tracking-tight mb-4 text-[#001A3D]">Engineered for Precision</h2>
                <p className="text-gray-500 font-medium text-lg">Legacy systems rely on simple strings. Joddex builds a cognitive understanding of career trajectories.</p>
              </div>
              <button className="text-[13px] font-bold text-[#001A3D] border-b border-[#001A3D] pb-0.5 flex items-center group hover:opacity-70 transition-opacity">
                Explore Documentation <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={Fingerprint}
                title="Identity Neutrality"
                description="Automated obfuscation of demographic markers. Our engine strips bias before the resume ever hits the hiring manager's dashboard."
                className="md:col-span-1"
                reveal="left"
                intensity="strong"
              />
              <FeatureCard 
                icon={Globe}
                title="Global Context Engine"
                description="Understands educational equivalence across 180+ countries. It knows that a GPA from a specific university in Berlin matches your requirements."
                className="md:col-span-2"
                reveal="up"
              />
              <FeatureCard 
                icon={Cpu}
                title="Neural Matching"
                description="Matches candidates based on skill adjacency. A Java developer can be a great C# hire; Joddex knows why."
                className="md:col-span-2"
                reveal="right"
              />
              <FeatureCard 
                icon={Lock}
                title="Secure Pipeline"
                description="Enterprise-grade data encryption for every candidate file. SOC2 Type II ready architecture."
                className="md:col-span-1"
                reveal="right"
                intensity="strong"
              />
            </div>
          </section>

        {/* About Section - Split Layout with Enhanced Visual */}
        <section id="about" className="py-32 bg-[#F9FAFB] border-y border-gray-100 relative overflow-hidden">
          {/* Decorative Grid */}
           <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#001A3D 1px, transparent 1px), linear-gradient(90deg, #001A3D 1px, transparent 1px)', backgroundSize: '64px 64px' }}>
           </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-widest rounded-md mb-6">Our Mission</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-[#001A3D]">The Semantic Layer for Hiring</h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                We are building the infrastructure for the next generation of hiring. Our prototype focuses on the "Semantic Layer"—the ability for software to understand that a candidate with "Growth Experience" is a perfect fit for a "Marketing Lead" role even without the exact keywords.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: 'Neural Context', desc: 'Ranking based on 500+ derived data points.' },
                  { title: 'Bias Shield', desc: 'De-identification protocols at the kernel level.' },
                  { title: 'Instant Parsing', desc: 'Process 10,000+ applications in under 60 seconds.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5 group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001A3D] text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced "Dashboard" Visual */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-gray-100 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

              <div className="relative p-8 bg-white rounded-2xl border border-gray-100 dashboard-preview-shadow hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#001A3D]">Dashboard Preview</h3>
                    <p className="text-sm text-gray-500">Realtime insights from the semantic layer</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400">Updated</div>
                    <div className="px-3 py-1 bg-gray-50 rounded-full text-sm font-medium">2m ago</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-400 uppercase tracking-widest">Matches / hr</div>
                    <div className="text-2xl font-bold text-[#001A3D]">1,248</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-400 uppercase tracking-widest">Avg Parse Time</div>
                    <div className="text-2xl font-bold text-[#001A3D]">0.42s</div>
                  </div>
                  <div className="col-span-2 p-4 bg-white rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500 mb-2">Top Signals</div>
                    <div className="flex gap-3 flex-wrap">
                      <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">Neural Context</div>
                      <div className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-semibold">Bias Shield</div>
                      <div className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-semibold">Skill Adjacency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Pricing Section (simple fallback) */}
        <section id="pricing" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard tier={{ name: 'Launching Soon', price: '$0', features: ['Early access', 'Email support'] }} />
            <PricingCard tier={{ name: 'Launching Soon', price: 'Contact', features: ['Enterprise trial', 'SLA'] }} recommended />
            <PricingCard tier={{ name: 'Launching Soon', price: '$49', features: ['Full features', 'Priority support'] }} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto bg-[#001A3D] rounded-3xl p-16 md:p-20 text-center text-white shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">We're currently in prototype stage. For inquiries, partnerships, or to join our waitlist, please reach out through our social channels.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              <a href="https://www.linkedin.com/company/joddex" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-500 flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a href="https://www.instagram.com/joddex_official/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-xl text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-500 flex items-center gap-2">
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </div>
            <p className="text-sm text-blue-200 mt-6">Full contact form coming soon with our official launch.</p>
          </div>
          </section>
        </main>
      )}

      <footer className="bg-[#0f1724] text-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-xl font-bold text-white">JODDEX</div>
            <div className="text-sm text-gray-400">AI-driven hiring infrastructure — prototype stage</div>
          </div>

          <div className="hidden md:block">
            <nav className="flex gap-6 justify-center">
              <button onClick={() => setActivePage('about')} className="text-sm text-gray-300 hover:text-white">About</button>
              <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-300 hover:text-white">Products</button>
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-300 hover:text-white">Pricing</button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-300 hover:text-white">Contact</button>
            </nav>
          </div>

          <div className="flex items-center justify-end gap-4">
            <a href="https://www.instagram.com/joddex_official/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/joddex" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 text-center mt-8 text-sm text-gray-500">© {new Date().getFullYear()} Joddex Labs. All rights reserved.</div>
      </footer>
    </div>
  );
}
