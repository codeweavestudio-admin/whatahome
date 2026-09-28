type FloatingWhatsAppProps = {
  phoneNumber: string
  message: string
}

export default function FloatingWhatsApp({ phoneNumber, message }: FloatingWhatsAppProps) {
  const digits = phoneNumber.replace(/\D/g, '')
  if (!digits) return null
  const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
  return (
    <a className="floating_whatsapp" href={url} target="_blank" rel="noopener noreferrer"
      aria-label="Chat with Whatahome on WhatsApp (opens in a new tab)" title="Chat with us on WhatsApp">
      <span className="floating_whatsapp__icon" aria-hidden="true" />
    </a>
  )
}
