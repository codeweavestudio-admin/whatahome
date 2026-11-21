import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

// The middle of three identical sets allows seamless wrapping in both directions.
export function useCarousel(count: number) {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const position = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const animation = useRef<Animation | null>(null)
  const reducedMotion = useReducedMotion()
  const stepSize = useCallback(() => {
    const el = track.current
    return el ? (el.firstElementChild as HTMLElement).getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap) : 0
  }, [])
  const place = useCallback(() => {
    if (track.current) track.current.style.transform = `translateX(-${(count + position.current) * stepSize()}px)`
  }, [count, stepSize])
  const move = useCallback((direction: number) => {
    const el = track.current
    if (!el || animation.current || direction === 0) return

    const step = stepSize()
    if (!step) return

    const currentX = (count + position.current) * step
    const targetX = currentX + (direction * step)

    const style = getComputedStyle(el)
    const duration = reducedMotion
      ? 0
      : parseFloat(style.getPropertyValue('--carousel-duration')) || 850

    const motion = el.animate(
      [
        { transform: `translateX(-${currentX}px)` },
        { transform: `translateX(-${targetX}px)` },
      ],
      {
        duration,
        easing: style.getPropertyValue('--carousel-ease').trim() || 'cubic-bezier(0.45, 0, 0.2, 1)',
        fill: 'forwards',
      }
    )

    animation.current = motion

    motion.finished.then(() => {
      position.current += direction

      if (position.current >= count) {
        position.current = 0
      } else if (position.current < 0) {
        position.current = count - 1
      }

      animation.current = null
      setActiveIndex(position.current)
      place()
      motion.cancel()
    }).catch(() => {
      animation.current = null
    })
  }, [count, place, reducedMotion, stepSize])
  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const resize = new ResizeObserver(() => {
      animation.current?.cancel()
      animation.current = null
      place()
    })
    resize.observe(el)
    place()
    return () => {
      resize.disconnect()
      animation.current?.cancel()
      animation.current = null
    }
  }, [place])
  useEffect(() => {
    if (reducedMotion) {
      animation.current?.cancel()
      animation.current = null
      place()
    }
  }, [reducedMotion, place])
  const navigate = (direction: number) => {
    move(direction)
  }
  const goTo = (index: number) => {
    if (index >= 0 && index < count) navigate(index - position.current)
  }
  return { viewport, track, navigate, activeIndex, goTo }
}


