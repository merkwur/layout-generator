import React, { useState } from 'react'
import Sliders from '../helpers/slider'
import "./circle-radius.scss"

const CircleRadius = ({getValues}) => {
  const [inner, setInner] = useState(12)
  const [outer, setOuter] = useState(12)

  const handleSliderValue = (value, which) => {
    getValues(value, "circle-radius", which)
    if (which === "inner") {
      setInner(value)
    } else {
      setOuter(value)
    }
  }

  return (
    <div className='header-rad'>
      <div className='header-text-rad'> 
        circles' radius
      </div>
      <div className='sliders'>
        <Sliders 
          initial={12}
          orientation={"x"}
          header={"inner"}
          position={{left: 50, top: 0}}
          getValue={(value, which) => handleSliderValue(value, which)}
          mnmx={{min: 2, max:100}}
        />
        <div 
          className='screen'
          style={{
            position: "absolute", 
            top: "10px", left: "20px"
          }}
          >
          {inner}
        </div>
        <Sliders 
          initial={12}
          orientation={"x"}
          header={"outer"}
          position={{left: 50, top: 40}}
          getValue={(value, which) => handleSliderValue(value, which)}
          mnmx={{min: 2, max: 100}}
        />
        <div 
          className='screen'
          style={{
            position: "absolute", 
            top: "51px", left: "20px"
          }}
          >
          {outer}
        </div>
      </div>
    </div>
  )
}

export default CircleRadius