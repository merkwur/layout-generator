import React, { useEffect, useRef, useState } from 'react'
import "./grid-helpers.scss"

const GridHelpers = ({which, getDegree}) => {
  const divRefs = useRef([])
  const [selected, setSelected] = useState(7)
  const angles = [90, 70, 60, 50, 45, 30, 20, 0]


  const toggleSelection = (index) => {
    console.log(index)
    setSelected((prevSelectedIndex) => (
      prevSelectedIndex === index ? null : index 
    ));
  };


  useEffect(() => {
    divRefs.current = angles.map((_, i) => divRefs.current[i] || React.createRef());
  }, [angles.length]);

  useEffect(() => {
    if (selected !== null) {
      getDegree(angles[selected], which)
    }
  }, [selected])

  return (
    <div className='angle-container'>
      {angles.map((degrees, index) => (
        <div className='inner-wrapper' 
          key={degrees+index}>
          <div 
            className='degree-box selected'
            onClick={() => toggleSelection(index)}
            ref={el => divRefs.current[index] = el}
            style={{
              boxShadow: selected === index ? "0 0 2px 2px #ccc" : ""
            }}
            >
            {degrees}
          </div>
          
          <div 
            className='indicators'
            style={{
              visibility: selected === index ? "visible" : "hidden"
            }}
            >
            degree
          </div>
          
        </div>
      ))}


    </div>
  )
}

export default GridHelpers