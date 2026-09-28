import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useAnimatedDetails() {
  const reducedMotion = useReducedMotion()
  const animations = useRef(new Map<HTMLDetailsElement, { motion: Animation; target: boolean }>())
  useEffect(() => {
    if (!reducedMotion) return
    animations.current.forEach(({ motion, target }, details) => {
      motion.cancel()
      details.open = target
      details.style.overflow = ''
    })
    animations.current.clear()
  }, [reducedMotion])
  useEffect(() => {
    const active = animations.current
    return () => { active.forEach(({ motion }) => motion.cancel()); active.clear() }
  }, [])
  return (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const details = event.currentTarget.parentElement as HTMLDetailsElement
    const previous = animations.current.get(details)
    const open = !(previous?.target ?? details.open)
    const start = details.getBoundingClientRect().height
    previous?.motion.cancel()
    animations.current.delete(details)
    details.open = open
    const end = details.getBoundingClientRect().height
    if (reducedMotion) { details.style.overflow = ''; return }
    details.open = true
    details.style.overflow = 'hidden'
    const style = getComputedStyle(details)
    const motion = details.animate([{ height: `${start}px` }, { height: `${end}px` }], {
      duration: parseFloat(style.getPropertyValue('--motion-duration')),
      easing: style.getPropertyValue('--motion-ease').trim(),
    })
    animations.current.set(details, { motion, target: open })
    motion.finished.then(() => {
      details.open = open
      details.style.overflow = ''
      animations.current.delete(details)
    }).catch(() => { /* A second click reverses the transition. */ })
  }
}
