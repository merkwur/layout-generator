import { useState } from 'react'

import './App.scss'
import { Canvas } from '@react-three/fiber'

import Layout from './components/layout/layout'
import Circles from './components/circles/circles'
import Settings from './components/settings/settings'
import { OrbitControls } from '@react-three/drei'

const App = () => {
  const [settings, setSettings] = useState({})

  const handleSettings = (value, from, which) => {
    //console.log("from the app component; ", value, from, which)
  }

  return (
    <div className='container'>
      <Settings 
        getValues={(values, from, which) => handleSettings(values, from, which)}
      />
      <Canvas >
        <Layout x={4.5} y={5.5}/>         
        <Circles />
        <OrbitControls enableRotate={false}/>
      </Canvas>
    </div>
  )
}

export default App
