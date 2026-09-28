import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

// The middle of three identical sets allows seamless wrapping in both directions.
export function useCarousel(count: number) {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const position = useRef(0)
  const animation = useRef<Animation | null>(null)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(document.hidden)
  const [interaction, setInteraction] = useState(0)
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
    if (!el || animation.current) return
    const start = (count + position.current) * stepSize()
    const next = (position.current + direction + count) % count
    const style = getComputedStyle(el)
    const duration = reducedMotion ? 0 : parseFloat(style.getPropertyValue('--carousel-duration'))
    const motion = el.animate([
      { transform: `translateX(-${start}px)` },
      { transform: `translateX(-${start + direction * stepSize()}px)` },
    ], { duration, easing: style.getPropertyValue('--motion-ease').trim(), fill: 'forwards' })
    animation.current = motion
    motion.finished.then(() => {
      position.current = next
      place()
      motion.cancel()
      animation.current = null
    }).catch(() => { /* Resize or unmount cancels an in-flight transition. */ })
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
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .15), { threshold: .15 })
    observer.observe(el)
    const visibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', visibility)
    place()
    return () => {
      resize.disconnect()
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      animation.current?.cancel()
      animation.current = null
    }
  }, [place])
  const playing = !paused && !interacting && !focused && visible && !hidden && !reducedMotion
  useEffect(() => {
    if (!playing || !track.current) return
    const delay = parseFloat(getComputedStyle(track.current).getPropertyValue('--carousel-delay'))
    const timer = window.setInterval(() => move(1), delay)
    return () => window.clearInterval(timer)
  }, [playing, move, interaction])
  useEffect(() => {
    if (reducedMotion) {
      animation.current?.cancel()
      animation.current = null
      place()
    }
  }, [reducedMotion, place])
  const navigate = (direction: number) => {
    setInteraction(value => value + 1)
    move(direction)
  }
  return { viewport, track, paused, setPaused, setInteracting, setFocused, reducedMotion, navigate }
}
