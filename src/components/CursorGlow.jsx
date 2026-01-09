import { useEffect, useRef } from 'react'
import './CursorGlow.css'

function CursorGlow() {
  const glowRef = useRef(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const glowX = useRef(0)
  const glowY = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      glowX.current += (mouseX.current - glowX.current) * 0.1
      glowY.current += (mouseY.current - glowY.current) * 0.1
      
      if (glowRef.current) {
        glowRef.current.style.left = glowX.current + 'px'
        glowRef.current.style.top = glowY.current + 'px'
      }
      
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <div className="cursor-glow" ref={glowRef} />
}

export default CursorGlow
