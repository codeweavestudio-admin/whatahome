import { useAnimatedDetails } from '../hooks/useAnimatedDetails'

const cases = [
  { title: '“What if I decide to buy a dishwasher later?”', follows: ['New plumbing', 'Cabinet changes', 'Additional cost'], solution: 'Plan water, drainage, electrical points and appliance space before the kitchen is fitted.' },
  { title: '“Where will the washing machine go?”', follows: ['Space constraints', 'Plumbing changes', 'Disrupted utility areas'], solution: 'Plan a practical utility space with the right water, drainage and power connections.' },
  { title: '“I wish we had planned another electrical point.”', follows: ['New wiring', 'Wall breaking', 'Repainting', 'Additional cost'], solution: 'Anticipate future electrical requirements during planning.' },
]
export default function HowWeSolve() {
  const toggleDetails = useAnimatedDetails()
  return <section className="how_we_solve section" id="how-we-solve" aria-labelledby="solve-title"><div className="container">
    <div className="section-heading">
      {/* <span className="eyebrow">03 / How We Solve</span> */}
    {/* <h1 id="hero-title"><span className="hero_section__title-line">Small Decisions Today.</span><span className="hero_section__title-line hero_section__title-line--accent">Big Savings Tomorrow.</span></h1> */}
      <h2 id="solve-title"><span>Small Decisions Today.</span>Big Savings Tomorrow.</h2><p>The most expensive home decisions are often the small ones discovered too late. We make those decisions visible while they are still easy to solve.</p></div>
    <div className="how_we_solve__layout">
      <div className="how_we_solve__plan photo" role="img" aria-label="A floor plan showing provisions for a work area and charging, with the impact: less rework, more flexibility." />
      <div className="how_we_solve__cases">{cases.map((item,index) => <details className="how_we_solve__case" key={item.title} open={index === 2}>
        <summary onClick={toggleDetails}><span className="how_we_solve__meta"><span>Case 0{index + 1}</span><span>Problem → Solution → Impact</span></span><h3>{item.title}</h3></summary>
        <div className="how_we_solve__answer"><div><h4>What follows</h4><ul>{item.follows.map(line => <li key={line}>— {line}</li>)}</ul></div><div><h4>A smarter decision</h4><p>{item.solution}</p><strong>Less rework. More flexibility.</strong></div></div>
      </details>)}</div>
    </div>
  </div></section>
}

