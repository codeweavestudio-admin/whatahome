export default function PlanningBanner({ future = false }: { future?: boolean }) {
  return <section className="planning_banner section" aria-label={future ? 'Plan for tomorrow' : 'The value of planning'}>
    <div className="container"><h2>{future ? <>We don’t just solve today’s requirements.<span>We help you prepare for tomorrow’s.</span></> : <>Spend once on planning.<span>Avoid spending again on<br className="planning_banner__break" /> modifications.</span></>}</h2></div>
  </section>
}

