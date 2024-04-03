import { useEffect, useState } from 'react'
import * as THREE from "three"
import './App.scss'
import { Canvas } from '@react-three/fiber'

import Layout from './components/layout/layout'
import Circles from './components/circles/circles'
import Settings from './components/settings/settings'
import { OrbitControls } from '@react-three/drei'
import PBox from './components/pseudo-box/pBox'
import CircleMain from './components/line/circle'

const App = () => {
  const [settings, setSettings] = useState({
    "on-page": {x: 0, y: 0}, 
    "on-circle": {angle: 0}, 
    "circle-radius": {inner: 12, outer: 12}, 
    "page-size": {x: 9, y: 11}, 
    "line-angle": {horizontal: 90, vertical: 0}
  })

  const handleSettings = (value, from, which) => {
    if (which) {
      setSettings({
        ...settings, 
        [from]: {
          ...settings[from],
          [which]: value
        }
      })
    } else {
      setSettings({
        ...settings, 
        [from]: value
      })
    }
  }

  //useEffect(() => {console.log(settings)}, [settings])

  return (
    <div className='container'>
      <Settings 
        getValues={(values, from, which) => handleSettings(values, from, which)}
      />
      <Canvas >
        <Layout x={settings["page-size"].x/2} y={settings["page-size"].y/2}/>         
        <Circles />
        <OrbitControls enableRotate={false}/>
        <CircleMain 
          radius={settings["circle-radius"].inner}
          position={[ settings["on-page"].x, 
                      settings["on-page"].y, 0
                    ]}  
          />
        <CircleMain 
          radius={settings["circle-radius"].outer}
          position={[ settings["on-page"].x + Math.cos(settings["on-circle"].angle) * settings["circle-radius"].inner/2 , 
                      settings["on-page"].y + Math.sin(settings["on-circle"].angle) * settings["circle-radius"].inner/2 , 
                      0
                    ]}  
          />
        <ambientLight intensity={Math.PI/2}/>
      </Canvas>
    </div>
  )
}

export default App
