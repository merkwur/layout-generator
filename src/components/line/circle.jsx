import { Line } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'


const CircleMain = ({radius, position}) => {
  
  const meshRef = useRef()
  const [points, setPoints] = useState(null)

  useEffect(() => {
    let arr = []
    let n = 128
    let t = 360 / n
    let r = Math.PI/180
    if(position) {
      for (let i = 0; i < n + 1; i++){
        arr.push(position[0] + Math.cos(i * t * r) * radius) 
        arr.push(position[1] + Math.sin(i * t * r) * radius)
        arr.push(0)
      }
    } else {
      for (let i = 0; i < 61; i++){
        arr.push(Math.cos(i * t * r) * radius)
        arr.push(Math.sin(i * t * r) * radius)
        arr.push(0)
      }
    }
    setPoints(arr);
  }, [radius, position]); // Also, include `position` and `radius` in your dependency array to ensure the effect runs when these values change.
  

  const calculateLine = () => {

  }
  
  return (
    <mesh
      ref={meshRef}>
      <Line 
        points={points ? points : [0,0,0]}
        position={position}
        lineWidth={3}
      />
      <lineBasicMaterial color={'hotpink'} />
    </mesh>
  )
}


export default CircleMain