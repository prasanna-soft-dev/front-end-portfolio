import { useCallback, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, Node, Position, MarkerType, useNodesState, useEdgesState, Handle } from 'reactflow';
import { 
  Server, Database, Cloud, Globe, Key, ShoppingCart, CreditCard, Bell, 
  Activity, Layers
} from 'lucide-react';

const CustomNode = ({ data }: { data: any }) => (
  <div className="glass-panel p-4 rounded-lg min-w-[200px] border-primary/30 relative group cursor-pointer hover:border-primary transition-colors glow-border">
    <Handle type="target" position={Position.Top} style={{ background: '#00E5FF', border: 'none', width: 8, height: 8 }} />
    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#10B981]"></div>
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded bg-primary/10 text-primary">
        {data.icon}
      </div>
      <div className="font-mono text-sm font-bold text-white">{data.label}</div>
    </div>
    
    {/* Tooltip on hover */}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 glass-panel bg-background/95 p-3 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border-secondary/50">
      <p className="text-white/90 leading-relaxed font-sans">{data.description}</p>
    </div>
    <Handle type="source" position={Position.Bottom} style={{ background: '#00E5FF', border: 'none', width: 8, height: 8 }} />
  </div>
);

const nodeTypes = { custom: CustomNode };

const initialNodes: Node[] = [
  { id: 'client', type: 'custom', position: { x: 400, y: 0 }, data: { label: 'Client (Web/Mobile)', icon: <Globe size={20}/>, description: 'Entry point for all user requests. React/React Native frontend.' } },
  { id: 'gateway', type: 'custom', position: { x: 400, y: 150 }, data: { label: 'API Gateway', icon: <Layers size={20}/>, description: 'Rate limiting, routing, auth validation. Tech: Spring Cloud Gateway. Throughput: 50k req/s' } },
  { id: 'auth', type: 'custom', position: { x: 100, y: 300 }, data: { label: 'Auth Service', icon: <Key size={20}/>, color: 'secondary', description: 'JWT generation, OAuth2, session management. Tech: Spring Security + Redis. Throughput: 20k req/s' } },
  { id: 'order', type: 'custom', position: { x: 400, y: 300 }, data: { label: 'Order Service', icon: <ShoppingCart size={20}/>, description: 'Core business logic, order lifecycle. Tech: Spring Boot + Hibernate. Throughput: 10k req/s' } },
  { id: 'payment', type: 'custom', position: { x: 700, y: 300 }, data: { label: 'Payment Service', icon: <CreditCard size={20}/>, description: 'PCI-DSS compliant payment processing. Tech: Spring Boot + Stripe SDK. Throughput: 5k req/s' } },
  { id: 'notification', type: 'custom', position: { x: 1000, y: 300 }, data: { label: 'Notification Service', icon: <Bell size={20}/>, description: 'Email/SMS/Push notifications. Tech: Spring Boot + Twilio. Throughput: 15k req/s' } },
  { id: 'kafka', type: 'custom', position: { x: 550, y: 450 }, data: { label: 'Kafka Broker', icon: <Activity size={20}/>, color: 'secondary', description: 'Event streaming, decoupled services. Tech: Apache Kafka 3.x. Throughput: 1M msg/s' } },
  { id: 'redis', type: 'custom', position: { x: 100, y: 450 }, data: { label: 'Redis Cache', icon: <Database size={20}/>, color: 'destructive', description: 'Session cache, rate limiting store. Tech: Redis 7 Cluster. Latency: <1ms' } },
  { id: 'mysql', type: 'custom', position: { x: 400, y: 600 }, data: { label: 'MySQL DB', icon: <Database size={20}/>, description: 'Transactional data, ACID compliance. Tech: MySQL 8.0 + InnoDB. Throughput: 5k TPS' } },
  { id: 'aws', type: 'custom', position: { x: 400, y: 750 }, data: { label: 'AWS Cloud', icon: <Cloud size={20}/>, color: 'chart-4', description: 'EC2, RDS, S3, CloudFront, Route53. Multi-AZ deployment' } },
];

const edgeStyle = { stroke: '#00E5FF', strokeWidth: 2 };
const edgeMarker = { type: MarkerType.ArrowClosed, color: '#00E5FF' };

const initialEdges: Edge[] = [
  { id: 'e1', source: 'client', target: 'gateway', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e2', source: 'gateway', target: 'auth', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e3', source: 'gateway', target: 'order', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e4', source: 'gateway', target: 'payment', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e5', source: 'auth', target: 'redis', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e6', source: 'order', target: 'mysql', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e7', source: 'order', target: 'kafka', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e8', source: 'payment', target: 'kafka', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e9', source: 'kafka', target: 'notification', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e10', source: 'mysql', target: 'aws', style: { stroke: '#7C3AED', strokeWidth: 2, strokeDasharray: '5 5' } },
];

export function ArchitectureFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <section id="architecture" className="min-h-screen py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          <span className="text-primary mr-2">/</span>
          Architecture Control Center
        </h2>
        <div className="h-1 w-24 bg-primary glow-border rounded"></div>
        <p className="mt-4 text-muted-foreground font-mono max-w-2xl">
          Hover over nodes to inspect microservice details. Data flow is animated.
        </p>
      </div>

      <div className="w-full h-[800px] border-y border-primary/20 bg-background/50 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          className="bg-grid-white/[0.02]"
        >
          <Background color="#00E5FF" gap={20} size={1} opacity={0.1} />
          <Controls className="bg-card border border-primary/20 fill-white" />
        </ReactFlow>
      </div>
    </section>
  );
}
