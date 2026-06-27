import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Box, Server, GitBranch, ShieldAlert } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    status: 'Running',
    ping: '45ms',
    tags: ['Spring Boot', 'MySQL', 'Redis', 'Kafka', 'Docker'],
    desc: 'Scalable microservices architecture for an e-commerce backend handling product catalog, inventory, and order processing.',
    arch: 'Client -> API Gateway -> [Order, Inventory, Payment] -> MySQL & Kafka',
    challenges: ['Distributed transactions using Saga pattern', 'Preventing inventory overselling with Redis locks', 'CQRS for order history view']
  },
  {
    id: 2,
    name: 'Real-Time Chat System',
    status: 'Running',
    ping: '23ms',
    tags: ['WebSocket', 'Spring Boot', 'Redis Pub/Sub', 'MongoDB'],
    desc: 'High-throughput chat server supporting group chats, read receipts, and online status presence.',
    arch: 'Client <-> WebSocket Server <-> Redis Pub/Sub <-> Other Nodes',
    challenges: ['Scaling WebSocket connections horizontally', 'Handling offline message delivery', 'Efficient presence tracking']
  },
  {
    id: 3,
    name: 'Payment Gateway API',
    status: 'Running',
    ping: '67ms',
    tags: ['Spring Boot', 'Stripe API', 'PostgreSQL', 'Vault'],
    desc: 'PCI-DSS compliant payment processing wrapper ensuring exactly-once processing.',
    arch: 'Client -> WAF -> Gateway API -> Stripe / PG',
    challenges: ['Idempotency key implementation', 'Secure credential vaulting', 'Handling webhooks and network partitions']
  },
  {
    id: 4,
    name: 'URL Shortener Service',
    status: 'Running',
    ping: '12ms',
    tags: ['Java', 'Redis', 'MySQL', 'Nginx'],
    desc: 'High-read, low-latency URL shortener with analytics tracking.',
    arch: 'Client -> Nginx -> App Servers -> Cache / DB',
    challenges: ['Base62 encoding logic', 'Cache stampede prevention', 'Async analytics batching']
  }
];

export function ProjectServices() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen py-24 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-secondary mr-2">/</span>
          Project Services
        </h2>
        <div className="h-1 w-24 bg-secondary shadow-[0_0_10px_rgba(124,58,237,0.5)] rounded mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              className={`glass-panel rounded-lg border-primary/20 overflow-hidden transition-colors hover:border-secondary/50`}
            >
              <div className="p-6 cursor-pointer" onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold font-mono text-white">{project.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{project.ping}</span>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-accent/10 border border-accent/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                      <span className="text-[10px] font-mono text-accent uppercase">{project.status}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground font-sans mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-primary/80 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-white/5" onClick={e => e.stopPropagation()}>
                  <button className="flex items-center gap-2 text-xs font-mono text-white hover:text-primary transition-colors bg-white/5 px-3 py-1.5 rounded hover:bg-white/10">
                    <Github className="w-3.5 h-3.5" /> Source
                  </button>
                  <button className="flex items-center gap-2 text-xs font-mono text-white hover:text-accent transition-colors bg-white/5 px-3 py-1.5 rounded hover:bg-white/10">
                    <ExternalLink className="w-3.5 h-3.5" /> Demo
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-black/30 border-t border-primary/20"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-mono text-secondary mb-2">
                          <Server className="w-4 h-4" /> Architecture Flow
                        </h4>
                        <div className="font-mono text-xs text-white/70 p-3 bg-background rounded border border-white/10">
                          {project.arch}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-mono text-destructive mb-2">
                          <ShieldAlert className="w-4 h-4" /> Technical Challenges
                        </h4>
                        <ul className="space-y-2">
                          {project.challenges.map((chal, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-destructive mt-1">▹</span> {chal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
