import React, { useEffect, useState } from 'react'
import "./pageSize.scss"
import Sliders from '../helpers/slider'

const PageSize = () => {
  const [pageSizes, setPageSizes] = useState({x: 9, y: 11})
  const [bs, setBs] = useState({x: 22.25, y: 27.25})


  const handleSliderValues = (value, lie) => {
    const fitted = value / 100 * 20
    if (lie === "x") {
      setPageSizes({...pageSizes, x: fitted})
    } else {
      setPageSizes({...pageSizes, y: fitted})
    }
    
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
          position={{left: 185, top: -5}} 
          mnmx={{min: 5, max:100}}
          getValue={(value) => handleSliderValues(value)}/>
        <Sliders 
          initial={Math.floor(pageSizes.x * 5)}
          orientation={"x"} 
          position={{left: 69, top: 110}}
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