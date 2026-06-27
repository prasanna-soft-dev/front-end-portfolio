import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Box, Layers, Play, SquareSquare, Activity, Settings2, Trash2, PlusCircle } from 'lucide-react';

const SiKubernetes = Layers;

type PodStatus = 'Running' | 'Pending' | 'Terminating' | 'CrashLoopBackOff';

interface Pod {
  id: string;
  status: PodStatus;
  cpu: number;
  mem: number;
  restarts: number;
}

interface Deployment {
  id: string;
  name: string;
  pods: Pod[];
}

interface Namespace {
  id: string;
  name: string;
  deployments: Deployment[];
}

const initialData: Namespace[] = [
  {
    id: 'ns-prod',
    name: 'production',
    deployments: [
      {
        id: 'dep-api',
        name: 'api-gateway',
        pods: [
          { id: 'pod-api-1', status: 'Running', cpu: 45, mem: 60, restarts: 0 },
          { id: 'pod-api-2', status: 'Running', cpu: 52, mem: 58, restarts: 0 },
          { id: 'pod-api-3', status: 'Running', cpu: 38, mem: 62, restarts: 1 },
        ]
      },
      {
        id: 'dep-auth',
        name: 'auth-service',
        pods: [
          { id: 'pod-auth-1', status: 'Running', cpu: 15, mem: 40, restarts: 0 },
          { id: 'pod-auth-2', status: 'Running', cpu: 18, mem: 42, restarts: 0 },
        ]
      },
      {
        id: 'dep-pay',
        name: 'payment-service',
        pods: [
          { id: 'pod-pay-1', status: 'Running', cpu: 25, mem: 80, restarts: 0 },
          { id: 'pod-pay-2', status: 'Running', cpu: 30, mem: 75, restarts: 0 },
        ]
      }
    ]
  },
  {
    id: 'ns-stag',
    name: 'staging',
    deployments: [
      {
        id: 'dep-api-stg',
        name: 'api-gateway',
        pods: [
          { id: 'pod-api-stg-1', status: 'Running', cpu: 10, mem: 30, restarts: 5 },
        ]
      },
      {
        id: 'dep-test',
        name: 'new-feature-test',
        pods: [
          { id: 'pod-test-1', status: 'CrashLoopBackOff', cpu: 0, mem: 0, restarts: 142 },
        ]
      }
    ]
  }
];

