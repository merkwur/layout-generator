import React, { useEffect, useRef, useState } from 'react'
import { clamp } from '../../helpers'

const PointOnPage = () => {

  const [circleState, setCircleState] = useState("hide")
  const stickRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const [dragState, setDragState] = useState({
    initialPosition: {x:0, y:0},
    minmax: {xmin: 0, xmax: 90, ymin: 0, ymax:110}
  })

  const handleCircleShow = (event) => {
    event.preventDefault()
    if (circleState === "show") {
      setCircleState("hide")
    } else {
      setCircleState("show")
    }
  }

  const handleMouseDown = (event) => {
    
    let x = event.clientX
    let y = event.clientY
    const focusedElement = document.elementFromPoint(x, y)
    
    if (focusedElement.className.includes("controller")) {
      const {left, top} = focusedElement.getBoundingClientRect()
      setIsDragging(true)
      setDragState({
        ...dragState,
        initialPosition: {x: left+focusedElement.clientWidth /2, 
                          y: top+focusedElement.clientHeight /2} 
      })
    } 
  }
    const handleMouseMove = (event) => {
      event.preventDefault()
      if (isDragging) {
        let current = stickRef.current
        if (current) {
          const diffX = 45 + event.clientX - dragState.initialPosition.x
          const diffY = 55 + event.clientY - dragState.initialPosition.y
  
          const xPos = clamp(diffX, 0, 90)
          const yPos = clamp(diffY, 0, 110)
  
          current.style.left = `${xPos}px`
          current.style.top = `${yPos}px`
        }

      }
    }
  
    const handleMouseUp = (event) => {
      setIsDragging(false)
    }
  
    useEffect(() => {
      if (isDragging) {
        
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
    }, [isDragging]);
  
  return (
    <>
      <div className='header'>
        <div className='header-text'>
          {`center circle 
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
        <div className='center-circle-container'>
          <div 
            className='center-circle-controller'
            ref={stickRef}
            style={{left: "50%", top: "50%"}}
            onMouseDown={handleMouseDown}
          >

          </div>
        </div>
      </div>
  </> 
  )
}

export default PointOnPage