import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const PBox = ({x, y, angle, sx, sy}) => {
  
  const meshRef = useRef()
  

  return (
    <mesh
      position={[x, y, 0]}
      rotation={[angle, angle, 0]}
      scale={[sx, sy, 1]}
      ref={meshRef}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  )
}

export default PBox