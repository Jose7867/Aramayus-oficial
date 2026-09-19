import { useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'

export interface AvatarModelProps {
  gender: 'f' | 'm'
  skinTone: string
  hairColor: string
  fabricColor: string
  fabricRoughness: number
  heightScale: number
  shoulderScale: number
  chestScale: number
}

export function AvatarModel({
  gender, skinTone, hairColor, fabricColor, fabricRoughness,
  heightScale, shoulderScale, chestScale
}: AvatarModelProps) {
  const group = useRef<Group>(null)

  // Animación suave (idle)
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = (Math.sin(state.clock.elapsedTime) * 0.03) - 1.2
    }
  })

  const isFemale = gender === 'f'

  return (
    <group ref={group} scale={[1, heightScale, 1]} position={[0, -1.2, 0]}>
      {/* CABEZA */}
      <group position={[0, 2.5, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[isFemale ? 0.18 : 0.2, 32, 32]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
        {/* Cabello básico */}
        <mesh castShadow position={[0, 0.05, -0.05]}>
          <sphereGeometry args={[isFemale ? 0.19 : 0.21, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={hairColor} roughness={0.8} />
        </mesh>
      </group>

      {/* CUELLO */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 16]} />
        <meshStandardMaterial color={skinTone} roughness={0.4} />
      </mesh>

      {/* TORSO / ROPA (Blazer) */}
      <group position={[0, 1.5, 0]} scale={[shoulderScale, 1, chestScale]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[isFemale ? 0.35 : 0.42, isFemale ? 0.3 : 0.35, 1.1, 32]} />
          <meshStandardMaterial color={fabricColor} roughness={fabricRoughness} metalness={0.1} />
        </mesh>
        
        {/* Detalles de la prenda: cuello en V y botones */}
        <mesh castShadow position={[0, 0.2, 0.36]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.05]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
        
        {/* Botón */}
        <mesh castShadow position={[0, -0.2, 0.35]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshStandardMaterial color="#1a1a2a" roughness={0.3} />
        </mesh>
      </group>

      {/* BRAZOS */}
      <group position={[-(isFemale ? 0.4 : 0.48) * shoulderScale, 1.8, 0]}>
        <mesh castShadow position={[0, -0.4, 0]} rotation={[0, 0, 0.1]}>
          <capsuleGeometry args={[0.08, 0.7, 16, 16]} />
          <meshStandardMaterial color={fabricColor} roughness={fabricRoughness} />
        </mesh>
        <mesh castShadow position={[-0.08, -0.9, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
      </group>
      
      <group position={[(isFemale ? 0.4 : 0.48) * shoulderScale, 1.8, 0]}>
        <mesh castShadow position={[0, -0.4, 0]} rotation={[0, 0, -0.1]}>
          <capsuleGeometry args={[0.08, 0.7, 16, 16]} />
          <meshStandardMaterial color={fabricColor} roughness={fabricRoughness} />
        </mesh>
        <mesh castShadow position={[0.08, -0.9, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
      </group>

      {/* PIERNAS (Pantalón) */}
      <group position={[-0.15, 0.45, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[isFemale ? 0.12 : 0.15, isFemale ? 0.09 : 0.11, 0.9, 32]} />
          <meshStandardMaterial color="#2a2a3a" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, -0.48, 0.05]}>
          <boxGeometry args={[0.12, 0.08, 0.25]} />
          <meshStandardMaterial color="#1a1a2a" roughness={0.5} />
        </mesh>
      </group>
      
      <group position={[0.15, 0.45, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[isFemale ? 0.12 : 0.15, isFemale ? 0.09 : 0.11, 0.9, 32]} />
          <meshStandardMaterial color="#2a2a3a" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, -0.48, 0.05]}>
          <boxGeometry args={[0.12, 0.08, 0.25]} />
          <meshStandardMaterial color="#1a1a2a" roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}
