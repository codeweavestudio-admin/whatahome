import Home from './pages/Home'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { contact } from './config/contact'

export default function App() {
  const { countryCode, phoneNumber, message } = contact.whatsapp
  return <>
    <Home />
    <FloatingWhatsApp phoneNumber={phoneNumber ? `${countryCode}${phoneNumber}` : ''} message={message} />
  </>
}
