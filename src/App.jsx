import { useState, useEffect } from 'react'
import Quiz from './components/Quiz'
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
  const [theme, setTheme] = useState('glass')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizChecked, setQuizChecked] = useState(false)
  
  // Check if we're in development mode
  const isDev = import.meta.env.DEV

  // Check if quiz needs to be shown
  useEffect(() => {
    const checkQuizStatus = () => {
      // In development, check dev preference first
      if (isDev) {
        const devQuizState = sessionStorage.getItem('quiz_show_dev')
        if (devQuizState === 'true') {
          setShowQuiz(true)
          setQuizChecked(true)
          return
        } else if (devQuizState === 'false') {
          setShowQuiz(false)
          setQuizChecked(true)
          return
        }
        // If no dev preference, default to showing quiz in dev
        setShowQuiz(true)
        setQuizChecked(true)
        return
      }

      // Production: check localStorage with 10 days expiration
      const quizCompleted = localStorage.getItem('quiz_completed')
      
      if (!quizCompleted) {
        // No record, show quiz
        setShowQuiz(true)
        setQuizChecked(true)
        return
      }

      // Check if expired (more than 10 days)
      const expirationTime = parseInt(quizCompleted, 10)
      const now = new Date().getTime()
      
      if (now > expirationTime) {
        // Expired, show quiz again
        localStorage.removeItem('quiz_completed')
        setShowQuiz(true)
      } else {
        // Still valid, skip quiz
        setShowQuiz(false)
      }
      
      setQuizChecked(true)
    }

    checkQuizStatus()
  }, [isDev])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'glass'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const themes = ['dark', 'light', 'glass']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    const newTheme = themes[nextIndex]
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleQuizComplete = () => {
    if (isDev) {
      // In dev, just hide quiz and save preference
      sessionStorage.setItem('quiz_show_dev', 'false')
    }
    setShowQuiz(false)
  }

  // In development, allow toggling quiz with keyboard (Q key)
  useEffect(() => {
    if (!isDev) return

    const handleKeyDown = (e) => {
      // Press Q to toggle quiz in dev mode
      if (e.key === 'q' || e.key === 'Q') {
        setShowQuiz(prev => {
          const newState = !prev
          sessionStorage.setItem('quiz_show_dev', newState.toString())
          return newState
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isDev])

  // Show loading or nothing while checking quiz status
  if (!quizChecked) {
    return null
  }

  // Show quiz if needed
  if (showQuiz) {
    return <Quiz onComplete={handleQuizComplete} />
  }

  // Show main landing page
  return (
    <>
      <CursorGlow />
      {isDev && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 212, 170, 0.1)',
          border: '1px solid rgba(0, 212, 170, 0.3)',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '0.85rem',
          color: 'var(--accent)',
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
          fontFamily: 'monospace'
        }}>
          DEV: Premi <kbd style={{
            background: 'rgba(0, 212, 170, 0.2)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.8em'
          }}>Q</kbd> per aprire/chiudere il quiz
        </div>
      )}
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
