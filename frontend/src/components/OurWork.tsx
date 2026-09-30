import { useState } from 'react'

const filters = ['All', 'Interiors', 'Civil', 'Kitchen', 'Utility', 'Electrical', 'Future Planning']
const projects = [
  { id: 'kitchen', category: 'Kitchen', title: 'The Everyday Kitchen', tags: ['Kitchen', 'Interiors'], description: 'A practical kitchen with appliance-ready planning and storage for everyday living.' },
  { id: 'gate', category: 'Interiors', title: 'Electric Gate & Driveway Planning', tags: ['Civil', 'Interiors', 'Electrical'], description: 'Plan the entrance, driveway and electrical provisions before the finishing work begins.' },
  { id: 'utility', category: 'Utility', title: 'Utility Without Compromise', tags: ['Utility', 'Electrical'], description: 'Make room for appliances, plumbing and the everyday routines that keep a home running.' },
  { id: 'flex', category: 'Future Planning', title: 'A Room That Evolves', tags: ['Interiors', 'Future Planning'], description: 'Flexible spaces designed to adapt as your family’s needs change.' },
  { id: 'interior', category: 'Utility', title: 'Electrical & Plumbing Planning', tags: ['Electrical', 'Utility', 'Civil'], description: 'Consider lighting, power and water requirements early to avoid changes after construction.' },
]
export default function OurWork() {
  const [filter, setFilter] = useState('All')
  const shown = projects.filter(p => filter === 'All' || p.tags.includes(filter))
  return <section className="our_work section" id="our-work" aria-labelledby="work-title">
    <div className="container">
      <div className="section-heading"><span className="eyebrow">02 / Our Work</span><h2 id="work-title">One Home. More Possibilities.</h2><p>A home is not finished when the interiors are installed. It evolves with your lifestyle. Our consultation helps you prepare for what comes next.</p></div>
      <div className="our_work__filters" role="group" aria-label="Filter projects">{filters.map(item => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
      <div className="our_work__grid" key={filter}>{shown.map(project => <button type="button" key={project.id} className={`our_work__project our_work__project--${project.id}`} aria-label={project.title}>
        <span className="our_work__caption"><span className="our_work__category">{project.category}</span><span className="our_work__title">{project.title}<span className="our_work__arrow" aria-hidden="true" /></span></span>
      </button>)}</div>
      {/* <div className="our_work__partners"><span className="eyebrow">Collaboration</span><div className="our_work__partner-row"><h3>Trusted by homeowners &amp; businesses</h3>
      <div className="our_work__logos" aria-label="Sample partner logos">{[1,2,3,4].map(i => <span key={i} className="our_work__logo" role="img" aria-label="Logoipsum sample logo" />)}</div>
      </div></div> */}
    </div>
  </section>
}
