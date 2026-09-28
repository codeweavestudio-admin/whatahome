const markers = [
  ['electrical', 'Additional Electrical Point'],
  ['smart', 'Smart Home Ready'],
  ['dishwasher', 'Dishwasher Provision'],
  ['appliance', 'Future Appliance Point'],
  ['utility', 'Utility Planning'],
]

export default function HeroSection() {
  return (
    <section className="hero_section section" aria-labelledby="hero-title">
      <div className="container hero_section__layout">
        <div className="hero_section__content">
          <span className="eyebrow"><span className="hero_section__home-icon" aria-hidden="true" />Future-ready home planning</span>
          <h1 id="hero-title"><span className="hero_section__title-line">Small Decisions Today.</span><span className="hero_section__title-line hero_section__title-line--accent">Big Savings Tomorrow.</span></h1>
          <p>Smart civil and interior consultations designed around the way you live today—and the way your home may evolve tomorrow.</p>
          <p>From appliance-ready plumbing and electrical points to smarter layouts, storage, lighting and future upgrades, we help you decide before construction begins.</p>
          <div className="actions">
            <a className="action" href="/consultation">Plan My Home</a>
            <a className="action action--secondary" href="/#consultation">Explore Our Services</a>
          </div>
        </div>
        <div className="hero_section__visual">
          <div className="hero_section__scene photo">
            <div className="hero_section__image" role="img" aria-label="A sunlit living room and kitchen with wood finishes, planned for future appliances and everyday living." />
            <ul className="hero_section__markers" aria-label="Future-ready planning features">
              {markers.map(([name, label]) => <li key={name} className={`hero_section__marker hero_section__marker--${name}`}>{label}</li>)}
            </ul>
          </div>
          <ul className="hero_section__benefits">
            <li>Free Expert Guidance</li><li>Personalised Home Planning</li><li>Smarter Future-Ready Decisions</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
