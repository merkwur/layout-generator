import React, { useRef, useState } from 'react'
import * as THREE from "three"

const Circles = () => {
  const [origin, setOrigin] = useState(new THREE.Vector2(0, 0))
  const [pointOnCircle, setPointOnCircle] = useState(new THREE.Vector2(0, 0))
  const circle = useRef()

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
    <mesh>
      
    </mesh>
  )
}

export default Circles