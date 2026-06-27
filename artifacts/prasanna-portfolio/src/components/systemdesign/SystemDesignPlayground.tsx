import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link2, Layers, Zap, MessageSquare, ShoppingBag, CreditCard } from 'lucide-react';

const designs = [
  { id: 'url', name: 'URL Shortener', icon: Link2, desc: 'High-read, low-write system with consistent hashing.' },
  { id: 'chat', name: 'Chat System', icon: MessageSquare, desc: 'Real-time bi-directional messaging with Redis pub/sub.' },
  { id: 'ecom', name: 'E-commerce', icon: ShoppingBag, desc: 'Microservices with distributed transactions & saga pattern.' },
  { id: 'payment', name: 'Payment Gateway', icon: CreditCard, desc: 'PCI-DSS compliant, idempotent APIs, exactly-once processing.' },
];

export function SystemDesignPlayground() {
  const [activeTab, setActiveTab] = useState(designs[0].id);

  return (
    <section id="systemdesign" className="min-h-screen py-24 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-primary mr-2">/</span>
          System Design Playground
        </h2>
        <div className="h-1 w-24 bg-primary glow-border rounded mb-12"></div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:w-64 shrink-0 no-scrollbar pb-4 lg:pb-0">
            {designs.map(design => {
              const Icon = design.icon;
              const isActive = activeTab === design.id;
              return (
                <button
                  key={design.id}
                  onClick={() => setActiveTab(design.id)}
                  className={`flex flex-col items-start p-4 rounded-lg border transition-all duration-300 text-left min-w-[200px] lg:min-w-0 ${
                    isActive 
                      ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                      : 'glass-panel border-primary/10 hover:border-primary/50'
                  }`}
                >
                  <div className={`flex items-center gap-2 font-mono font-bold mb-2 ${isActive ? 'text-primary' : 'text-white'}`}>
                    <Icon className="w-5 h-5" /> {design.name}
                  </div>
                  <p className="text-xs font-sans text-muted-foreground line-clamp-2">{design.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Diagram Area */}
          <div className="flex-1 glass-panel rounded-lg border-primary/20 p-6 flex flex-col">
            <div className="flex-1 bg-[#0a0f1d] rounded border border-white/5 p-4 flex items-center justify-center relative overflow-hidden min-h-[400px]">
              {/* Background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-full max-w-2xl text-center font-mono text-muted-foreground"
                >
                  {/* Abstract diagram placeholders to show layout intent */}
                  <div className="flex flex-col items-center gap-8">
                    <div className="px-6 py-3 rounded border border-primary/50 bg-primary/10 text-primary font-bold">Load Balancer (Nginx/ALB)</div>
                    <div className="flex gap-4 w-full justify-center">
                      <div className="w-1 h-8 border-l-2 border-dashed border-secondary animate-[flow_1s_linear_infinite]"></div>
                      <div className="w-1 h-8 border-l-2 border-dashed border-secondary animate-[flow_1s_linear_infinite]"></div>
                      <div className="w-1 h-8 border-l-2 border-dashed border-secondary animate-[flow_1s_linear_infinite]"></div>
                    </div>
                    <div className="flex gap-4 w-full justify-center">
                      <div className="px-4 py-2 rounded border border-white/20 bg-background text-white flex-1 max-w-[150px]">API Node</div>
                      <div className="px-4 py-2 rounded border border-white/20 bg-background text-white flex-1 max-w-[150px]">API Node</div>
                      <div className="px-4 py-2 rounded border border-white/20 bg-background text-white flex-1 max-w-[150px]">API Node</div>
                    </div>
                    <div className="flex gap-16 w-full justify-center">
                      <div className="w-1 h-8 border-l-2 border-dashed border-destructive animate-[flow_1s_linear_infinite_reverse]"></div>
                      <div className="w-1 h-8 border-l-2 border-dashed border-accent animate-[flow_1s_linear_infinite]"></div>
                    </div>
                    <div className="flex gap-8 w-full justify-center">
                      <div className="px-6 py-4 rounded border border-destructive/50 bg-destructive/10 text-destructive font-bold flex-1 max-w-[200px]">Redis Cache</div>
                      <div className="px-6 py-4 rounded border border-accent/50 bg-accent/10 text-accent font-bold flex-1 max-w-[200px]">Primary DB</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 border-t border-primary/20 pt-6">
              <h4 className="font-mono text-white mb-4 flex items-center gap-2">
                <Zap className="text-secondary w-4 h-4" /> Key Design Decisions
              </h4>
              <ul className="space-y-3 font-sans text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div><p>Chose Redis sorted sets for leaderboard over SQL for O(log N) complexity</p></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></div><p>Implemented consistent hashing for distributed cache to minimize rebalancing on node failure</p></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div><p>Database read replicas to offload heavy reporting queries from primary transactional node</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flow { to { stroke-dashoffset: -20; background-position: 0 20px; } }
      `}} />
    </section>
  );
}
