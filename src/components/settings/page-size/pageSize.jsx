import React, { useEffect, useState } from 'react'
import "./pageSize.scss"
import Sliders from '../helpers/slider'

const PageSize = ({getValues}) => {
  const [pageSizes, setPageSizes] = useState({x: 9, y: 11})

  const handleSliderValues = (value, which) => {
    const fitted = value / 100 * 20
    if (which === "x") {
      setPageSizes({...pageSizes, x: fitted})
    } else {
      setPageSizes({...pageSizes, y: fitted})
    }
    getValues(value, "page-size", which)
  }

  return (
    <>
      <div className='header-sizing'>
        <div className='header-text'>
          {`page size 
adjustment`}
        </div>
      </div>
      <div 
        className='size-container'
        >
        <Sliders 
          initial={Math.floor(pageSizes.y * 5)}
          orientation={"y"} 
          header={"y"}
          position={{left: 185, top: -5}} 
          mnmx={{min: 5, max:100}}
          getValue={(value, which) => handleSliderValues(value, which)}/>
        <Sliders 
          initial={Math.floor(pageSizes.x * 5)}
          orientation={"x"} 
          position={{left: 69, top: 110}}
          header={"x"}
          mnmx={{min: 5, max:100}}
          getValue={(value, lie) => handleSliderValues(value, lie)}/>
        <div 
          className='page-layout'
          style={{
            backgroundSize: `${101 - pageSizes.x / 2 * 9}px ${122-pageSizes.y / 2 * 11}px`
          }}
        >
        </div>
        <div className='numeric-display'>
          {`${pageSizes.x.toFixed(2)} x - ${pageSizes.y.toFixed(2)} y` }
        </div>
      </div>
  </> 
  )
}

export default PageSize