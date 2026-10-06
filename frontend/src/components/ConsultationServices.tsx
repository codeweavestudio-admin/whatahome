import { useRef } from 'react'
import { useCarousel } from '../hooks/useCarousel'

const services = [
  {
    image: 'ev',
    title: ' Car & Bike EV Charging Planning',
    description:
      'Plan dedicated charging spaces for electric cars and bikes with the right parking layout, electrical capacity, cabling routes and future power requirements — ensuring your home is ready for convenient and efficient EV charging.',
  },
   {
    image: 'purifier',
    title: ' Under-Sink Water Purifier Planning',
    description:
      'Under-Sink Water Purifier Plan the right space, plumbing connections, electrical access and drainage requirements for an under-sink water purifier — ensuring a clean, convenient and clutter-free kitchen with easy access for future maintenance.',
  },
  {
    image: 'baby-swing',
    title: 'Baby Swing Planning',
    description:
      "Baby Swing Readiness Plan the ideal location, ceiling support, structural strength and safe clearance for a baby swing — creating a secure, comfortable space that integrates seamlessly into your home while accommodating your growing family's needs.",
  },
  {
    image: 'utility',
    title: 'Electrical & Plumbing Planning',
    description:
      'Additional electrical points, plumbing connections and utility provisions—decided before walls and finishes are completed.',
  },
  {
    image: 'storage',
    title: 'Space & Storage Planning',
    description:
      'Unused corners become smarter storage, practical utility areas and functional zones that make daily life feel effortless.',
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
            A home is not finished when the interiors are installed.
            It evolves with your lifestyle. Our consultation helps you
            prepare for what comes next.
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
