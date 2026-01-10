import './Navbar.css'

function Navbar({ theme, toggleTheme, featuresLayout, toggleFeaturesLayout }) {
  const scrollToCta = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">Mauritius 2026</div>
        <div className="nav-actions">
          <div className="toggle-switch" onClick={toggleTheme}>
            <div className="toggle-slider">
              <span className="toggle-icon">
                {theme === 'light' ? '☀️' : theme === 'glass' ? '💎' : '🌙'}
              </span>
            </div>
          </div>
          <div className="toggle-switch layout-toggle" onClick={toggleFeaturesLayout}>
            <div className="toggle-slider">
              <span className="toggle-icon">
                {featuresLayout === 'bento' ? '⊞' : '≡'}
              </span>
            </div>
          </div>
          <button className="nav-cta" onClick={scrollToCta}>Ci sono →</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
