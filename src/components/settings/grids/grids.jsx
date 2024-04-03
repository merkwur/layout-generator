import React, { useState } from 'react'
import "./grids.scss"
import GridHelpers from './grid-helpers/grid-helpers'

const Grids = () => {
  const [hLineState, setHLineState] = useState("hide")
  const [hCLineState, setHCLineState] = useState("hide")
  const [vLineState, setVLineState] = useState("hide")

  const handleLineState = (which) => {
    if (which === "horizontal") {
      if (hLineState === "hide")  {
        setHLineState("show")
      } else {setHLineState("hide")}
    } else{
      if (vLineState === "hide") {
        setVLineState("show")
      } else {
        setVLineState("hide")
      }
    }
  }

  const handleLineDegree = (degree, which) => {
    console.log(degree, which)
  }

  return (
    <>
      <div className='heapders'>
        <div className='heapders-text'>
          grid lines
        </div>
      </div>
      <div className='grids-container'>
        <div className='horizontal'>
          <div className='headers'>
            <div className='headers-text'>
              horizontal
            </div>
          </div>
          <div className='grid-settings'>
            <div 
              className='line-state'
              onClick={() => handleLineState("horizontal")}
              >
                {`${hLineState} - lines`}
            </div>
            
            <GridHelpers 
              which={"horizontal"}
              getDegree={(degree, which) => handleLineDegree(degree, which)}
            />
          </div>
        </div>
        <div className='verticals'>
          <div className='headers'>
            <div className='headers-text'>
              vertical
            </div>
          </div>
          <div className='grid-settings'>
            <div 
              className='line-state'
              onClick={() => handleLineState("vertical")}
              >
                {`${vLineState} | lines`}
            </div>
            <GridHelpers 
              which={"vertical"}
              getDegree={(degree, which) => handleLineDegree(degree, which)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Grids