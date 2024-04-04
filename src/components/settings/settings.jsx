import React, { useEffect, useRef, useState } from 'react'
import "./settings.scss"
import { clamp } from '../helpers'
import PointOnPage from './point-on-page/pointOnPage'
import CircleOnCircle from './circle-on-circle/circleOnCircle'
import PageSize from './page-size/pageSize'
import Grids from './grids/grids'
import CircleRadius from './circle-radius/circle-radius'


const Settings = ({getValues,}) => {

  return (
    <div className='settings-wrapper'>
      <PointOnPage 
        getValues={getValues}
        
      />
      <CircleOnCircle
        getValues={getValues}
      />
      <CircleRadius 
        getValues={getValues}
      />
      <PageSize 
        getValues={getValues}
      />
      <Grids 
        getValues={getValues}
      />
    </div>
  )
}

export default Settings