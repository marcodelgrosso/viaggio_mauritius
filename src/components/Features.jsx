import { useEffect, useRef, useState } from 'react'
import './Features.css'

function Features() {
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
    <section className="features" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Perché Mauritius</span>
          <h2 className="section-title">Non solo spiaggia</h2>
          <p className="section-subtitle">Un'esperienza completa tra mare, natura e cultura</p>
        </div>

        <div className="bento-grid">
          <BentoCard
            index="0"
            size="large"
            image
            imageUrl="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80"
            title="Mare da cartolina"
            description="Barriere coralline intatte, snorkeling con tartarughe e nuotate all'alba con i delfini"
            visible={visibleItems.has('0')}
          />
          <BentoCard
            index="1"
            size="small"
            featured
            icon="🌡️"
            title="27° a marzo"
            description="Mentre in Italia piove, noi saremo al sole. Fine estate australe, mare caldo e calmo."
            visible={visibleItems.has('1')}
          />
          <BentoCard
            index="2"
            size="small"
            icon="🌿"
            title="Natura selvaggia"
            description="Trekking alle 7 cascate, terre vulcaniche dai 7 colori, gole spettacolari."
            visible={visibleItems.has('2')}
          />
          <BentoCard
            index="3"
            size="medium"
            image
            imageUrl="https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&q=80"
            title="Cultura unica"
            description="Mix di influenze indiane, africane e francesi"
            visible={visibleItems.has('3')}
          />
        </div>
      </div>
    </section>
  )
}

function BentoCard({ index, size, image, imageUrl, icon, title, description, featured, visible }) {
  return (
    <div
      className={`bento-card ${size} ${image ? 'image-card' : ''} ${featured ? 'featured' : ''} ${visible ? 'visible' : ''}`}
      data-animate
      data-index={index}
    >
      {image ? (
        <>
          <img src={imageUrl} alt={title} />
          <div className="overlay">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </>
      ) : (
        <>
          {icon && <div className="bento-icon">{icon}</div>}
          <h3>{title}</h3>
          <p>{description}</p>
        </>
      )}
    </div>
  )
}

export default Features
