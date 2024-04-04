import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { LineBasicMaterial } from 'three'


const CirclePacks = ({radius, position}) => {
  const meshRef = useRef()
  const [points, setPoints] = useState(null)

  useEffect(() => {
    if (meshRef.current) {
      let arr = []
      let n = 64
      let w = 360 / n
      let r = Math.PI/180
      
      for (let i = 0; i < n + 1; i++){
        arr.push(Math.cos(i * w * r) * radius) 
        arr.push(Math.sin(i * w * r) * radius)
        arr.push(0)
      }
      
      setPoints(arr)
    }
  }, [radius, position])
  
  
  return (    
    <mesh
      ref={meshRef}
      name='packs'
      position={[...position, 0]}
      >  
      <Line 
        points={points ? points : [0,0,0]}
        lineWidth={1}
        color={0xaaaaaaa}
      />
    </mesh>
  
  )
}


export default CirclePacks