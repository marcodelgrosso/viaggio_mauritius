import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import Timeline from './components/Timeline'
import Reframe from './components/Reframe'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import CursorGlow from './components/CursorGlow'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <CursorGlow />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Stats />
      <Features />
      <Timeline />
      <Reframe />
      <Pricing />
      <CTA />
    </>
  )
}

export default App
