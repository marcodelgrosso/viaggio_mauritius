import './Navbar.css'

function Navbar({ theme, toggleTheme }) {
  const scrollToCta = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">Mauritius 2026</div>
        <div className="theme-toggle">
          <div className="toggle-switch" onClick={toggleTheme}>
            <div className="toggle-slider">
              <span className="toggle-icon">
                {theme === 'light' ? '☀️' : theme === 'glass' ? '💎' : '🌙'}
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
