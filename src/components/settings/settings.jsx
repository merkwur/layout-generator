import React, { useEffect, useRef, useState } from 'react'
import "./settings.scss"
import { clamp } from '../helpers'
import PointOnPage from './point-on-page/pointOnPage'
import CircleOnCircle from './circle-on-circle/circleOnCircle'
import PageSize from './page-size/pageSize'
import Grids from './grids/grids'


const Settings = () => {



  return (
    <div className='settings-wrapper'>
      <PointOnPage />
      <CircleOnCircle />
      <PageSize />
      <Grids />
    </div>
  )
}

export default Settings