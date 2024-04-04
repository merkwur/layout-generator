import React, { useEffect, useRef, useState } from 'react'

import CirclePacks from './circle-packs'
import { useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'

const Circles = ({width, height, centerX, centerY, radius, sendPos, angleH, angleV}) => {
  const [positions, setPositions] = useState([])
  const corners = [[1, 1], [-1, 1], [-1,-1], [1,-1]]
  const [cornerCircleRadius, setCornerCircleRadius] = useState([])
  const [horizontalTangent, setHorizontalTangent] = useState([])
  const [verticalTangents, setVerticalTangent] = useState([])
  const [horizontalCenter, setHorizontalCenter] = useState([])
  const [verticalCenter, setVerticalCenter] = useState([])



  const getInterceptionPoint = (xc, yc, r, px, py) => { 
    const m = py / px
    const y0 = m * px - py
    
    const nominator = Math.sqrt((-yc*yc) + (2 * m * xc - 2 * y0) * yc - y0**2 + 
                                2 * m * xc * y0 - m**2 * xc**2 + (m**2 + 1) * r**2)
    let x = -(nominator - m * yc - m * y0 - xc) / (m**2 + 1)
    let xm = (nominator + m * yc + m * y0 + xc) / (m**2 + 1)
    if (xm > -width && xm < width){ 
      x=xm
    }
    return [x, m * x - y0]
  }

  const distanceTo = (arr1, arr2) => {
    const a = arr1[0] - arr2[0]
    const b = arr1[1] - arr2[1]
    return Math.sqrt(a*a + b*b)
  }

  const tangentLines = (h, v) => {

  }



  useEffect(() => {
    const posArr = []
    const radArr = []
    const arr = []
    const tangentsH = []
    const tangentsV = []
    const centH = []
    const centV = []
    corners.forEach(corner => {
      const whichCorner = [corner[0] * width, corner[1] * height]
      const interception = getInterceptionPoint(centerX, centerY, radius, whichCorner[0], whichCorner[1])
      const distance = distanceTo(interception, whichCorner)
      const r = distance / (Math.sqrt(2) + 1)
      const x = -corner[0] * r + whichCorner[0]
      const y = -corner[1] * r + whichCorner[1]
      
      const tv = [x+r*-corner[0], -12.5, 0, x+r*-corner[0], 12.5, 0]
      const th = [-12.5, y+r*-corner[1], 0, 12.5, y+r*-corner[1], 0]
      const ch = [x, -12.5, 0, x, 12.5, 0]
      const cv = [-12.5, y, 0, 12.5, y, 0]

      centH.push(cv)
      centV.push(ch)

      if (!tangentsH.includes(th)) {
        tangentsH.push(th)
      }
      if (!tangentsV.includes(tv)) {
        tangentsV.push(tv)
      }

      posArr.push([x, y, 0])
      radArr.push(r)
      arr.push(...interception, 0)
    })
    setHorizontalCenter(centH)
    setVerticalCenter(centV)
    setHorizontalTangent(tangentsH)
    setVerticalTangent(tangentsV)
    setPositions(posArr)
    setCornerCircleRadius(radArr)
    // setInters(arr)
    sendPos(posArr)
  }, [width, height, centerX, centerY, radius])

  

  return (
    <>
      {
        positions.map((position, index) => (
          <React.Fragment key={index}>
            {position && cornerCircleRadius[index] ? (
              <>
                <CirclePacks 
                  position={position}
                  radius={cornerCircleRadius[index]}
                />
                <mesh 
                >
                  <Line 
                    rotation={[0,0,angleV*Math.PI/180]}
                    points={verticalTangents[index]}
                    lineWidth={1}
                    color={0xaaaaaaa}
                  />
                  <Line 
                    rotation={[0,0,angleV*Math.PI/180]}
                    points={verticalCenter[index]}
                    lineWidth={1}
                    color={0xaaaaaaa}
                  />
          
                  <Line 
                    rotation={[0,0,angleH*Math.PI/180]}
                    points={horizontalTangent[index]}
                    lineWidth={1}
                    color={0xaaaaaaa}
                  />
                  <Line 
                    rotation={[0,0,angleH*Math.PI/180]}
                    points={horizontalCenter[index]}
                    lineWidth={1}
                    color={0xaaaaaaa}
                    />

                </mesh>

              </>
            ) : null }
          </React.Fragment>
        ))
      }
    </>
    
  )
}

export default Circles