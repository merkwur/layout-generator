import { useState } from 'react'

import './App.scss'
import { Canvas } from '@react-three/fiber'

import Layout from './components/layout/layout'
import Circles from './components/circles/circles'
import Settings from './components/settings/settings'
import { OrbitControls } from '@react-three/drei'

function App() {


  return (
    <div className='container'>
      <Settings />
      <Canvas >
        <Layout x={4.5} y={5.5}/>         
        <Circles />
        <OrbitControls enableRotate={false}/>
      </Canvas>
    </div>
  )
}

export default App
