import { useEffect, useRef, useState } from 'react'
import './Reframe.css'

function Reframe() {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, entry.target.dataset.index]))
            }, index * 100)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    const items = sectionRef.current?.querySelectorAll('[data-animate]')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const benefits = [
    'Solo 6 giorni lavorativi di ferie',
    'Ti restano 14+ giorni per agosto',
    'Prezzi più bassi che in alta stagione',
    'Spezza l\'inverno con una botta di sole'
  ]

  return (
    <section className="reframe" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">L'obiezione più comune</span>
          <h2 className="section-title">Ma le ferie di agosto?</h2>
          <p className="section-subtitle">Affrontiamo l'elefante nella stanza</p>
        </div>

        <div className="reframe-grid">
          <div
            className={`reframe-card wrong ${visibleItems.has('0') ? 'visible' : ''}`}
            data-animate
            data-index="0"
          >
            <div className="reframe-icon">❌</div>
            <h3>Il punto di vista sbagliato</h3>
            <p className="reframe-quote">"Devo scegliere tra Mauritius e le vacanze estive"</p>
          </div>
          <div
            className={`reframe-card right ${visibleItems.has('1') ? 'visible' : ''}`}
            data-animate
            data-index="1"
          >
            <div className="reframe-icon">✨</div>
            <h3>Il punto di vista giusto</h3>
            <p className="reframe-quote">"Nel 2026 faccio DUE viaggi fighi"</p>
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <span className="benefit-check">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reframe
