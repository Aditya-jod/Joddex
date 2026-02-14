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
  Sun,
  Moon,
  Instagram,
  Linkedin
} from 'lucide-react';

import FeatureCard from './components/feature-card';
import AboutPage from './pages/about';
import './styles/animations.css';
import AnimatedBG from './components/animated-bg';

// --- Theme Constants ---
const PALETTE = {
  bg: '#000000',          // true black
  surface: '#0C0C0C',     // off-black for cards
  heading: '#FFFFFF',
  body: '#E0E0E0',
  accent: '#7DD3FC',      // refined cyan accent
  muted: '#A3A3A3'
};

// --- Navbar Component ---
const Navbar = ({ activePage, setActivePage, theme, toggleTheme }) => {
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

  const navShell = theme === 'dark'
    ? (isScrolled
        ? 'bg-black/90 backdrop-blur-xl py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
        : 'bg-black/70 backdrop-blur-xl py-6')
    : (isScrolled
        ? 'bg-white/90 backdrop-blur-xl py-3 shadow-sm'
        : 'bg-transparent py-6');

  const linkColor = theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black';
  const brandColor = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${navShell}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Brand */}
        <button 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => setActivePage('home')}
          type="button"
        >
          <div className="relative group">
            <img 
              src="/Joddex-logo-without-word.png" 
              alt="JODDEX Logo" 
              className="w-10 h-10 rounded-xl relative z-10 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#7DD3FC] rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
          <span className={`text-xl font-bold tracking-tight ${brandColor}`}>JODDEX</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={item.action}
              className={`px-5 py-2 text-[13px] font-semibold ${linkColor} transition-colors tracking-wide uppercase relative group`}
            >
              {item.name}
              <span className={`absolute bottom-1 left-1/2 w-0 h-0.5 transition-all duration-500 group-hover:w-1/2 group-hover:left-1/4 ${theme === 'dark' ? 'bg-white' : 'bg-[#001A3D]'}`}></span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-200 ${theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button onClick={activePage === 'about' ? () => { setActivePage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); } : () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className={`px-6 py-2.5 text-[13px] rounded-lg font-bold hover:scale-105 transition-all duration-200 active:scale-95 uppercase tracking-wider flex items-center shadow-[0_15px_40px_rgba(0,0,0,0.4)] ${theme === 'dark' ? 'bg-[#7DD3FC] text-black hover:brightness-105' : 'bg-[#7DD3FC] text-black hover:brightness-105'}`}>
            Contact Us
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full ${theme === 'dark' ? 'bg-[#0c0c0c] border-b border-gray-800' : 'bg-white border-b border-gray-100'} p-6 flex flex-col space-y-4 shadow-xl`}>
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                item.action();
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-bold py-2 uppercase tracking-wider ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}
            >
              {item.name}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <button
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
              className={`w-full py-3 text-center text-sm font-bold rounded-lg transition-all duration-500 flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-gray-100 text-[#001A3D] hover:bg-gray-200'}`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="w-full py-3 text-center text-sm font-bold bg-[#7DD3FC] text-black rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-[#7DD3FC]/40 transition-all duration-300">Contact Us</button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Hero Section ---
const Hero = ({ setActivePage, scrollY, theme }) => (
  <section className={`relative pt-48 pb-32 px-6 lg:px-8 overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
    {/* Technical Background Pattern - Parallax */}
    <div 
      className="absolute inset-0 z-0 opacity-[0.04]" 
      style={{ 
        backgroundImage: 'radial-gradient(#7DD3FC 1px, transparent 1px)', 
        backgroundSize: '32px 32px',
        transform: `translateY(${scrollY * 0.3}px)`
      }}
    >
    </div>
    
    {/* Ambient Glows - Parallax */}
    <div 
      className="absolute top-0 right-0 w-[30vw] max-w-[420px] h-[30vw] max-h-[420px] bg-[#7DD3FC]/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 -z-10 pointer-events-none"
      style={{ transform: `translateY(${scrollY * -0.2}px) translateX(25%) scale(${1 + scrollY * 0.0001})` }}
    ></div>
    <div 
      className="absolute bottom-0 left-0 w-[25vw] max-w-[320px] h-[25vw] max-h-[320px] bg-white/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 -z-10 pointer-events-none"
      style={{ transform: `translateY(${scrollY * 0.1}px) translateX(-25%) scale(${1 + scrollY * 0.00005})` }}
    ></div>

    {/* Proof Snippets - Glassmorphism, Absolute Positioning, Bobbing Animation, Lower Z-Index */}
    <div className="absolute top-[25%] left-[5%] md:left-[20%] z-1 proof-badge delay-0 float-1 flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg shadow-black/40 border border-white/10">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span className="text-sm font-semibold text-white">No Keyword Matching</span>
    </div>
    <div className="absolute top-[25%] right-[5%] md:right-[20%] z-1 proof-badge delay-1 float-2 flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg shadow-black/40 border border-white/10">
      <Layers className="w-4 h-4 text-[#7DD3FC]" />
      <span className="text-sm font-semibold text-white">Multi-layer AI</span>
    </div>
    <div className="absolute bottom-[25%] left-[5%] md:left-[20%] z-1 proof-badge delay-2 float-3 flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg shadow-black/40 border border-white/10">
      <Timer className="w-4 h-4 text-[#7DD3FC]" />
      <span className="text-sm font-semibold text-white">Lightning Fast Analysis</span>
    </div>
    <div className="absolute bottom-[25%] right-[5%] md:right-[20%] z-1 proof-badge delay-3 float-4 flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg shadow-black/40 border border-white/10">
      <ShieldCheck className="w-4 h-4 text-[#7DD3FC]" />
      <span className="text-sm font-semibold text-white">Bias Shield Active</span>
    </div>
    <div className="absolute left-[10%] top-[50%] z-1 proof-badge delay-4 float-5 flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg shadow-black/40 border border-white/10">
      <Zap className="w-4 h-4 text-[#7DD3FC]" />
      <span className="text-sm font-semibold text-white">Neural Context</span>
    </div>
    <div className="absolute right-[10%] top-[50%] z-1 proof-badge delay-5 float-6 flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg shadow-black/40 border border-white/10">
      <Fingerprint className="w-4 h-4 text-[#7DD3FC]" />
      <span className="text-sm font-semibold text-white">Identity Neutrality</span>
    </div>

    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-10 shadow-lg shadow-black/30 animate-bounce">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7DD3FC] opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7DD3FC]"></span>
        </span>
        <span className="text-[11px] font-bold text-gray-200 uppercase tracking-[0.2em]">Beyond Matching. Real Intelligence.</span>
      </div>
      
      <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-[-0.03em] leading-[0.95] ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}>
        <span className="slide-left inline-block" style={{ animationDuration: '3000ms', animationDelay: '300ms' }}>AI that Understands</span>
        <br />
        <span className="slide-right inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#7DD3FC] to-white" style={{ animationDuration: '3000ms', animationDelay: '600ms' }}>
          Resumes Like Humans<span className="blink">.</span>
        </span>
      </h1>
      
      <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
        Joddex replaces keyword matching with <span className="text-[#7DD3FC] font-semibold">neural context</span>. We identify the top-tier talent that legacy ATS systems overlook.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button className="w-full sm:w-auto px-10 py-4 bg-[#7DD3FC] text-black rounded-xl font-bold text-sm shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_70px_rgba(0,0,0,0.45)] hover:scale-105 transition-all duration-400 group">
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
          className="w-full sm:w-auto px-10 py-4 bg-transparent text-white border border-white/20 rounded-xl font-bold text-sm hover:border-[#7DD3FC] hover:text-[#7DD3FC] hover:scale-105 hover:shadow-lg hover:shadow-[#7DD3FC]/30 transition-all duration-400">
          View Technical Vision
        </button>
        
      </div>

      
    </div>
  </section>
);

// --- Feature Section ---

// --- Pricing Card ---
const PricingCard = ({ tier }) => (
  <div className="flex flex-col p-8 rounded-3xl border border-gray-800 bg-[#0b0b0b] transition-all duration-300 hover:shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
    <div className="mb-4">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-gray-400">
        {tier.name}
      </h3>
      <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-[#7DD3FC] font-bold text-sm border border-white/10">Launching Soon</div>
    </div>

    <div className="space-y-3 mb-6 flex-grow text-gray-300">
      {tier.features && tier.features.map((f, i) => (
        <div key={i} className="flex items-center text-[13px] font-medium text-gray-200">
          <div className="w-1.5 h-1.5 rounded-full mr-3 bg-[#7DD3FC]"></div>
          {f}
        </div>
      ))}
    </div>

    <button className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#7DD3FC] text-black hover:brightness-110 border border-[#7DD3FC]/70 transition-all duration-300">
      Launching Soon
    </button>
  </div>
);

// --- Main App Component ---
export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme persistence
  useEffect(() => {
    const stored = localStorage.getItem('joddex_theme');
    if (stored === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('joddex_theme', theme);
  }, [theme]);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Global reveal trigger
  useEffect(() => {
    setTimeout(() => triggerGlobalReveal(), 120);
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

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className={`relative z-10 min-h-screen ${theme === 'dark' ? 'bg-black text-gray-100 selection:bg-gray-800 selection:text-white' : 'bg-white text-[#001A3D] selection:bg-blue-100 selection:text-[#001A3D]'} font-sans antialiased`}>
      {/* Animated Background */}
      <AnimatedBG />
      {/* Loading Animation */}
      {isLoading && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#7DD3FC]/30 border-t-[#7DD3FC] rounded-full animate-spin mx-auto mb-4"></div>
            <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}>Loading JODDEX...</div>
          </div>
        </div>
      )}

      <Navbar activePage={activePage} setActivePage={setActivePage} theme={theme} toggleTheme={toggleTheme} />
      
      {activePage === 'about' ? (
        <AboutPage setActivePage={setActivePage} />
      ) : (
        <main>
          <div id="home">
            <Hero setActivePage={setActivePage} scrollY={scrollY} theme={theme} />
          </div>

          {/* Products Section - Bento Grid Layout */}
          <section id="products" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className={`text-4xl font-bold tracking-tight mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}>Engineered for Precision</h2>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} font-medium text-lg`}>Legacy systems rely on simple strings. Joddex builds a cognitive understanding of career trajectories.</p>
              </div>
              <button className={`text-[13px] font-bold pb-0.5 flex items-center group hover:opacity-70 transition-opacity ${theme === 'dark' ? 'text-blue-200 border-b border-blue-200' : 'text-[#001A3D] border-b border-[#001A3D]'}`}>
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
                darkMode={theme === 'dark'}
              />
              <FeatureCard 
                icon={Globe}
                title="Global Context Engine"
                description="Understands educational equivalence across 180+ countries. It knows that a GPA from a specific university in Berlin matches your requirements."
                className="md:col-span-2"
                reveal="up"
                darkMode={theme === 'dark'}
              />
              <FeatureCard 
                icon={Cpu}
                title="Neural Matching"
                description="Matches candidates based on skill adjacency. A Java developer can be a great C# hire; Joddex knows why."
                className="md:col-span-2"
                reveal="right"
                darkMode={theme === 'dark'}
              />
              <FeatureCard 
                icon={Lock}
                title="Secure Pipeline"
                description="Enterprise-grade data encryption for every candidate file. SOC2 Type II ready architecture."
                className="md:col-span-1"
                reveal="right"
                intensity="strong"
                darkMode={theme === 'dark'}
              />
            </div>
          </section>

        {/* About Section - Split Layout with Enhanced Visual */}
        <section id="about" className={`py-32 border-y relative overflow-hidden ${theme === 'dark' ? 'bg-black border-gray-800' : 'bg-[#F9FAFB] border-gray-100'}`}>
          {/* Decorative Grid */}
           <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#001A3D 1px, transparent 1px), linear-gradient(90deg, #001A3D 1px, transparent 1px)', backgroundSize: '64px 64px' }}>
           </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <div className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md mb-6 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>Our Mission</div>
              <h2 className={`text-4xl md:text-5xl font-bold mb-8 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}>The Semantic Layer for Hiring</h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-lg mb-10 leading-relaxed`}>
                We are building the infrastructure for the next generation of hiring. Our prototype focuses on the "Semantic Layer"—the ability for software to understand that a candidate with "Growth Experience" is a perfect fit for a "Marketing Lead" role even without the exact keywords.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: 'Neural Context', desc: 'Ranking based on 500+ derived data points.' },
                  { title: 'Bias Shield', desc: 'De-identification protocols at the kernel level.' },
                  { title: 'Instant Parsing', desc: 'Process 10,000+ applications in under 60 seconds.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5 group">
                    <div className={`w-10 h-10 rounded-xl border shadow-sm flex items-center justify-center shrink-0 transition-colors ${theme === 'dark' ? 'bg-[#111a30] border-gray-700 group-hover:border-blue-400 group-hover:text-blue-300' : 'bg-white border-gray-200 group-hover:border-blue-500 group-hover:text-blue-600'}`}>
                      <CheckCircle2 className={`w-5 h-5 transition-colors ${theme === 'dark' ? 'text-gray-400 group-hover:text-blue-300' : 'text-gray-400 group-hover:text-blue-600'}`} />
                    </div>
                    <div>
                      <h4 className={`font-bold text-base mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}>{item.title}</h4>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced "Dashboard" Visual */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#7DD3FC]/15 via-transparent to-transparent rounded-[2.5rem] blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className={`relative p-8 rounded-2xl border dashboard-preview-shadow hover:scale-105 hover:shadow-2xl hover:shadow-[#7DD3FC]/20 transition-all duration-500 ${theme === 'dark' ? 'bg-[#0b0b0b] border-gray-800' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}>Dashboard Preview</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Realtime insights from the semantic layer</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-xs`}>Updated</div>
                    <div className={`${theme === 'dark' ? 'px-3 py-1 bg-white/5 text-gray-200 border border-white/10' : 'px-3 py-1 bg-gray-50 text-gray-700'} rounded-full text-sm font-medium`}>2m ago</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#0f0f0f] border border-gray-800' : 'bg-gray-50'}`}>
                    <div className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Matches / hr</div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}>1,248</div>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#0f0f0f] border border-gray-800' : 'bg-gray-50'}`}>
                    <div className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Avg Parse Time</div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#001A3D]'}`}>0.42s</div>
                  </div>
                  <div className={`col-span-2 p-4 rounded-lg border ${theme === 'dark' ? 'bg-[#0b0b0b] border-gray-800' : 'bg-white border-gray-100'}`}>
                    <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Top Signals</div>
                    <div className="flex gap-3 flex-wrap">
                      <div className={`${theme === 'dark' ? 'bg-[#7DD3FC]/20 text-[#7DD3FC]' : 'bg-blue-50 text-blue-600'} px-3 py-1 rounded-full text-xs font-semibold`}>Neural Context</div>
                      <div className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-700'} px-3 py-1 rounded-full text-xs font-semibold`}>Bias Shield</div>
                      <div className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-700'} px-3 py-1 rounded-full text-xs font-semibold`}>Skill Adjacency</div>
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
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#0c0c0c] via-[#0a0a0a] to-[#0f1624] rounded-3xl p-16 md:p-20 text-center text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)] border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300">We're currently in prototype stage. For inquiries, partnerships, or to join our waitlist, reach out through our channels.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center mb-8">
              <a href="https://www.linkedin.com/company/joddex" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#7DD3FC] text-black rounded-xl text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:shadow-[#7DD3FC]/40 transition-all duration-300 flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a href="https://www.instagram.com/joddex_official/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 text-white rounded-xl text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 flex items-center gap-2">
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </div>
            <p className="text-xl md:text-2xl text-[#7DD3FC] font-semibold">Email: contact@joddex.com</p>
            <p className="text-sm text-gray-400 mt-6">Full contact form coming soon with our official launch.</p>
          </div>
          </section>
        </main>
      )}

      <footer className="bg-[#0c0c0c] text-gray-200 py-12 border-t border-white/5">
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

        <div className="max-w-7xl mx-auto px-8 text-center mt-8 text-sm text-gray-500">© {new Date().getFullYear()} Joddex. All rights reserved.</div>
      </footer>
    </div>
  );
}
