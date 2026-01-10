import { useState } from 'react'
import './DepositModal.css'

function DepositModal({ onClose }) {
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [coordinatorOnly, setCoordinatorOnly] = useState(false)

  const handleUnderstand = () => {
    if (dontShowAgain) {
      localStorage.setItem('deposit_modal_dismissed', 'true')
    }
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleUnderstand}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleUnderstand} aria-label="Chiudi">
          ×
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">
            Prenota il viaggio con soli <span className="highlight">200 Euro</span>
          </h2>
        </div>

        <div className="modal-body">
          <div className="refund-policy">
            <h3 className="policy-title">Politiche di rimborso:</h3>
            <ul className="policy-list">
              <li>Verrà rimborsato se non verrà formato il gruppo</li>
              <li>Verrà rimborsato se il gruppo verrà assegnato ad un altro coordinatore</li>
            </ul>
          </div>

          <div className="coordinator-info">
            <div className="coordinator-field">
              <label className="coordinator-label">Codice coordinatore:</label>
              <span className="coordinator-value">6761</span>
            </div>
            
            <div className="coordinator-field">
              <label className="coordinator-label">Coordinatore:</label>
              <span className="coordinator-value">Luana Pellizzaro</span>
            </div>

            <div className="coordinator-checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={coordinatorOnly}
                  onChange={(e) => setCoordinatorOnly(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">PARTO SOLO CON QUESTO COORDINATORE</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <label className="dont-show-label">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span>Non mostrarmelo più</span>
            </label>
            
            <button className="modal-btn" onClick={handleUnderstand}>
              Ho capito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositModal
