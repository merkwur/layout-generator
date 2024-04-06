import React, { useEffect, useState } from 'react'
import "./dear.tester.scss"
import { theText } from '../dtester'


const DearTester = () => {
  const [isShow, setIsShow] = useState(true)
  const [copySuccess, setCopySuccess] = useState('');
  const [sayCopy, setSayCopy] = useState(false)

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  }

  useEffect(() => {console.log(copySuccess)} ,[copySuccess])
  const handleInfo = () => {
    if (isShow) {
      setIsShow(false)
    } else {
      setIsShow(true)
    }
  }



  return (
    <>
      <div 
        className='info-container'
        style={{
          left: isShow ? "240px" : "-300px",
          top: isShow ? "0" : "-500px"
        }}
        >
        <div className='info-text'>
          {theText}
          <div 
            className='email'
            onClick={() => copyToClipboard("semihiyikalender@gmail.com")}
            onMouseEnter={() => setSayCopy(true)}
            onMouseLeave={() => setSayCopy(false)}
          >
            semihiyikalender@gmail.com
            { sayCopy ? (
                <div className='say-copy'>
                  {copySuccess ? "copied!" : "copy" }
                </div>
              ) : null
            }

          </div>
        </div>
        <div
          className='open-close'
          onClick={handleInfo}
        >
          {isShow ? "close" : "open"}
        </div>
      </div>
    </>
  )
}

export default DearTester