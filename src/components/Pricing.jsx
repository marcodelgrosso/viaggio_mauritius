import { useEffect, useRef, useState } from 'react'
import './Pricing.css'

function Pricing() {
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

  return (
    <section className="pricing" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Investimento</span>
          <h2 className="section-title">Quanto costa davvero</h2>
          <p className="section-subtitle">Trasparenza totale, niente sorprese</p>
        </div>

        <div className="pricing-grid">
          <div
            className={`price-breakdown ${visibleItems.has('0') ? 'visible' : ''}`}
            data-animate
            data-index="0"
          >
            <div className="price-row">
              <span className="price-label">Quota base (volo A/R + assicurazione)</span>
              <span className="price-value">€1.530</span>
            </div>
            <div className="price-row">
              <span className="price-label">Supplemento stagionale marzo</span>
              <span className="price-value">+€400</span>
            </div>
            <div className="price-row">
              <span className="price-label">Cassa comune</span>
              <span className="price-value">€640</span>
            </div>
            <div className="price-total">
              <div className="price-total-value">~€2.570</div>
              <div className="price-total-label">Tutto incluso per 9 giorni</div>
            </div>
          </div>

          <div
            className={`caparra-card ${visibleItems.has('1') ? 'visible' : ''}`}
            data-animate
            data-index="1"
          >
            <div className="caparra-value">€200</div>
            <div className="caparra-label">Caparra per bloccare</div>
            <p className="caparra-note">Rimborsabile al 100% se il viaggio non parte. Zero rischi.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
