import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import vertexShader from "../shaders/vertexShader.glsl"
import fragmentShader from "../shaders/fragmentShader.glsl"
import * as THREE from "three"

const LayoutShader = shaderMaterial(
  {
    resolution: [9, 11],
    pointsX: new Float32Array([.0, .0, .0, .0]), 
    pointsY: new Float32Array([.0, .0, .0, .0])

  }, 
  vertexShader, 
  fragmentShader
)
extend({LayoutShader})

const Layout = ({x, y, centers}) => {
  const mesh = useRef()

  useEffect(() => {
    const arrX = []
    const arrY = []

    centers.forEach(center => {
      arrX.push((center[0] + (x / 2)) / x)
      arrY.push((center[1] + (y/ 2)) / y)
    })

    mesh.current.material.uniforms.pointsX.value = new Float32Array(arrX)
    mesh.current.material.uniforms.pointsY.value = new Float32Array(arrY)
    mesh.current.material.uniforms.resolution.value = [x, y]
  }, [centers, x, y])

  
  return (
    <mesh
      ref={mesh}
    >
      <planeGeometry args={[x ,y]} /> 
      <layoutShader />
    </mesh>
  )
}

export default Layout