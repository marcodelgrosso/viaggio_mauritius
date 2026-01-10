import './Hero.css'

function Hero() {
  const scrollToCta = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          <span>Discovery 18-40 · 7+ già interessati</span>
        </div>
        <h1>L'avventura ti aspetta alle <span className="highlight">Mauritius</span></h1>
        <p className="hero-subtitle">9 giorni di mare cristallino, delfini all'alba e trekking nella giungla. Con un gruppo di amici, non sconosciuti.</p>
        <div className="hero-cta-group">
          <button className="btn-primary" onClick={scrollToCta}>Ci sono, dimmi di più →</button>
          <button className="btn-secondary" onClick={() => window.open('https://www.viaggiavventurenelmondo.it/viaggi/9398', '_blank')}>Scheda ufficiale ↗</button>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  )
}

export default Hero
