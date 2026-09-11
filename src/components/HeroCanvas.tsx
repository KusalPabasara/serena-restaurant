import { ContactShadows, Environment, Float } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import type { Group } from 'three'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMedia'

function Emblem({ interactive }: { interactive: boolean }) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current || !interactive) return
    const x = state.pointer.x * 0.35
    const y = state.pointer.y * 0.2
    group.current.rotation.y += (x - group.current.rotation.y) * 0.05
    group.current.rotation.x += (-y * 0.4 - group.current.rotation.x) * 0.05
  })

  const materials = useMemo(
    () => ({
      forest: '#2f3d32',
      gold: '#c4a574',
      leaf: '#4a5c4a',
    }),
    [],
  )

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.45}>
      <group ref={group} position={[0, 0.05, 0]}>
        <mesh rotation={[Math.PI / 2.1, 0, 0]}>
          <torusGeometry args={[1.05, 0.08, 24, 96]} />
          <meshStandardMaterial color={materials.forest} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh rotation={[Math.PI / 2.1, 0, 0]} position={[0, -0.02, 0]}>
          <circleGeometry args={[0.95, 64]} />
          <meshStandardMaterial color="#f6f1e8" roughness={0.7} metalness={0} />
        </mesh>
        <mesh rotation={[Math.PI / 2.1, 0, 0.35]} position={[-0.15, 0.03, 0]}>
          <torusGeometry args={[0.72, 0.02, 12, 64, Math.PI * 0.9]} />
          <meshStandardMaterial color={materials.gold} roughness={0.25} metalness={0.55} />
        </mesh>
        <group position={[0.85, 0.15, 0.1]} rotation={[0.2, 0, -0.35]}>
          <mesh>
            <boxGeometry args={[0.08, 1.35, 0.04]} />
            <meshStandardMaterial color={materials.forest} roughness={0.3} metalness={0.2} />
          </mesh>
          {[-0.12, -0.04, 0.04, 0.12].map((x) => (
            <mesh key={x} position={[x, 0.72, 0]}>
              <boxGeometry args={[0.035, 0.35, 0.03]} />
              <meshStandardMaterial color={materials.forest} roughness={0.3} metalness={0.2} />
            </mesh>
          ))}
        </group>
        <group position={[1.05, 0.55, 0]} rotation={[0.4, 0.2, 0.8]}>
          <mesh>
            <sphereGeometry args={[0.28, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={materials.leaf} roughness={0.55} metalness={0.05} />
          </mesh>
          <mesh position={[0, 0.02, 0]} scale={[0.02, 0.28, 0.02]}>
            <boxGeometry />
            <meshStandardMaterial color={materials.forest} />
          </mesh>
        </group>
      </group>
      <ContactShadows position={[0, -1.15, 0]} opacity={0.35} scale={8} blur={2.4} far={3} />
    </Float>
  )
}

function BrandFallback({ animated }: { animated: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className={animated ? 'animate-[float_5s_ease-in-out_infinite]' : undefined}
        style={{
          transform: 'perspective(800px) rotateY(-12deg) rotateX(6deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src="/logo.jpg"
          alt=""
          aria-hidden
          className="h-40 w-auto rounded-2xl bg-cream/90 object-contain p-3 shadow-[0_25px_60px_rgba(28,36,30,0.18)] md:h-52"
        />
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: perspective(800px) rotateY(-12deg) rotateX(6deg) translateY(0); }
          50% { transform: perspective(800px) rotateY(-8deg) rotateX(4deg) translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

export function HeroCanvas() {
  const reduce = usePrefersReducedMotion()
  const mobile = useIsMobile()

  if (reduce || mobile) {
    return <BrandFallback animated={!reduce} />
  }

  return (
    <div className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#fff8ef" />
        <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#c4a574" />
        <Suspense fallback={null}>
          <Emblem interactive />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  )
}
