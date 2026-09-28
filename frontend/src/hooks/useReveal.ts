import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

const selectors = '.hero_section__scene, .hero_section__benefits, .section-heading > *, .consultation_services__carousel, .planning_banner h2, .our_work__project, .our_work__partners, .how_we_solve__plan, .how_we_solve__case, .testimonials figure, .testimonials__steps, .contact_cta, .footer__grid > *'
export function useReveal() {
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    if (reducedMotion) return
    const elements = new Set<Element>()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: .08 })
    function register() {
      elements.forEach(el => { if (!el.isConnected) { observer.unobserve(el); elements.delete(el) } })
      document.querySelectorAll(selectors).forEach(el => {
        if (elements.has(el)) return
        elements.add(el)
        el.classList.add('reveal')
        observer.observe(el)
      })
    }
    register()
    const mutations = new MutationObserver(register)
    mutations.observe(document.querySelector('main')!, { childList: true, subtree: true })
    const revealFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) event.target.closest('.reveal')?.classList.add('is-visible')
    }
    document.addEventListener('focusin', revealFocus)
    return () => {
      observer.disconnect()
      mutations.disconnect()
      document.removeEventListener('focusin', revealFocus)
      elements.forEach(el => el.classList.remove('reveal', 'is-visible'))
    }
  }, [reducedMotion])
}
