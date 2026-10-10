import { useRef } from 'react'
import { useCarousel } from '../hooks/useCarousel'

const services = [
  {
    image: 'ev',
    title: ' Car & Bike EV Charging Planning',
    description:
      'Plan parking, power and cabling for convenient car and bike EV charging.',
  },
   {
    image: 'purifier',
    title: ' Under-Sink Water Purifier Planning',
    description:
      'Plan space, plumbing and power for a tidy under-sink purifier with easy maintenance access.',
  },
  {
    image: 'baby-swing',
    title: 'Baby Swing Planning',
    description:
      'Plan a safe swing location with strong ceiling support and enough clearance.',
  },
  {
    image: 'utility',
    title: 'Electrical & Plumbing Planning',
    description:
      'Plan power points, plumbing and utilities before walls and finishes are complete.',
  },
  {
    image: 'storage',
    title: 'Space & Storage Planning',
    description:
      'Turn unused corners into smart storage and practical spaces for everyday living.',
  },
]

export default function ConsultationServices() {
  const {
    viewport,
    track,
    paused,
    setPaused,
    setInteracting,
    setFocused,
    navigate,
    activeIndex,
    goTo,
    reducedMotion,
  } = useCarousel(services.length)

  const touch = useRef<{ x: number; y: number } | null>(null)

  return (
    <section
      className="consultation_services section"
      id="consultation"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="section-heading">

          <h2 id="services-title">
            One Home. More Possibilities.
          </h2>

          <p>
            Plan a home that fits your life today and adapts to tomorrow.
          </p>
        </div>

        <div
          className="consultation_services__carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Home consultation services"

          // Pause autoplay while mouse is over the carousel
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setInteracting(true)
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse') setInteracting(false)
          }}

          // Pause autoplay while keyboard focus is inside
          onFocusCapture={(event) =>
            setFocused(event.target.matches(':focus-visible'))
          }
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFocused(false)
            }
          }}
        >
          <div
            className="consultation_services__viewport"
            ref={viewport}
            tabIndex={0}
            aria-label="Service cards. Use arrow keys to browse, or Space to pause or resume automatic slides."
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault()
                setPaused(!paused)
              }

              if (
                event.key === 'ArrowRight' ||
                event.key === 'ArrowLeft'
              ) {
                event.preventDefault()

                navigate(
                  event.key === 'ArrowRight' ? 1 : -1
                )
              }
            }}
            onTouchStart={(event) => {
              touch.current = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              }

              setInteracting(true)
            }}
            onTouchCancel={() => {
              touch.current = null
              setInteracting(false)
            }}
            onTouchEnd={(event) => {
              const start = touch.current

              touch.current = null
              setInteracting(false)

              if (!start) return

              const dx =
                event.changedTouches[0].clientX - start.x

              const dy =
                event.changedTouches[0].clientY - start.y

              if (
                Math.abs(dx) > 40 &&
                Math.abs(dx) > Math.abs(dy)
              ) {
                navigate(dx < 0 ? 1 : -1)
              }
            }}
          >
            <div
              className="consultation_services__track"
              ref={track}
            >
              {[0, 1, 2].flatMap((set) =>
                services.map((service, index) => (
                  <article
                    key={`${set}-${service.image}`}
                    aria-hidden={set !== 1 ? true : undefined}
                    className={`consultation_services__card consultation_services__card--${service.image}`}
                  >
                    <div className="consultation_services__copy">
                      <span>
                        Consultation 0{index + 1}
                      </span>

                      <h3>{service.title}</h3>

                      <p>{service.description}</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
          <div className="consultation_services__controls">
            <div className="consultation_services__dots" role="group" aria-label="Choose a service slide">
              {services.map((service, index) => (
                <button
                  key={service.image}
                  type="button"
                  className="consultation_services__dot"
                  aria-label={`Show slide ${index + 1}: ${service.title}`}
                  aria-current={activeIndex === index ? 'true' : undefined}
                  onClick={() => goTo(index)}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
            {!reducedMotion && (
              <button
                type="button"
                className="consultation_services__playback"
                aria-label={paused ? 'Resume automatic slides' : 'Pause automatic slides'}
                onClick={() => setPaused(value => !value)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  {paused ? <path d="M7 4v16l13-8z" /> : <path d="M6 4h4v16H6zm8 0h4v16h-4z" />}
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
