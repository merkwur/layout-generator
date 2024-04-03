import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import vertexShader from "../shaders/vertexShader.glsl"
import fragmentShader from "../shaders/fragmentShader.glsl"
import * as THREE from "three"

const LayoutShader = shaderMaterial(
  {resolution: [9, 11],
  }, 
  vertexShader, 
  fragmentShader
)
extend({LayoutShader})

const Layout = ({x, y}) => {
  const origin = new THREE.Vector2(0, 0)
  const pointOnCircle = new THREE.Vector2(0, 0)
  const radius = 12
  const whichCorner = new THREE.Vector2(0, 0)
  const planeWidth = 4.5
  const planeHeigth = 5.5
  const corners = [{x:1, y:1}, {x:-1, y:-1}, {x:-1, y:1}, {x:1, y:-1}]
  const mesh = useRef()

  const drawCirclesFromCorners = (pointOnCircle, radius) => {
    corners.forEach(corner => {
      const interception = getInterceptionPoint(pointOnCircle.x, pointOnCircle.y, radius, corner.x*planeWidth, corner.y*planeHeigth)
      whichCorner.set(corner.x*planeWidth, corner.y*planeHeigth)
      const distance = whichCorner.distanceTo(interception)
      const r = distance / (Math.sqrt(2) + 1)
      const x = -corner.x * r + whichCorner.x
      const y = -corner.y * r + whichCorner.y
    })
  }
  const getInterceptionPoint = (xc, yc, r, px, py) => { 
    const m = py / px
    const y0 = m * px - py
    const nominator = Math.sqrt((-yc*yc) + (2 * m * xc - 2 * y0) * yc - y0**2 + 
                                2 * m * xc * y0 - m**2 * xc**2 + (m**2 + 1) * r**2)
    let x = -(nominator - m * yc - m * y0 - xc) / (m**2 + 1)
    const xm = (nominator + m * yc + m * y0 + xc) / (m**2 + 1)
    if (xm > -4.5 && xm < 4.5){ 
      x=xm
    }
    return new THREE.Vector3(x, m * x - y0 , 0)
  }
  
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