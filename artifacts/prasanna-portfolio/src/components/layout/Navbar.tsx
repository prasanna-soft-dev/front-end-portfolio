import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

const navLinks = [
  { name: 'Architecture', href: '#architecture' },
  { name: 'Simulator', href: '#simulator' },
  { name: 'Incidents', href: '#incidents' },
  { name: 'Skills', href: '#skills' },
  { name: 'K8s', href: '#kubernetes' },
  { name: 'Database', href: '#database' },
  { name: 'System Design', href: '#systemdesign' },
  { name: 'Projects', href: '#projects' },
  { name: 'Metrics', href: '#metrics' },
  { name: 'Terminal', href: '#terminal' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useAppStore(state => state.activeSection);
  const recruiterMode = useAppStore(state => state.recruiterMode);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (recruiterMode) return null;

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel border-b border-primary/20 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center glow-border">
              <Terminal className="text-primary w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-wider hidden sm:block">
              PB <span className="text-primary/70 text-sm font-sans tracking-normal">Backend Command Center</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === link.href.substring(1)
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-primary/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === link.href.substring(1)
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
