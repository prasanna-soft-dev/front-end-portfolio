import { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Cpu, HardDrive, RefreshCw, Search, ArrowUpCircle, XCircle, Database } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data generator for charts
const generateData = (base: number, volatility: number, isIncident: boolean, incidentMultiplier: number) => {
  return Array.from({ length: 20 }).map((_, i) => ({
    time: i,
    value: isIncident ? base * incidentMultiplier + Math.random() * volatility * incidentMultiplier : base + Math.random() * volatility
  }));
};

export function IncidentDashboard() {
  const { incidentActive, setIncidentActive } = useAppStore();
  const [events, setEvents] = useState<{time: string, msg: string, type: 'alert'|'action'|'resolve'}[]>([]);
  const [kafkaData, setKafkaData] = useState(generateData(10, 5, false, 1));
  const [metricUpdates, setMetricUpdates] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKafkaData(prev => {
        const newData = [...prev.slice(1)];
        const lastVal = newData[newData.length - 1].value;
        const target = incidentActive ? 1500 : 10;
        const diff = target - lastVal;
        newData.push({
          time: prev[prev.length - 1].time + 1,
          value: Math.max(0, lastVal + diff * 0.2 + (Math.random() - 0.5) * (incidentActive ? 200 : 5))
        });
        return newData;
      });
      setMetricUpdates(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [incidentActive]);

  const addEvent = (msg: string, type: 'alert'|'action'|'resolve') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setEvents(prev => [{ time, msg, type }, ...prev].slice(0, 10));
  };

  const triggerIncident = () => {
    setIncidentActive(true);
    addEvent('ALERT: Payment error rate exceeded threshold (15%)', 'alert');
    addEvent('ALERT: Kafka Consumer Lag spiking (>1000 msgs)', 'alert');
    addEvent('ALERT: CPU usage critical on payment-service-primary', 'alert');
  };

  const resolveIncident = () => {
    setIncidentActive(false);
    addEvent('RESOLVED: Error rates returning to normal', 'resolve');
    addEvent('RESOLVED: Consumer lag decreasing', 'resolve');
  };

  const handleAction = (action: string) => {
    addEvent(`ACTION: ${action}`, 'action');
  };

  return (
    <section id="incidents" className="min-h-screen py-24 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              <span className="text-destructive mr-2">/</span>
              Incident Response Simulator
            </h2>
            <div className={`h-1 w-24 rounded transition-colors duration-500 ${incidentActive ? 'bg-destructive shadow-[0_0_15px_#EF4444]' : 'bg-primary glow-border'}`}></div>
          </div>
          
          <div className="flex gap-4">
            {!incidentActive ? (
              <button 
                onClick={triggerIncident}
                className="px-6 py-2 rounded bg-destructive/20 border border-destructive text-destructive font-mono font-bold hover:bg-destructive hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
              >
                SIMULATE INCIDENT
              </button>
            ) : (
              <button 
                onClick={resolveIncident}
                className="px-6 py-2 rounded bg-accent/20 border border-accent text-accent font-mono font-bold hover:bg-accent hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                RESOLVE INCIDENT
              </button>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <MetricCard 
            title="Payment Error Rate" 
            value={incidentActive ? (15 + Math.random() * 5).toFixed(2) + '%' : (0.1 + Math.random() * 0.05).toFixed(2) + '%'} 
            status={incidentActive ? 'critical' : 'normal'}
            icon={<XCircle className="w-5 h-5" />}
          />
          <MetricCard 
            title="Redis Hit Rate" 
            value={incidentActive ? (64 + Math.random() * 5).toFixed(1) + '%' : (98.5 + Math.random() * 0.5).toFixed(1) + '%'} 
            status={incidentActive ? 'warning' : 'normal'}
            icon={<Database className="w-5 h-5" />}
          />
          <MetricCard 
            title="CPU Usage" 
            value={incidentActive ? Math.floor(95 + Math.random() * 5) + '%' : Math.floor(35 + Math.random() * 10) + '%'} 
            status={incidentActive ? 'critical' : 'normal'}
            icon={<Cpu className="w-5 h-5" />}
          />
          <MetricCard 
            title="Memory Usage" 
            value={incidentActive ? Math.floor(88 + Math.random() * 5) + '%' : Math.floor(65 + Math.random() * 5) + '%'} 
            status={incidentActive ? 'warning' : 'normal'}
            icon={<HardDrive className="w-5 h-5" />}
          />
          <div className="glass-panel p-4 rounded-lg flex flex-col justify-between border-primary/20">
            <div className="flex justify-between items-center text-muted-foreground mb-2">
              <span className="font-mono text-sm">Kafka Lag</span>
              <Activity className={`w-5 h-5 ${incidentActive ? 'text-destructive animate-pulse' : 'text-primary'}`} />
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kafkaData}>
                  <Line type="monotone" dataKey="value" stroke={incidentActive ? '#EF4444' : '#00E5FF'} strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={`text-xl font-bold font-mono mt-2 ${incidentActive ? 'text-destructive' : 'text-white'}`}>
              {Math.floor(kafkaData[kafkaData.length - 1]?.value || 0)} msgs
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions */}
          <div className="glass-panel p-6 rounded-lg space-y-4">
            <h3 className="font-mono text-xl text-primary mb-4">Runbook Actions</h3>
            <button onClick={() => handleAction('Investigating payment service logs')} className="w-full text-left px-4 py-3 rounded border border-primary/20 hover:bg-primary/10 hover:border-primary transition-colors flex items-center gap-3 text-white font-mono text-sm">
              <Search className="w-4 h-4 text-primary" /> Investigate Logs
            </button>
            <button onClick={() => handleAction('Scaling payment-service (replicas: 2 -> 4)')} className="w-full text-left px-4 py-3 rounded border border-primary/20 hover:bg-primary/10 hover:border-primary transition-colors flex items-center gap-3 text-white font-mono text-sm">
              <ArrowUpCircle className="w-4 h-4 text-primary" /> Scale Service
            </button>
            <button onClick={() => handleAction('Restarting auth-service pod (CrashLoopBackOff)')} className="w-full text-left px-4 py-3 rounded border border-primary/20 hover:bg-primary/10 hover:border-primary transition-colors flex items-center gap-3 text-white font-mono text-sm">
              <RefreshCw className="w-4 h-4 text-primary" /> Restart Pod
            </button>
            <button onClick={() => handleAction('Checking infrastructure metrics dashboard')} className="w-full text-left px-4 py-3 rounded border border-primary/20 hover:bg-primary/10 hover:border-primary transition-colors flex items-center gap-3 text-white font-mono text-sm">
              <Activity className="w-4 h-4 text-primary" /> Check Metrics
            </button>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-lg font-mono">
            <div className="flex justify-between items-center border-b border-primary/20 pb-4 mb-4">
              <h3 className="text-xl text-primary">Event Timeline</h3>
              <div className={`flex items-center gap-2 text-sm ${incidentActive ? 'text-destructive' : 'text-accent'}`}>
                <div className={`w-2 h-2 rounded-full ${incidentActive ? 'bg-destructive animate-pulse' : 'bg-accent'}`}></div>
                {incidentActive ? 'INCIDENT ONGOING' : 'SYSTEM HEALTHY'}
              </div>
            </div>
            
            <div className="space-y-2 h-64 overflow-y-auto pr-2 custom-scrollbar">
              {events.length === 0 ? (
                <div className="text-muted-foreground text-sm opacity-50 italic">No events. Waiting for incidents...</div>
              ) : (
                events.map((event, i) => {
                  let colorClass = 'text-white';
                  if (event.type === 'alert') colorClass = 'text-destructive';
                  if (event.type === 'action') colorClass = 'text-primary';
                  if (event.type === 'resolve') colorClass = 'text-accent';

                  return (
                    <div key={i} className={`text-sm py-1 border-b border-white/5 last:border-0 ${colorClass} flex gap-4 animate-in fade-in slide-in-from-left-2`}>
                      <span className="opacity-50 shrink-0">[{event.time}]</span>
                      <span>{event.msg}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ title, value, status, icon }: { title: string, value: string, status: 'normal'|'warning'|'critical', icon: React.ReactNode }) {
  const colors = {
    normal: 'text-white border-primary/20 bg-primary/5',
    warning: 'text-chart-4 border-chart-4/50 bg-chart-4/10',
    critical: 'text-destructive border-destructive bg-destructive/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
  };

  const iconColors = {
    normal: 'text-primary',
    warning: 'text-chart-4',
    critical: 'text-destructive animate-pulse'
  };

  return (
    <div className={`glass-panel p-4 rounded-lg flex flex-col justify-between transition-colors duration-300 ${colors[status]}`}>
      <div className="flex justify-between items-center text-muted-foreground mb-2">
        <span className="font-mono text-sm">{title}</span>
        <div className={iconColors[status]}>{icon}</div>
      </div>
      <div className={`text-2xl lg:text-3xl font-bold font-mono ${status === 'normal' ? 'text-white' : ''}`}>
        {value}
      </div>
    </div>
  );
}
