import { useState, useEffect, useRef } from 'react'
import './Quiz.css'

function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState({})
  const [showPriceAnchor, setShowPriceAnchor] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const questionRef = useRef(null)

  const totalQuestions = 5

  const questions = [
    {
      id: 1,
      emoji: '✈️',
      text: 'Hai voglia di staccare tutto e fare un viaggio nel 2026?',
      options: [
        { text: 'Assolutamente sì!', value: 'yes', next: 2 },
        { text: 'Magari...', value: 'maybe', next: 2 }
      ],
      twoCol: true
    },
    {
      id: 2,
      emoji: '👥',
      text: 'Preferisci viaggiare con amici o in solitaria?',
      options: [
        { text: 'Con amici!', value: 'friends', next: 3 },
        { text: 'Da solo/a', value: 'solo', next: 3 }
      ],
      twoCol: true
    },
    {
      id: 3,
      emoji: '🏝️',
      text: 'Cosa ti attira di più?',
      options: [
        { text: '🤿 Avventura attiva: snorkeling, trekking, esplorazione', value: 'adventure', next: 4 },
        { text: '🍹 Resort & relax: sdraio, cocktail, zero pensieri', value: 'relax', next: 4 }
      ],
      twoCol: false
    },
    {
      id: 4,
      emoji: '💰',
      text: 'Sai quanto costa un viaggio a Mauritius?',
      options: [
        { text: 'Più o meno', value: 'yes', next: 5, showInfo: true },
        { text: 'Non ne ho idea', value: 'no', next: 5, showInfo: true }
      ],
      twoCol: true
    },
    {
      id: 5,
      emoji: '😔',
      text: 'Ti è mai capitato di rimpiangere un viaggio che non hai fatto?',
      options: [
        { text: 'Sì, purtroppo', value: 'yes', next: 'result' },
        { text: 'No mai', value: 'no', next: 'result' }
      ],
      twoCol: true
    }
  ]

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.classList.add('visible')
    }
    // Reset transition state when question changes
    setIsTransitioning(false)
  }, [currentQuestion])

  // Calculate derived values
  const currentQ = questions.find(q => q.id === currentQuestion)
  const isLoadingState = currentQuestion === 4.5

  const updateProgress = (question) => {
    const progress = ((question - 1) / totalQuestions) * 100
    return progress
  }

  const handleAnswer = (option) => {
    // Prevent multiple clicks
    if (isTransitioning) return
    
    setSelectedAnswer(option.value)
    setIsTransitioning(true)
    
    // Store answer
    const newAnswers = { ...answers, [currentQuestion]: option.value }
    setAnswers(newAnswers)

    // Show price anchor info if needed
    if (option.showInfo) {
      setShowPriceAnchor(true)
      // After showing info, go to loading state, then to question 5
      setTimeout(() => {
        setShowPriceAnchor(false)
        setCurrentQuestion(4.5) // Loading state
        setTimeout(() => {
          setCurrentQuestion(5)
          setSelectedAnswer(null)
          setIsTransitioning(false)
        }, 1500)
      }, 3000)
      return
    }

    // Navigate to next question or result
    setTimeout(() => {
      if (option.next === 'result') {
        setShowResult(true)
        // Mark quiz as completed when reaching result (only in production mode)
        const isDev = import.meta.env.DEV
        if (!isDev) {
          const expirationDate = new Date()
          expirationDate.setDate(expirationDate.getDate() + 10)
          localStorage.setItem('quiz_completed', expirationDate.getTime().toString())
        }
      } else {
        if (questionRef.current) {
          questionRef.current.classList.remove('visible')
          questionRef.current.classList.add('exit')
        }
        setTimeout(() => {
          setCurrentQuestion(option.next)
          setSelectedAnswer(null)
          setIsTransitioning(false)
          if (questionRef.current) {
            questionRef.current.classList.remove('exit')
          }
        }, 600)
      }
    }, 800)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't allow keyboard navigation during transition
      if (isTransitioning) return
      
      if (e.key === '1' || e.key === '2') {
        const currentQ = questions.find(q => q.id === currentQuestion)
        if (currentQ && !showResult && !isLoadingState) {
          const index = e.key === '1' ? 0 : 1
          if (currentQ.options[index]) {
            handleAnswer(currentQ.options[index])
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentQuestion, showResult, isTransitioning, isLoadingState])

  if (showResult) {
    return (
      <div className="quiz-container">
        <div className="bg-gradient"></div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: '100%' }}></div>
        </div>
        <div className="quiz-card">
          <div className="result-slide active">
            <div className="result-emoji">🎯</div>
            <div className="result-badge">
              <span className="dot"></span>
              <span>Match perfetto trovato!</span>
            </div>
            <h2 className="result-title">Ho qualcosa che fa per te.</h2>
            <p className="result-text">
              <strong>Mauritius, 20-28 Marzo 2026.</strong><br />
              9 giorni di avventura con un gruppo di amici. Mare cristallino, delfini, trekking — a molto meno di quanto pensi.
            </p>
            <button className="cta-btn" onClick={() => {
              // User must explicitly click the button to continue
              onComplete()
            }}>
              Scopri il viaggio
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <div className="bg-gradient"></div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${updateProgress(currentQuestion)}%` }}></div>
      </div>
      <div className="question-counter">
        Domanda <span>{currentQuestion}</span> di {totalQuestions}
      </div>
      <div className="quiz-card">
        {isLoadingState ? (
          <div className="loading-dots active">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div 
            ref={questionRef}
            className="question-slide active"
          >
            <div className="question-emoji">{currentQ?.emoji}</div>
            <h2 className="question-text">
              {currentQ?.text.includes('staccare tutto') && (
                <>Hai voglia di <span className="highlight">staccare tutto</span> e fare un viaggio nel 2026?</>
              )}
              {currentQ?.text.includes('con amici') && (
                <>Preferisci viaggiare <span className="highlight">con amici</span> o in solitaria?</>
              )}
              {currentQ?.text.includes('Cosa ti attira') && (
                <>Cosa ti attira di più?</>
              )}
              {currentQ?.text.includes('Mauritius') && (
                <>Sai quanto costa un viaggio a <span className="highlight">Mauritius</span>?</>
              )}
              {currentQ?.text.includes('rimpiangere') && (
                <>Ti è mai capitato di <span className="highlight">rimpiangere</span> un viaggio che non hai fatto?</>
              )}
            </h2>
            <div className={`answers ${currentQ?.twoCol ? 'two-col' : ''}`}>
              {currentQ?.options.map((option, index) => (
                <button
                  key={index}
                  className={`answer-btn ${selectedAnswer === option.value ? 'selected' : ''} ${isTransitioning ? 'disabled' : ''}`}
                  onClick={() => handleAnswer(option)}
                  disabled={isTransitioning}
                >
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
            {isTransitioning && (
              <div className="transition-indicator">
                <div className="transition-loader">
                  <svg className="transition-spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="3" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="transition-text">Ottima scelta! Procediamo...</p>
              </div>
            )}
            {currentQuestion === 4 && showPriceAnchor && (
              <div className="info-reveal visible">
                <p>
                  <span className="big-number">€3.500 - €4.000</span>
                  Questo è il costo medio di un viaggio a Mauritius in resort per 9 giorni.<br />
                  <em>Ma c'è un modo per spendere molto meno...</em>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Quiz
