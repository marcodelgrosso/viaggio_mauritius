import { useEffect, useRef, useState } from 'react'
import './FeaturesScrollBg.css'

function FeaturesScrollBg() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(new Set())
  const bgRef = useRef(null)
  const prevImageRef = useRef(0)

  const sections = [
    {
      title: "Mare da cartolina",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
      description: "Barriere coralline intatte, snorkeling con tartarughe e nuotate all'alba con i delfini. Acque cristalline che cambiano dal turchese al blu profondo, perfette per ogni tipo di attività acquatica."
    },
    {
      title: "27° a marzo",
      image: null,
      description: "Mentre in Italia piove, noi saremo al sole. Fine estate australe, mare caldo e calmo. Il periodo perfetto per scoprire l'isola senza la folla dei mesi di punta."
    },
    {
      title: "Natura selvaggia",
      image: null,
      description: "Trekking alle 7 cascate, terre vulcaniche dai 7 colori, gole spettacolari. Un paradiso naturale dove giungla tropicale e formazioni rocciose creano paesaggi mozzafiato."
    },
    {
      title: "Avventure acquatiche",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      description: "Kitesurf, kayak, paddleboard e immersioni in acque cristalline. L'oceano Indiano offre condizioni perfette per sport acquatici di ogni livello."
    },
    {
      title: "Gastronomia creola",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
      description: "Sapori unici del curry mauriziano, roti, mine frit e street food locale. Una fusione culinaria tra India, Africa e Francia che conquista ogni palato."
    },
    {
      title: "Cultura unica",
      image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&q=80",
      description: "Mix di influenze indiane, africane e francesi in un'isola dal fascino coloniale. Templi colorati, moschee e chiese convivono in perfetta armonia."
    },
    {
      title: "Esperienze locali",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
      description: "Mercati di Port Louis, templi hindu, villaggi di pescatori e piantagioni di tè. Immergiti nella vita autentica mauriziana, lontano dai resort turistici."
    }
  ]

  // Dual-layer image transition per fade graduale
  useEffect(() => {
    if (!bgRef.current) return

    const currentSection = sections[currentImageIndex]
    if (!currentSection?.image) return

    // Skip se è la stessa immagine
    if (currentImageIndex === prevImageRef.current) return

    const bgElement = bgRef.current

    // Set della nuova immagine nel layer after
    bgElement.style.setProperty('--bg-after', `url('${currentSection.image}')`)

    // Trigger transition
    requestAnimationFrame(() => {
      bgElement.classList.add('transitioning')
    })

    // Dopo la transizione, swap delle immagini
    const timer = setTimeout(() => {
      bgElement.style.setProperty('--bg-before', `url('${currentSection.image}')`)
      bgElement.classList.remove('transitioning')
      prevImageRef.current = currentImageIndex
    }, 800) // Sync con transition CSS

    return () => clearTimeout(timer)
  }, [currentImageIndex])

  // IntersectionObserver per detectare sezione visibile
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sectionIndex = parseInt(entry.target.dataset.section, 10)

          if (entry.isIntersecting) {
            // Animazione card
            setVisibleCards(prev => new Set([...prev, sectionIndex]))

            // Cambio immagine solo se la sezione ha un'immagine
            const section = sections[sectionIndex]
            if (section.image) {
              setCurrentImageIndex(sectionIndex)
            }
          }
        })
      },
      { threshold: 0.4, rootMargin: '-15% 0px -15% 0px' }
    )

    const cards = document.querySelectorAll('[data-section]')
    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="features-scroll-bg">
      <div className="scroll-bg-container">
        <div
          ref={bgRef}
          className="fixed-background"
          style={{
            '--bg-before': `url('${sections[0].image}')`,
            '--bg-after': `url('${sections[0].image}')`
          }}
        >
          <div className="background-overlay"></div>
        </div>

        <div className="scroll-content">
          <div className="section-header">
            <span className="section-tag">Perché Mauritius</span>
            <h2 className="section-title">Non solo spiaggia</h2>
            <p className="section-subtitle">Un'esperienza completa tra mare, natura e cultura</p>
          </div>

          {sections.map((section, index) => (
            <div
              key={index}
              className={`scroll-section-card ${visibleCards.has(index) ? 'visible' : ''}`}
              data-section={index}
            >
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesScrollBg
