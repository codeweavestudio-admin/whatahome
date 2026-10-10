import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { consultationWhatsAppUrl } from '../config/contact'


const navigation = [
  { label: 'Home', href: '/', active: true },
  { label: 'Consultation', href: '/#consultation' },
  { label: 'Our Work', href: '/#our-work' },
  { label: 'How We Solve', href: '/#how-we-solve' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => {
    const element = header.current
    if (!element) return

    const updateHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${element.getBoundingClientRect().height}px`)
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--header-height')
    }
  }, [])
  useEffect(() => {
    if (!isOpen) return
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <header ref={header} className="header">
      <div className="container header__inner">
        <a href="/" className="header__logo" aria-label="Whatahome — home" />
        <button
          ref={toggle}
          className="header__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsOpen(!isOpen)}
        />
        <nav id="primary-navigation" aria-label="Main navigation" className={`header__nav${isOpen ? ' is-open' : ''}`}>
          {navigation.map(({ label, href, active }) => (
            <a key={label} href={href} aria-current={active ? 'page' : undefined}
              onClick={() => setIsOpen(false)}>{label}</a>
          ))}
          <a href={consultationWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="action header__cta header__cta--mobile"
            onClick={() => setIsOpen(false)}>Book a Consultation</a>
        </nav>
        <a href={consultationWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="action header__cta header__cta--desktop">Book a Consultation</a>
      </div>
    </header>
  )
}
