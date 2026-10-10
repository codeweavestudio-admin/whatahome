const stories = [
  '“We originally approached them for interiors. The consultation surfaced appliance, utility and electrical needs we had not considered—it gave us a much clearer plan.”',
  '“The conversation was practical, not decorative. Every recommendation connected to how our family uses the home each day.”',
  '“Planning the utility and extra power points early helped us feel confident that the home could adapt later.”',
]
export default function Testimonials() {
  return <section className="testimonials section" aria-labelledby="stories-title"><div className="container">
    <div className="section-heading">
      {/* <span className="eyebrow">04 / Proof + Contact</span> */}
      <h2 id="stories-title">Designed Around Real Homes.</h2><p>Every home is different. Our consultation starts by understanding how you live, what you need today and what you may need tomorrow.</p></div>
    <div className="testimonials__grid">{stories.map((story,index) => <figure key={story}><figcaption>Sample homeowner story 0{index + 1}</figcaption><blockquote>{story}</blockquote></figure>)}</div>
    <ol className="testimonials__steps">{['Electrical and plumbing','Interior planning','Practical consultation','Future ready thinking','Vastu','Technical support'].map((label,index) => <li key={label}><strong>0{index + 1}</strong><span>{label}</span></li>)}</ol>
  </div></section>
}

