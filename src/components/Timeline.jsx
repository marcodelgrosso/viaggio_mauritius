import { useEffect, useRef, useState } from 'react'
import './Timeline.css'

function Timeline() {
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

  const timelineItems = [
    {
      number: 1,
      days: 'Giorni 1-3',
      title: 'Barriere Coralline',
      description: 'Parco Marino Blue Bay, Île aux Aigrettes, snorkeling e pranzi in spiaggia con i piedi nella sabbia.'
    },
    {
      number: 2,
      days: 'Giorni 4-6',
      title: 'Cultura e Natura',
      description: 'Tempio Grand Bassin, Black River Gorges, Terra dei 7 Colori e mercato di Flacq.'
    },
    {
      number: 3,
      days: 'Giorni 7-9',
      title: 'Delfini e Trekking',
      description: 'Nuotata con i delfini all\'alba, Île aux Bénitiers, trekking alle 7 Cascate e cena finale.'
    }
  ]

  return (
    <section className="timeline" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">L'itinerario</span>
          <h2 className="section-title">9 giorni di pura avventura</h2>
          <p className="section-subtitle">Ogni fase è un'esperienza diversa</p>
        </div>

        <div className="timeline-grid">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`timeline-card ${visibleItems.has(String(index)) ? 'visible' : ''}`}
              data-animate
              data-index={index}
            >
              <div className="timeline-number">{item.number}</div>
              <div className="timeline-days">{item.days}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
