import React, { useState } from 'react'
import './App.css'
import Router from './router/Router'
function App() {

  const allRoutes = [allRoutes, setAllRoutes] = useState([])

  return (
  <>
  <Router allRoutes={allRoutes} />
  </>
  )
}

export default App
