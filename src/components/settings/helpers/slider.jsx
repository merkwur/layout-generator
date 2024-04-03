import React, { useEffect, useRef, useState } from 'react'
import "./slider.scss"
import { events } from '@react-three/fiber'
import { clamp } from '../../helpers'

const Sliders = ({initial, orientation, header, position, getValue, mnmx}) => {
  const [value, setValue] = useState(initial)
  const [dragState, setDragState] = useState(
    {
      isDragging: false, 
      initial: 0, 
      minmax: {min: mnmx.min, max: mnmx.max}
    }
  )
  const sliderRef = useRef()

  const handleMouseDown = (event) => {
    let x = event.clientX
    let y = event.clientY

    const focusedOn = document.elementFromPoint(x, y)

    if (focusedOn.className.includes("thumb")) {
      const {left, bottom} = focusedOn.getBoundingClientRect()
      setDragState({
        ...dragState, 
        isDragging: true, 
        initial: orientation === "x" ? x : y, 
        offset: orientation === "x" ? parseFloat(focusedOn.style.left)  
                                    : parseFloat(focusedOn.style.bottom) 
      })
    }
  }

  const handleMouseMove = (event) => {
    if (dragState.isDragging) {
      const diff = orientation === "x" 
                    ? event.clientX - dragState.initial + dragState.offset 
                    : dragState.initial - event.clientY + dragState.offset 
      
      let pos = clamp(diff, dragState.minmax.min, dragState.minmax.max)
      setValue(pos)    
    }    
  }
  
  useEffect(() => {
    
    if (orientation === "x") {
      sliderRef.current.style.left = `${value}%`
    } else {
      sliderRef.current.style.bottom = `${value}%`
    }
    getValue(value, header)

  }, [value])

  const handleMouseUp = () => {
    setDragState({...dragState, isDragging: false})
  }


  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    };
  }, [dragState.isDragging]);

  return (
    <div 
      className='slider-container'
      style={{
        height: orientation === "x" ? "36px" : "122px",
        left: `${position.left}px`,
        top: `${position.top}px`
      }}
      >
      <div className='slider-header'>
        {header ? header : orientation}
      </div>
      <div 
        className='slider-rail'
        style={{
          width: orientation === "y" ? "10px" : "100px",
          height: orientation === "x" ? "10px" : "100px"
        }}
      > 
        <div 
          className='slider-thumb'
          style={{
            left: orientation === "x" ? `${value}%` : "50%",
            top: orientation === "y" ? `${100-value}%` : `50%`

          }}
          onMouseDown={handleMouseDown}
          ref={sliderRef}
        >
        </div>
      </div>
    </div>
  )
}

export default Sliders