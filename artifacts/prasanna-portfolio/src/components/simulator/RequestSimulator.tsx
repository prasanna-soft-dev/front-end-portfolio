import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Server, Database, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Stage = { id: string, name: string, icon: any, normalLatency: number, failureLatency: number, errorState?: boolean };

const stages: Stage[] = [
  { id: 'client', name: 'Browser', icon: <Globe/>, normalLatency: 12, failureLatency: 12 },
  { id: 'gw', name: 'API Gateway', icon: <Server/>, normalLatency: 5, failureLatency: 8 },
  { id: 'auth', name: 'Auth Check', icon: <ShieldCheck/>, normalLatency: 15, failureLatency: 20 },
  { id: 'redis', name: 'Redis Cache', icon: <Database/>, normalLatency: 1, failureLatency: 1500, errorState: true },
  { id: 'biz', name: 'Order Service', icon: <Cpu/>, normalLatency: 45, failureLatency: 55 },
  { id: 'db', name: 'MySQL DB', icon: <Database/>, normalLatency: 8, failureLatency: 2500, errorState: true },
  { id: 'kafka', name: 'Kafka Topic', icon: <Activity/>, normalLatency: 3, failureLatency: 800, errorState: true },
];

export function RequestSimulator() {
  const [mode, setMode] = useState<'normal'|'redis'|'db'|'kafka'>('normal');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [history, setHistory] = useState<any[]>([]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStageIndex(-1);
    
    let currentIdx = 0;
    let totalLatency = 0;
    
    const interval = setInterval(() => {
      if (currentIdx >= stages.length) {
        clearInterval(interval);
        setIsRunning(false);
        setHistory(prev => [...prev.slice(-4), { 
          name: `Req #${prev.length + 1}`, 
          latency: totalLatency,
          mode 
        }]);
        setTimeout(() => setActiveStageIndex(-1), 1000);
        return;
      }
      
      const stage = stages[currentIdx];
      const isFailed = (mode === 'redis' && stage.id === 'redis') || 
                       (mode === 'db' && stage.id === 'db') || 
                       (mode === 'kafka' && stage.id === 'kafka');
                       
      const latency = isFailed ? stage.failureLatency : stage.normalLatency;
      totalLatency += latency;
      
      setActiveStageIndex(currentIdx);
      currentIdx++;
    }, 600); // UI animation speed, not real latency
  };

  return (
    <section id="simulator" className="min-h-screen py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-primary mr-2">/</span>
          Request Journey Simulator
        </h2>
        <div className="h-1 w-24 bg-primary glow-border rounded mb-12"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-lg">
              <h3 className="font-mono text-xl text-primary mb-4">Simulation Mode</h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setMode('normal')}
                  className={`px-4 py-2 text-left rounded border font-mono text-sm transition-colors ${mode === 'normal' ? 'bg-primary/20 border-primary text-white' : 'border-primary/20 text-muted-foreground hover:bg-white/5'}`}
                >
                  [0] Normal Operation
                </button>
                <button 
                  onClick={() => setMode('redis')}
                  className={`px-4 py-2 text-left rounded border font-mono text-sm transition-colors ${mode === 'redis' ? 'bg-destructive/20 border-destructive text-white' : 'border-primary/20 text-muted-foreground hover:bg-white/5'}`}
                >
                  [1] Failure: Redis Down
                </button>
                <button 
                  onClick={() => setMode('db')}
                  className={`px-4 py-2 text-left rounded border font-mono text-sm transition-colors ${mode === 'db' ? 'bg-destructive/20 border-destructive text-white' : 'border-primary/20 text-muted-foreground hover:bg-white/5'}`}
                >
                  [2] Failure: DB Slow Query
                </button>
                <button 
                  onClick={() => setMode('kafka')}
                  className={`px-4 py-2 text-left rounded border font-mono text-sm transition-colors ${mode === 'kafka' ? 'bg-destructive/20 border-destructive text-white' : 'border-primary/20 text-muted-foreground hover:bg-white/5'}`}
                >
                  [3] Failure: Kafka Consumer Lag
                </button>
              </div>

              <button 
                onClick={runSimulation}
                disabled={isRunning}
                className="mt-8 w-full glow-button py-4 rounded text-white font-display font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? 'TRANSMITTING...' : 'SEND REQUEST'}
              </button>
            </div>

            {/* Chart */}
            <div className="glass-panel p-6 rounded-lg h-64">
              <h3 className="font-mono text-sm text-muted-foreground mb-4">Latency History (ms)</h3>
              {history.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} fontFamily="monospace" />
                    <YAxis stroke="#666" fontSize={12} fontFamily="monospace" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050816', borderColor: '#00E5FF', fontFamily: 'monospace' }}
                      itemStyle={{ color: '#00E5FF' }}
                    />
                    <Bar dataKey="latency" fill="#00E5FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
                  No data. Run simulation.
                </div>
              )}
            </div>
          </div>

          {/* Pipeline */}
          <div className="lg:col-span-2 glass-panel p-8 rounded-lg relative">
            <div className="absolute top-12 bottom-12 left-16 w-1 bg-primary/20 rounded"></div>
            
            <div className="space-y-4 relative z-10">
              {stages.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                const isPassed = activeStageIndex > idx;
                const isFailed = (mode === 'redis' && stage.id === 'redis') || 
                                 (mode === 'db' && stage.id === 'db') || 
                                 (mode === 'kafka' && stage.id === 'kafka');
                
                let borderColor = 'border-primary/20';
                let bgColor = 'bg-background';
                let iconColor = 'text-muted-foreground';
                let badgeText = `${stage.normalLatency}ms`;
                let badgeColor = 'bg-primary/20 text-primary';

                if (isActive) {
                  borderColor = isFailed ? 'border-destructive shadow-[0_0_15px_#EF4444]' : 'border-primary shadow-[0_0_15px_#00E5FF]';
                  bgColor = isFailed ? 'bg-destructive/10' : 'bg-primary/10';
                  iconColor = isFailed ? 'text-destructive' : 'text-primary';
                  if (isFailed) {
                    badgeText = `${stage.failureLatency}ms (ERR)`;
                    badgeColor = 'bg-destructive/20 text-destructive';
                  }
                } else if (isPassed) {
                  borderColor = 'border-primary/40';
                  iconColor = 'text-primary/60';
                  if (isFailed && mode.includes(stage.id)) {
                    borderColor = 'border-destructive/40';
                    iconColor = 'text-destructive/60';
                  }
                }

                return (
                  <div key={stage.id} className={`flex items-center gap-6 transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100 opacity-80'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 bg-background z-10 transition-colors duration-300 ${borderColor}`}>
                      <div className={iconColor}>{stage.icon}</div>
                    </div>
                    <div className={`flex-1 p-4 rounded-lg border flex justify-between items-center transition-colors duration-300 ${borderColor} ${bgColor}`}>
                      <span className="font-sans font-bold text-white">{stage.name}</span>
                      <span className={`font-mono text-xs px-2 py-1 rounded ${badgeColor} transition-colors duration-300`}>
                        {isActive ? badgeText : '---'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Packet animation */}
            <AnimatePresence>
              {isRunning && activeStageIndex >= 0 && activeStageIndex < stages.length && (
                <motion.div
                  initial={{ top: 48 + (activeStageIndex - 1) * 80 }}
                  animate={{ top: 48 + activeStageIndex * 80 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-[62px] w-3 h-3 -ml-1 rounded-full bg-white shadow-[0_0_10px_#FFF] z-20"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