export function K8sVisualizer() {
  const [data, setData] = useState(initialData);
  const [expandedNs, setExpandedNs] = useState<string>('ns-prod');
  const [expandedDep, setExpandedDep] = useState<string>('dep-api');

  const getStatusColor = (status: PodStatus) => {
    switch(status) {
      case 'Running': return 'text-accent bg-accent/10 border-accent/30';
      case 'Pending': return 'text-chart-4 bg-chart-4/10 border-chart-4/30';
      case 'Terminating': return 'text-muted-foreground bg-muted border-muted-foreground/30';
      case 'CrashLoopBackOff': return 'text-destructive bg-destructive/10 border-destructive/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
    }
  };

  const getStatusDot = (status: PodStatus) => {
    switch(status) {
      case 'Running': return 'bg-accent shadow-[0_0_5px_#10B981]';
      case 'Pending': return 'bg-chart-4 animate-pulse';
      case 'Terminating': return 'bg-muted-foreground';
      case 'CrashLoopBackOff': return 'bg-destructive animate-pulse';
    }
  };

  const killPod = (nsId: string, depId: string, podId: string) => {
    setData(prev => {
      return prev.map(ns => {
        if (ns.id !== nsId) return ns;
        return {
          ...ns,
          deployments: ns.deployments.map(dep => {
            if (dep.id !== depId) return dep;
            return {
              ...dep,
              pods: dep.pods.map(pod => {
                if (pod.id !== podId) return pod;
                return { ...pod, status: 'Terminating' };
              })
            };
          })
        };
      });
    });

    // Simulate restart cycle
    setTimeout(() => {
      setData(prev => prev.map(ns => ns.id !== nsId ? ns : {
        ...ns, deployments: ns.deployments.map(dep => dep.id !== depId ? dep : {
          ...dep, pods: dep.pods.map(pod => pod.id !== podId ? pod : { ...pod, status: 'Pending', restarts: pod.restarts + 1 })
        })
      }));
      
      setTimeout(() => {
        setData(prev => prev.map(ns => ns.id !== nsId ? ns : {
          ...ns, deployments: ns.deployments.map(dep => dep.id !== depId ? dep : {
            ...dep, pods: dep.pods.map(pod => pod.id !== podId ? pod : { ...pod, status: 'Running' })
          })
        }));
      }, 2000);
    }, 1500);
  };

  const addPod = (nsId: string, depId: string) => {
    const newId = `pod-${Math.random().toString(36).substr(2, 6)}`;
    setData(prev => prev.map(ns => ns.id !== nsId ? ns : {
      ...ns,
      deployments: ns.deployments.map(dep => dep.id !== depId ? dep : {
        ...dep,
        pods: [...dep.pods, { id: newId, status: 'Pending', cpu: 0, mem: 0, restarts: 0 }]
      })
    }));

    setTimeout(() => {
      setData(prev => prev.map(ns => ns.id !== nsId ? ns : {
        ...ns, deployments: ns.deployments.map(dep => dep.id !== depId ? dep : {
          ...dep, pods: dep.pods.map(pod => pod.id !== newId ? pod : { ...pod, status: 'Running', cpu: Math.floor(Math.random()*40)+10, mem: Math.floor(Math.random()*40)+20 })
        })
      }));
    }, 2000);
  };

  return (
    <section id="kubernetes" className="min-h-screen py-24 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-[#326CE5] mr-2">/</span>
          Kubernetes Cluster
        </h2>
        <div className="h-1 w-24 bg-[#326CE5] shadow-[0_0_10px_rgba(50,108,229,0.5)] rounded mb-12"></div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
          {/* Cluster Tree */}
          <div className="glass-panel p-4 rounded-lg lg:col-span-1 border-primary/20 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-4 text-white font-bold font-mono">
              <Layers className="text-[#326CE5]" /> my-cluster-01
            </div>

            <div className="ml-4 space-y-2 border-l border-white/10 pl-4">
              {data.map(ns => (
                <div key={ns.id}>
                  <button 
                    onClick={() => setExpandedNs(expandedNs === ns.id ? '' : ns.id)}
                    className={`flex items-center gap-2 font-mono text-sm py-1 px-2 rounded w-full text-left transition-colors ${expandedNs === ns.id ? 'bg-[#326CE5]/20 text-white' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                  >
                    <SquareSquare className="w-4 h-4" /> {ns.name}
                  </button>
                  
                  <AnimatePresence>
                    {expandedNs === ns.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 mt-2 space-y-1 border-l border-white/10 pl-4 overflow-hidden"
                      >
                        {ns.deployments.map(dep => (
                          <button
                            key={dep.id}
                            onClick={() => setExpandedDep(dep.id)}
                            className={`flex items-center gap-2 font-mono text-xs py-1.5 px-2 rounded w-full text-left transition-colors ${expandedDep === dep.id ? 'bg-[#326CE5]/20 text-white border border-[#326CE5]/30' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                          >
                            <Settings2 className="w-3 h-3" /> {dep.name}
                            <span className="ml-auto bg-background px-1.5 rounded-sm border border-white/10">{dep.pods.length}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Pods View */}
          <div className="glass-panel p-6 rounded-lg lg:col-span-3 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <SiKubernetes className="w-64 h-64" />
            </div>

            {data.flatMap(ns => ns.deployments).find(d => d.id === expandedDep) ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-mono text-white flex items-center gap-3">
                      Deployment: {data.flatMap(ns => ns.deployments).find(d => d.id === expandedDep)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono mt-1">
                      Namespace: {data.find(ns => ns.deployments.some(d => d.id === expandedDep))?.name}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      const ns = data.find(ns => ns.deployments.some(d => d.id === expandedDep));
                      if (ns) addPod(ns.id, expandedDep);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#326CE5]/20 border border-[#326CE5] text-[#326CE5] rounded hover:bg-[#326CE5] hover:text-white transition-all text-sm font-mono font-bold"
                  >
                    <PlusCircle className="w-4 h-4" /> Scale Up
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar pb-4">
                  <AnimatePresence>
                    {data.flatMap(ns => ns.deployments).find(d => d.id === expandedDep)?.pods.map(pod => (
                      <motion.div
                        key={pod.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`p-4 rounded-lg border bg-background/50 ${getStatusColor(pod.status)} transition-colors duration-500`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <Box className="w-5 h-5" />
                            <span className="font-mono font-bold text-sm text-white">{pod.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold">{pod.status}</span>
                            <div className={`w-2.5 h-2.5 rounded-full ${getStatusDot(pod.status)}`}></div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1 text-muted-foreground">
                              <span>CPU</span><span>{pod.cpu}m / 100m</span>
                            </div>
                            <div className="w-full bg-black/50 rounded-sm h-1.5">
                              <div className="bg-[#326CE5] h-full rounded-sm" style={{ width: `${pod.cpu}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1 text-muted-foreground">
                              <span>Memory</span><span>{pod.mem}Mi / 256Mi</span>
                            </div>
                            <div className="w-full bg-black/50 rounded-sm h-1.5">
                              <div className="bg-[#326CE5] h-full rounded-sm" style={{ width: `${(pod.mem/256)*100}%` }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-white/10 pt-3">
                          <span className="font-mono text-xs text-muted-foreground">Restarts: <span className={pod.restarts > 0 ? 'text-destructive font-bold' : 'text-white'}>{pod.restarts}</span></span>
                          <button 
                            onClick={() => {
                              const ns = data.find(ns => ns.deployments.some(d => d.id === expandedDep));
                              if (ns) killPod(ns.id, expandedDep, pod.id);
                            }}
                            disabled={pod.status !== 'Running' && pod.status !== 'CrashLoopBackOff'}
                            className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 disabled:hover:text-muted-foreground"
                            title="Kill Pod"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
                Select a deployment from the tree to view pods
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
