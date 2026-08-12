import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

function RealisticVaquitaModel({ estado }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Movimiento suave de nado biológico
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.1}>
      {/* CUERPO ANATÓMICO (Gris oscuro dorsal, vientre blanco) */}
      <mesh position={[0, 0, 0]} scale={[0.7, 0.65, 1.8]}>
        <capsuleGeometry args={[0.7, 1.2, 16, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* VIENTRE BLANCO (Ventral) */}
      <mesh position={[0, -0.22, 0]} scale={[0.65, 0.45, 1.7]}>
        <capsuleGeometry args={[0.65, 1.1, 16, 32]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
      </mesh>

      {/* HOCICO / CABEZA REDONDEADA Y MANCHA NEGRA EN LOS LABIOS */}
      <mesh position={[0, -0.05, 1.4]} scale={[0.5, 0.45, 0.4]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#1E293B" roughness={0.5} />
      </mesh>

      {/* ANILLOS NEGROS CARACTERÍSTICOS ALREDEDOR DE LOS OJOS (Phocoena sinus) */}
      <mesh position={[-0.32, 0.08, 1.1]} scale={[0.3, 0.3, 0.1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
      <mesh position={[0.32, 0.08, 1.1]} scale={[0.3, 0.3, 0.1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>

      {/* OJOS PEQUEÑOS Y BIOLÓGICOS */}
      <mesh position={[-0.33, 0.08, 1.15]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#000000" roughness={0.1} />
      </mesh>
      <mesh position={[0.33, 0.08, 1.15]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#000000" roughness={0.1} />
      </mesh>

      {/* ALETA DORSAL ALTA Y TRIANGULAR (Rasgo definitivo de la Vaquita Marina) */}
      <mesh position={[0, 0.75, -0.2]} rotation={[-0.4, 0, 0]} scale={[0.12, 0.9, 0.5]}>
        <coneGeometry args={[0.6, 1.2, 16]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} />
      </mesh>

      {/* ALETAS PECTORALES (Pectoral Flippers) */}
      <mesh position={[-0.65, -0.2, 0.5]} rotation={[0.2, 0.3, -0.6]} scale={[0.1, 0.5, 0.3]}>
        <boxGeometry args={[0.3, 1.2, 0.5]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.65, -0.2, 0.5]} rotation={[0.2, -0.3, 0.6]} scale={[0.1, 0.5, 0.3]}>
        <boxGeometry args={[0.3, 1.2, 0.5]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* ALETAS CAUDALES (Flukes de cola horizontal) */}
      <group position={[0, 0, -1.5]}>
        <mesh rotation={[0, 0, 0]} scale={[1.4, 0.08, 0.4]}>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
      </group>

      {/* ACCESORIOS REANATOMIZADOS SEGÚN ESTADO */}
      {estado === 'con_agua' && (
        <mesh position={[0, 1.0, 0.4]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#0077B6" roughness={0.1} transparent opacity={0.8} />
        </mesh>
      )}

      {estado === 'sin_agua' && (
        <group position={[0.5, 0.2, 0.8]} rotation={[0, 0, -0.4]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.15, 0.35, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.5} />
          </mesh>
        </group>
      )}

      {estado === 'mantenimiento' && (
        <group position={[0, 0.72, 0.7]} scale={0.65}>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.55, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#E85D04" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.08, 0]} scale={[1.1, 0.05, 1.1]}>
            <cylinderGeometry args={[0.6, 0.6, 0.15, 16]} />
            <meshStandardMaterial color="#D97706" />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function Vaquita3DViewer({ estado = 'con_agua', height = 210 }) {
  return (
    <div style={{ height: `${height}px`, width: '100%', position: 'relative', background: '#F1F5F9', borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [2.2, 1.0, 3.2], fov: 42 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, -2, -5]} intensity={0.4} color="#94A3B8" />
        
        <RealisticVaquitaModel estado={estado} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />
      </Canvas>
      <div 
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          background: 'rgba(15, 23, 42, 0.75)',
          color: '#FFFFFF',
          fontSize: '10px',
          fontWeight: 700,
          padding: '3px 8px',
          borderRadius: '6px'
        }}
      >
        Modelo 3D: Phocoena sinus (Vaquita Marina)
      </div>
    </div>
  );
}
