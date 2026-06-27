import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Server, Layers, GitBranch, Terminal, Package, HardDrive, Cpu, Workflow, MemoryStick, Leaf } from 'lucide-react';

const skills = [
  { name: 'Java', icon: Cpu, cpu: 72, mem: 68, lat: 12, req: '2.4k', desc: '6+ years production experience. JVM tuning, GC optimization, concurrency.' },
  { name: 'Spring Boot', icon: Leaf, cpu: 65, mem: 71, lat: 8, req: '3.1k', desc: 'Microservices architecture specialist. Spring Security, Data, Cloud.' },
  { name: 'Hibernate', icon: Database, cpu: 45, mem: 58, lat: 18, req: '1.8k', desc: 'Complex ORM mappings, caching strategies, N+1 query optimization.' },
  { name: 'MySQL', icon: HardDrive, cpu: 78, mem: 62, lat: 3, req: '4.2k', desc: 'Query optimization, indexing strategies, replication, ACID compliance.' },
  { name: 'PostgreSQL', icon: Database, cpu: 71, mem: 65, lat: 2, req: '3.8k', desc: 'Advanced features, JSONB, table partitioning, performance tuning.' },
  { name: 'Redis', icon: MemoryStick, cpu: 12, mem: 89, lat: 0.4, req: '8.5k', desc: 'Caching strategies, pub/sub, sorted sets, Redis Cluster.' },
  { name: 'Kafka', icon: Workflow, cpu: 55, mem: 74, lat: 5, req: '12k', desc: 'Event streaming, consumer groups, partition strategies, offset management.' },
  { name: 'Docker', icon: Package, cpu: 23, mem: 45, lat: 1, req: '890', desc: 'Multi-stage builds, image optimization, docker-compose orchestration.' },
  { name: 'Kubernetes', icon: Layers, cpu: 34, mem: 52, lat: 2, req: '45', desc: 'HPA, resource limits, rolling updates, ConfigMaps, Secrets.' },
  { name: 'AWS', icon: Cloud, cpu: 41, mem: 38, lat: 15, req: '99%', desc: 'EC2, RDS, S3, Lambda, CloudFront, Route53, IAM policies.' },
  { name: 'Linux', icon: Terminal, cpu: 8, mem: 22, lat: 0.1, req: '847', desc: 'Shell scripting, system tuning, networking, cron jobs.' },
  { name: 'Git', icon: GitBranch, cpu: 5, mem: 12, lat: 50, req: '2.4k', desc: 'Git flow, rebasing, complex conflict resolution, hooks.' },
];

export function SkillsCluster() {
  return (
    <section id="skills" className="min-h-screen py-24 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-secondary mr-2">/</span>
          Skills Infrastructure Cluster
        </h2>
        <div className="h-1 w-24 bg-secondary shadow-[0_0_10px_rgba(124,58,237,0.5)] rounded mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <SkillCard key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: typeof skills[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-panel p-5 rounded-lg border transition-all duration-300 relative overflow-hidden group ${
        isHovered ? 'border-secondary shadow-[0_0_20px_rgba(124,58,237,0.2)] bg-secondary/5' : 'border-primary/10 hover:border-primary/30'
      }`}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded bg-background border ${isHovered ? 'border-secondary text-secondary' : 'border-primary/30 text-primary'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="font-mono font-bold text-lg text-white">{skill.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_5px_#10B981]"></div>
          <span className="font-mono text-xs text-accent">ON</span>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
              <span>CPU</span>
              <span className={isHovered ? 'text-secondary' : ''}>{skill.cpu}%</span>
            </div>
            <div className="w-full bg-background border border-primary/20 rounded-sm h-1.5 overflow-hidden">
              <motion.div 
                className={`h-full ${isHovered ? 'bg-secondary' : 'bg-primary'}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.cpu}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
              <span>MEM</span>
              <span className={isHovered ? 'text-secondary' : ''}>{skill.mem}%</span>
            </div>
            <div className="w-full bg-background border border-primary/20 rounded-sm h-1.5 overflow-hidden">
              <motion.div 
                className={`h-full ${isHovered ? 'bg-secondary' : 'bg-primary'}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.mem}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <div className="text-xs font-mono">
            <span className="text-muted-foreground">LAT:</span>{' '}
            <span className="text-white">{skill.lat}ms</span>
          </div>
          <div className="text-xs font-mono">
            <span className="text-muted-foreground">REQ:</span>{' '}
            <span className="text-white">{skill.req}/s</span>
          </div>
        </div>

        <div className={`text-sm text-muted-foreground pt-2 transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="font-sans leading-relaxed text-white/80">{skill.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
