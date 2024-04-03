import React, { useEffect, useRef, useState } from 'react'
import { clamp } from '../../helpers'

const PointOnPage = ({getValues}) => {

  const [circleState, setCircleState] = useState("hide")
  const stickRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const [dragState, setDragState] = useState({
    initialPosition: {x:0, y:0},
    c: {xmin: 0, xmax: 0, ymin: 0, ymax:0},
    minmax: {xmin: 0, xmax: 90, ymin: 0, ymax:110},
    pointPos: {x: 50, y:50}
  })

  const handleCircleShow = (event) => {
    event.preventDefault()
    if (circleState === "show") {
      setCircleState("hide")
    } else {
      setCircleState("show")
    }
  }

  useEffect(() => {
    const container = document.getElementsByClassName("center-circle-container")[0]
    const {left, top, right, bottom} = container.getBoundingClientRect()
    setDragState({
      ...dragState,
      c: {xmin: left, xmax: right, ymin: top, ymax:bottom}
    })
    console.log(left, top, right, bottom)
    
  }, [])

  const handleMouseDown = (event) => {
    
    let mx = event.clientX
    let my = event.clientY
    const focusedElement = document.elementFromPoint(mx, my)
    
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
        const rmxp = event.clientX
        const rmyp = event.clientY
        if (current
            && rmxp < dragState.c.xmax 
            && rmxp > dragState.c.xmin
            && rmyp < dragState.c.ymax
            && rmyp > dragState.c.ymin) {
              
          const diffX = event.clientX - dragState.initialPosition.x
          const diffY = event.clientY - dragState.initialPosition.y
          const xPos = clamp(dragState.pointPos.x + diffX, 0, 90)
          const yPos = clamp(dragState.pointPos.y + diffY, 0, 110)
          current.style.left = `${xPos}px`
          current.style.top = `${yPos}px`
          setDragState({
            ...dragState, 
            pointPos: {x: dragState.pointPos.x + diffX, y: dragState.pointPos.y + diffY}
          })
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