// import React from 'react'
import { renderRoutes } from './utils/renderRoutes'
import { constantRoutes } from './router'
import './App.css'

export default function App() {
  return renderRoutes(constantRoutes)
}
