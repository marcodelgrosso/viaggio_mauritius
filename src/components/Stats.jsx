import { useEffect, useRef, useState } from 'react'
import './Stats.css'

function Stats() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats-grid">
        <StatItem value="27°" label="Temperatura a marzo" visible={visible} />
        <StatItem value="9" label="Giorni di avventura" visible={visible} count={9} />
        <StatItem value="+4h" label="Fuso orario" visible={visible} />
        <StatItem value="€200" label="Caparra rimborsabile" visible={visible} />
      </div>
    </section>
  )
}

function StatItem({ value, label, visible, count }) {
  const [displayValue, setDisplayValue] = useState(count ? '0' : value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (visible && count && !hasAnimated.current) {
      hasAnimated.current = true
      let current = 0
      const increment = count / 30
      const timer = setInterval(() => {
        current += increment
        if (current >= count) {
          current = count
          clearInterval(timer)
        }
        setDisplayValue(Math.floor(current).toString())
      }, 50)
    }
  }, [visible, count])

  return (
    <div className={`stat-item ${visible ? 'visible' : ''}`}>
      <div className="stat-value">{displayValue}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default Stats
