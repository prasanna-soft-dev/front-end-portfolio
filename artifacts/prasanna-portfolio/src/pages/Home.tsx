import { Suspense, lazy } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/layout/HeroSection';
import { RecruiterModeToggle, RecruiterMode } from '@/components/recruiter/RecruiterMode';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ArchitectureFlow = lazy(() => import('@/components/architecture/ArchitectureFlow').then(m => ({ default: m.ArchitectureFlow })));
const RequestSimulator = lazy(() => import('@/components/simulator/RequestSimulator').then(m => ({ default: m.RequestSimulator })));
const IncidentDashboard = lazy(() => import('@/components/dashboard/IncidentDashboard').then(m => ({ default: m.IncidentDashboard })));
const SkillsCluster = lazy(() => import('@/components/skills/SkillsCluster').then(m => ({ default: m.SkillsCluster })));
const K8sVisualizer = lazy(() => import('@/components/kubernetes/K8sVisualizer').then(m => ({ default: m.K8sVisualizer })));
const DatabaseExplorer = lazy(() => import('@/components/database/DatabaseExplorer').then(m => ({ default: m.DatabaseExplorer })));
const SystemDesignPlayground = lazy(() => import('@/components/systemdesign/SystemDesignPlayground').then(m => ({ default: m.SystemDesignPlayground })));
const ProjectServices = lazy(() => import('@/components/projects/ProjectServices').then(m => ({ default: m.ProjectServices })));
const MetricsDashboard = lazy(() => import('@/components/metrics/MetricsDashboard').then(m => ({ default: m.MetricsDashboard })));
const InteractiveTerminal = lazy(() => import('@/components/terminal/InteractiveTerminal').then(m => ({ default: m.InteractiveTerminal })));

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground relative">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Architecture...</div>}>
          <ArchitectureFlow />
        </Suspense>
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Simulator...</div>}>
          <RequestSimulator />
        </Suspense>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Incident Dashboard...</div>}>
          <IncidentDashboard />
        </Suspense>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Skills...</div>}>
          <SkillsCluster />
        </Suspense>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Kubernetes...</div>}>
          <K8sVisualizer />
        </Suspense>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Database...</div>}>
          <DatabaseExplorer />
        </Suspense>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading System Design...</div>}>
          <SystemDesignPlayground />
        </Suspense>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Projects...</div>}>
          <ProjectServices />
        </Suspense>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Metrics...</div>}>
          <MetricsDashboard />
        </Suspense>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-mono">Loading Terminal...</div>}>
          <InteractiveTerminal />
        </Suspense>
      </main>

      <RecruiterModeToggle />
      <RecruiterMode />
    </div>
  );
}
