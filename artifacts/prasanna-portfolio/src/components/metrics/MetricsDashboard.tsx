import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const stats = [
  { label: 'Projects Built', value: 12 },
  { label: 'APIs Developed', value: 47 },
  { label: 'Git Commits', value: 2847 },
  { label: 'Problems Solved', value: 156 },
  { label: 'Years Learning', value: 4 },
  { label: 'Lines of Code', value: 84291 }
];

const skillData = [
  { name: 'Java', level: 95 },
  { name: 'Spring', level: 90 },
  { name: 'MySQL', level: 88 },
  { name: 'Redis', level: 82 },
  { name: 'Kafka', level: 75 },
  { name: 'Docker', level: 80 }
];

const distData = [
  { name: 'Backend', value: 60, color: '#00E5FF' },
  { name: 'DevOps/Infra', value: 25, color: '#7C3AED' },
  { name: 'Frontend', value: 15, color: '#10B981' }
];

function CountUp({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.5, freezeOnceVisible: true });

  useEffect(() => {
    if (entry?.isIntersecting) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [entry?.isIntersecting, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function MetricsDashboard() {
  return (
    <section id="metrics" className="min-h-screen py-24 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-accent mr-2">/</span>
          System Metrics
        </h2>
        <div className="h-1 w-24 bg-accent shadow-[0_0_10px_rgba(16,185,129,0.5)] rounded mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-lg text-center border-primary/20 hover:border-accent/50 transition-colors">
              <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                <CountUp end={stat.value} />
              </div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-6 rounded-lg border-primary/20">
            <h3 className="text-lg font-mono text-white mb-6">Skills Proficiency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="#fff" fontSize={12} fontFamily="monospace" width={60} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#050816', borderColor: '#00E5FF' }} />
                  <Bar dataKey="level" fill="#00E5FF" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-lg border-primary/20">
            <h3 className="text-lg font-mono text-white mb-6">Tech Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#050816', borderColor: '#00E5FF' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend */}
              <div className="absolute right-8 flex flex-col gap-4">
                {distData.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-mono text-white/80">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    {entry.name} ({entry.value}%)
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
