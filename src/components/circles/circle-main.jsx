import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'


const CircleMain = ({radius, position, state}) => {
  const meshRef = useRef()
  const [points, setPoints] = useState(null)
  useEffect(() => {
    if (meshRef.current) {
      let arr = []
      let n = 32
      let w = 360 / n
      let r = Math.PI/180
      if(position) {
        for (let i = 0; i < n + 1; i++){
          arr.push(position[0] + Math.cos(i * w * r) * radius) 
          arr.push(position[1] + Math.sin(i * w * r) * radius)
          arr.push(0)
        }
      } else {
        for (let i = 0; i < 61; i++){
          arr.push(Math.cos(i * w * r) * radius)
          arr.push(Math.sin(i * w * r) * radius)
          arr.push(0)
        }
      }
      setPoints(arr)
    }
  }, [radius, position])
  
  
  return (
    <mesh
      ref={meshRef}
      visible={false}
      >
        
      <Line 
        points={points ? points : [0,0,0]}
        position={position ? position : [0,0,0]}
        lineWidth={1}

      />
    </mesh>
  )
}


export default CircleMain