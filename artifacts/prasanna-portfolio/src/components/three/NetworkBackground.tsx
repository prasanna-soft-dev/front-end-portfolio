import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NetworkBackground() {
  const particlesCount = 80;
  const edgesCount = 150;
  
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const targetMouseRef = useRef(new THREE.Vector2());

  // Generate random positions
  const { positions, edges } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const pts = [];
    
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      pts.push(new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]));
    }

    const edg = new Float32Array(edgesCount * 6);
    let edgeIndex = 0;
    
    // Connect nearest neighbors
    for (let i = 0; i < particlesCount && edgeIndex < edgesCount * 2; i++) {
      const p1 = pts[i];
      const distances = [];
      for (let j = 0; j < particlesCount; j++) {
        if (i !== j) {
          distances.push({ index: j, dist: p1.distanceTo(pts[j]) });
        }
      }
      distances.sort((a, b) => a.dist - b.dist);
      
      for (let k = 0; k < Math.min(3, distances.length); k++) {
        if (edgeIndex < edgesCount * 2) {
          const p2 = pts[distances[k].index];
          edg[edgeIndex * 3] = p1.x;
          edg[edgeIndex * 3 + 1] = p1.y;
          edg[edgeIndex * 3 + 2] = p1.z;
          edg[(edgeIndex + 1) * 3] = p2.x;
          edg[(edgeIndex + 1) * 3 + 1] = p2.y;
          edg[(edgeIndex + 1) * 3 + 2] = p2.z;
          edgeIndex += 2;
        }
      }
    }
    
    return { positions: pos, edges: edg };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mouseRef.current.lerp(targetMouseRef.current, 0.05);

    if (meshRef.current) {
      for (let i = 0; i < particlesCount; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        
        // Float animation
        dummy.position.set(
          x + Math.sin(time + i) * 0.2 + mouseRef.current.x * z * 0.1,
          y + Math.cos(time + i) * 0.2 + mouseRef.current.y * z * 0.1,
          z
        );
        
        // Pulse size
        const scale = 1 + Math.sin(time * 2 + i) * 0.3;
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
    
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
      linesRef.current.rotation.x = Math.cos(time * 0.1) * 0.1;
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: '#00E5FF', transparent: true, opacity: 0.8 }), particlesCount]}>
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={edges.length / 3} array={edges} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#7C3AED" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}
