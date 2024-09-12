import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim
      modelRef.current.scale.set(scale, scale, scale)

      box.setFromObject(modelRef.current)
      box.getCenter(modelRef.current.position).multiplyScalar(-1)
    }
  }, [scene])

  return <primitive object={scene} ref={modelRef} />
}

function Scene({ url }) {
  const { camera } = useThree()

  useEffect(() => {
    // Set the camera to be closer and centered on the model from the front
    camera.position.set(0, 3, 3) // Camera positioned closer and centered
    camera.lookAt(0, 1, 0) // Adjust the camera's lookAt to center on the model
  }, [camera])

  return (

    <>
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model url={url} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, 1, 0]} // Ensure OrbitControls target the center of the model
      />
    </>
  )

}

export default function Trending() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene url="/bonsairoom.glb" />
        </Suspense>
      </Canvas>
    </div>
  )
}
