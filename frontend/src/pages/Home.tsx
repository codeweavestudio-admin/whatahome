import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ConsultationServices from '../components/ConsultationServices'
import PlanningBanner from '../components/PlanningBanner'
import OurWork from '../components/OurWork'
import HowWeSolve from '../components/HowWeSolve'
import Testimonials from '../components/Testimonials'
import ContactCta from '../components/ContactCta'
import Footer from '../components/Footer'
import { useReveal } from '../hooks/useReveal'

export default function Home() {
  useReveal()
  return (
    <div className="home_page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ConsultationServices />
        <PlanningBanner />
        <OurWork />
        <HowWeSolve />
        <PlanningBanner future />
        <Testimonials />
        <ContactCta />
      </main>
      <Footer />
    </div>
  )
}
