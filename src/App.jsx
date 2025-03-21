import React, { useState } from 'react'
import './App.css'
import Router from './router/Router'
function App() {

  // eslint-disable-next-line no-unused-vars
  const [allRoutes, setAllRoutes] = useState([]);


  return (
  <>
  <Router allRoutes={allRoutes} />
  </>
  )
}

export default App
