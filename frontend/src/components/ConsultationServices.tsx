import { useRef } from 'react'
import { useCarousel } from '../hooks/useCarousel'

const services = [
  { image: 'ev', title: 'EV Charging Planning', description: 'EV charger readiness planned with the right parking space, electrical capacity, cabling route and future power requirements — so your home is ready when your EV arrives.' },
  { image: 'utility', title: 'Electrical & Plumbing Planning', description: 'Additional electrical points, plumbing connections and utility provisions—decided before walls and finishes are completed.' },
  { image: 'storage', title: 'Space & Storage Planning', description: 'Unused corners become smarter storage, practical utility areas and functional zones that make daily life feel effortless.' },
]
export default function ConsultationServices() {
  const { viewport, track, paused, setPaused, setInteracting, setFocused, navigate } = useCarousel(services.length)
  const touch = useRef<{ x: number; y: number } | null>(null)
  return <section className="consultation_services section" id="consultation" aria-labelledby="services-title">
    <div className="container">
      <div className="section-heading">
        <span className="eyebrow">01 / Consultation</span>
        <h2 id="services-title">One Home. More Possibilities.</h2>
        <p>A home is not finished when the interiors are installed. It evolves with your lifestyle. Our consultation helps you prepare for what comes next.</p>
      </div>
      <div className="consultation_services__carousel" role="region" aria-roledescription="carousel" aria-label="Home consultation services"
        onFocusCapture={event => setFocused(event.target.matches(':focus-visible'))} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
        <div className="consultation_services__viewport" ref={viewport} tabIndex={0} aria-label="Service cards. Use arrow keys to browse, or Space to pause or resume automatic slides."
          onKeyDown={event => { if (event.key === ' ') { event.preventDefault(); setPaused(!paused) } if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); navigate(event.key === 'ArrowRight' ? 1 : -1) } }}
          onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; setInteracting(true) }}
          onTouchCancel={() => { touch.current = null; setInteracting(false) }}
          onTouchEnd={event => { const start = touch.current; touch.current = null; setInteracting(false); if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) navigate(dx < 0 ? 1 : -1) }}>
          <div className="consultation_services__track" ref={track}>
            {[0, 1, 2].flatMap(set => services.map((service, index) => <article key={`${set}-${service.image}`} aria-hidden={set !== 1 ? true : undefined} className={`consultation_services__card consultation_services__card--${service.image}`}>
              <div className="consultation_services__copy"><span>Consultation 0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p></div>
            </article>))}
          </div>
        </div>
      </div>
    </div>
  </section>
}
