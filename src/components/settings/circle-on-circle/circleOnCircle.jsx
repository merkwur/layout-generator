import React, { useEffect, useRef, useState } from 'react'
import "./circleOnCircle.scss"
import { clamp } from '../../helpers'
import Sliders from '../helpers/slider'
import { advance } from '@react-three/fiber'


const CircleOnCircle = ({getValues}) => {
  const [circleState, setCircleState] = useState("hide")
  const [containerDim, setContainerDim] = useState({x:0, y:0})
  const radialStickRef = useRef()
  const [theta, setTheta] = useState(0)

  const handleCircleShow = () => {
    if (circleState === "hide") {
      setCircleState("show")
    } else {
      setCircleState("hide")
    }
  }

  const handleSliderValues = (value, which) => {
    const current = radialStickRef.current
    const angle = -Math.PI * 2 / 100 * value
    current.style.left = `${50 + Math.cos(angle) * 50}px`
    current.style.top = `${50 + Math.sin(angle) * 50}px`
    setTheta(Math.floor(angle*180/Math.PI)*-1)
    getValues(angle, "on-circle", which)
    
  }

  return (
    <>
      <div className='header'>
        <div className='header-text'>
          {`on-circle 
position`}
        </div>
      </div>
        <div className='center-settings'>
        <div 
          className='circle-state'
          onClick={handleCircleShow}
        >
          {`${circleState} circle`}
        </div>
        <div className='on-circle-container'>
          <div 
            ref={radialStickRef}
            className='on-circle'
            style={{left: "100% ", top: "50%"}}
            >

          </div>
        </div>
        <Sliders 
          initial={1}
          orientation={"x"} 
          header={"angle"}
          position={{left: 0, top: 140}}
          mnmx={{min: 0, max:99.6}}
          getValue={(value, lie) => handleSliderValues(value, lie)}/>
        <div 
            className='screen'
            style={{
              position: "absolute", 
              top: "151px", left: "-28px",
              fontSize: "10pt", fontWeight: "700", color: "#ccc"
            }}
            >
            {theta}
          </div>
      </div>
    </>
  )
}

export default CircleOnCircle