import React from 'react'
import Sliders from '../helpers/slider'
import "./circle-radius.scss"

const CircleRadius = ({getValues}) => {

  const handleSliderValue = (value, which) => {
    getValues(value, "circle-radius", which)
  }

  return (
    <div className='header-rad'>
      <div className='header-text-rad'> 
        circles' radius
      </div>
      <div className='sliders'>
        <Sliders 
          initial={0}
          orientation={"x"}
          header={"inner-circle"}
          position={{left: 50, top: 0}}
          getValue={(value, which) => handleSliderValue(value, which)}
          mnmx={{min: 0, max:100}}
        />
        <Sliders 
          initial={0}
          orientation={"x"}
          header={"outer-circle"}
          position={{left: 50, top: 40}}
          getValue={(value, which) => handleSliderValue(value, which)}
          mnmx={{min: 0, max:100}}
        />
        
      </div>
    </div>
  )
}

export default CircleRadius