import { useEffect, useRef, useState } from 'react'
import './CTA.css'

function CTA() {
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

  const openWhatsapp = () => {
    const phone = "39XXXXXXXXXX" // Sostituisci col tuo numero
    const msg = "Ciao! Ho visto la landing di Mauritius (20–28 marzo) e mi interessa. Raccontami di più 🙂"
    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(msg), "_blank")
  }

  const steps = [
    { num: 1, text: 'Dimmi "ci sono"' },
    { num: 2, text: 'Prenota online' },
    { num: 3, text: 'Prepara il costume' }
  ]

  return (
    <section className="cta-section" id="cta" ref={sectionRef}>
      <div className="cta-content">
        <h2>Allora, <span className="highlight">ci sei?</span></h2>
        <p>Non ti chiedo un "sì per sempre", ma un "ok, ci sto" per chiudere il gruppo.</p>

        <div className="cta-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`cta-step ${visibleItems.has(String(index)) ? 'visible' : ''}`}
              data-animate
              data-index={index}
            >
              <div className="cta-step-num">{step.num}</div>
              <div className="cta-step-text">{step.text}</div>
            </div>
          ))}
        </div>

        <div className="cta-buttons">
          <button className="btn-glow" onClick={openWhatsapp}>✓ Scrivimi su WhatsApp</button>
          <button className="btn-secondary" onClick={() => window.open('https://www.viaggiavventurenelmondo.it/viaggi/9398', '_blank')}>Scheda ufficiale ↗</button>
        </div>

        <div className="deadline-box">
          <div className="deadline-label">Deadline</div>
          <div className="deadline-value">Fine Gennaio 2026</div>
        </div>
      </div>
    </section>
  )
}

export default CTA
