'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { AvatarModel, AvatarModelProps } from './AvatarModel'
import { Suspense } from 'react'

export default function Avatar3DScene(props: AvatarModelProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0.5, 3.5], fov: 45 }}>
        {/* Iluminación tipo estudio de moda */}
        <ambientLight intensity={0.7} />
        
        <directionalLight 
          castShadow 
          position={[2.5, 5, 3]} 
          intensity={1.5} 
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={10}
          shadow-camera-left={-2}
          shadow-camera-right={2}
          shadow-camera-top={2}
          shadow-camera-bottom={-2}
        />
        
        {/* Luz de relleno (fill light) */}
        <directionalLight position={[-3, 2, -3]} intensity={0.5} />
        
        {/* Luz de contra (rim light) para resaltar la silueta */}
        <spotLight position={[0, 4, -4]} intensity={1.5} color="#fff" />
        
        <Suspense fallback={null}>
          <AvatarModel {...props} />
          
          {/* Sombra de contacto suave en el piso */}
          <ContactShadows 
            position={[0, -1.2, 0]} 
            opacity={0.4} 
            scale={2.5} 
            blur={1.5} 
            far={1.5} 
          />
        </Suspense>
        
        {/* Controles de cámara orbitales limitados */}
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={5}
          maxPolarAngle={Math.PI / 2} // No mirar debajo del suelo
          minPolarAngle={Math.PI / 3} // No mirar desde demasiado arriba
          target={[0, 0.2, 0]} // Centrar la mirada un poco más arriba
        />
      </Canvas>
    </div>
  )
}
