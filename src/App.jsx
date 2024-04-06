import { useEffect, useState } from 'react'
import * as THREE from "three"
import './App.scss'
import { Canvas } from '@react-three/fiber'

import Layout from './components/layout/layout'
import Circles from './components/circles/circles'
import Settings from './components/settings/settings'
import { OrbitControls } from '@react-three/drei'

import CircleMain from './components/circles/circle-main'
import CirclePacks from './components/circles/circle-packs'
import DearTester from './components/dear-tester/dear.tester'

const App = () => {

  const [outerCirclePosition, setOuterCirclePosition] = useState([Math.cos(0)*6, Math.sin(0)*6])
  const [partitionCenters, setPartitionCenters] = useState([])
  const [settings, setSettings] = useState({
    "on-page": {x: 0, y: 0}, 
    "on-circle": {angle: 0}, 
    "circle-radius": {inner: 12, outer: 12}, 
    "page-size": {x: 9, y: 11}, 
    "line-angle": {horizontal: 0, vertical: 0}
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

  useEffect(() => {
    const x = settings["on-page"].x + Math.cos(settings["on-circle"].angle) * settings["circle-radius"].inner / 2
    const y = settings["on-page"].y + Math.sin(settings["on-circle"].angle) * settings["circle-radius"].inner / 2
    setOuterCirclePosition([x, y])
  }, [settings["on-circle"], settings["circle-radius"].inner, settings["on-page"]])


  const handlePartitions = (positions) => {
    setPartitionCenters(positions)
  }
  //useEffect(() => {console.log(settings)}, [settings["on-circle"]])

  return (
    <div className='container'>
      <Settings 
        getValues={(values, from, which) => handleSettings(values, from, which)}
      />
      <DearTester />
      <Canvas 
        camera={{position: [0, 0, 12]}}
      >
        
        <Layout x={settings["page-size"].x} y={settings["page-size"].y} centers={partitionCenters}/>         
        <OrbitControls enableRotate={false}/>
        <Circles 
          width={settings["page-size"].x / 2}
          height={settings["page-size"].y / 2}
          centerX={
            outerCirclePosition[0] * 2
          }
          centerY={
            outerCirclePosition[1] * 2
          } 
          radius={settings["circle-radius"].outer}
          sendPos={(positions) => handlePartitions(positions)}
          angleH={settings["line-angle"].horizontal}
          angleV={settings["line-angle"].vertical}
        />
        <CircleMain 
          radius={settings["circle-radius"].inner}
          position={[ settings["on-page"].x, 
                      settings["on-page"].y, 0
                    ]}
          
          />
        <CircleMain 
          radius={settings["circle-radius"].outer}
          position={[ outerCirclePosition[0], 
                      outerCirclePosition[1], 
                      0
                    ]}  
          />
        <ambientLight intensity={Math.PI/2}/>
      </Canvas>
    </div>
  )
}

export default App
