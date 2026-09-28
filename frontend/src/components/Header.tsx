import { useEffect, useRef, useState } from 'react'

const navigation = [
  { label: 'Home', href: '/', active: true },
  { label: 'Consultation', href: '/#consultation' },
  { label: 'Our Work', href: '/#our-work' },
  { label: 'How We Solve', href: '/#how-we-solve' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
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
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__logo" aria-label="Whatahome — home" />
        <button ref={toggle} className="header__toggle" type="button" aria-expanded={isOpen}
          aria-controls="primary-navigation" aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Menu'}</button>
        <nav id="primary-navigation" aria-label="Main navigation" className={`header__nav${isOpen ? ' is-open' : ''}`}>
          {navigation.map(({ label, href, active }) => (
            <a key={label} href={href} aria-current={active ? 'page' : undefined}
              onClick={() => setIsOpen(false)}>{label}</a>
          ))}
        </nav>
        <a href="/consultation" className="action header__cta">Book a Consultation</a>
      </div>
    </header>
  )
}
