import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const terminalLines = [
  { text: "$ java -jar portfolio.jar", delay: 0 },
  { text: "[██████████] Loading Skills...     ✓", delay: 800 },
  { text: "[██████████] Loading Projects...   ✓", delay: 1600 },
  { text: "[██████████] Connecting Database...✓", delay: 2400 },
  { text: "[██████████] System Ready.         ✓", delay: 3200 },
];

function TypewriterLine({ text, delay }: { text: string, delay: number }) {
  const [visibleText, setVisibleText] = useState("");
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      let i = 0;
      timeout = setInterval(() => {
        setVisibleText(text.slice(0, i + 1));
        i++;
        if (i === text.length) clearInterval(timeout);
      }, 30);
    }, delay);
    
    return () => {
      clearTimeout(startTimeout);
      clearInterval(timeout);
    };
  }, [text, delay]);

  return <div className="text-primary font-mono text-sm sm:text-base leading-relaxed h-6">{visibleText}</div>;
}

function CSSNetworkFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06)_0%,transparent_70%)]" />
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#7C3AED' : '#10B981',
            opacity: 0.3 + Math.random() * 0.5,
            animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
          66% { transform: translateY(10px) translateX(-10px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export function HeroSection() {
  const roles = ["Backend Engineer", "Java Developer", "System Designer"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
      {/* Animated network background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <CSSNetworkFallback />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter glow-text pulse-glow mb-2">
            PRASANNA
          </h1>
          <div className="h-10 sm:h-12 mb-8">
            <motion.p 
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl sm:text-2xl md:text-3xl font-mono text-muted-foreground"
            >
              <span className="text-primary">&gt;</span> {roles[roleIndex]}
              <span className="animate-pulse inline-block ml-1 w-3 h-6 bg-primary align-middle"></span>
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={() => scrollTo('#architecture')} className="glow-button px-8 py-3 rounded-md text-white font-mono text-sm tracking-wide w-full sm:w-auto">
              Explore Architecture
            </button>
            <button onClick={() => scrollTo('#projects')} className="glow-button px-8 py-3 rounded-md text-white font-mono text-sm tracking-wide w-full sm:w-auto border-secondary/30 hover:border-secondary hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              View Projects
            </button>
            <button onClick={() => scrollTo('#terminal')} className="glass-panel px-8 py-3 rounded-md text-white font-mono text-sm tracking-wide w-full sm:w-auto hover:bg-white/10 transition-colors">
              Contact
            </button>
          </div>
        </motion.div>

        {/* Terminal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-panel rounded-lg w-full max-w-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
            <div className="w-3 h-3 rounded-full bg-chart-4/80"></div>
            <div className="w-3 h-3 rounded-full bg-accent/80"></div>
          </div>
          <div className="flex flex-col gap-1 min-h-[120px]">
            {terminalLines.map((line, i) => (
              <TypewriterLine key={i} text={line.text} delay={line.delay} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button onClick={() => scrollTo('#architecture')} className="text-primary/50 hover:text-primary transition-colors">
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
