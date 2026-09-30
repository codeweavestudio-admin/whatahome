// Change the WhatsApp destination and pre-filled message here.
export const contact = {
  whatsapp: {
    countryCode: '91',
    // Full national mobile number, without the country code.
    phoneNumber: '9566999793',
    message: 'Welcome to Whatahome. What service do you need?',
  },
}

export const consultationWhatsAppUrl = `https://wa.me/${`${contact.whatsapp.countryCode}${contact.whatsapp.phoneNumber}`.replace(/\D/g, '')}?text=${encodeURIComponent(contact.whatsapp.message)}`
