import { Contact } from "Renderer/models/phone/phone.typings"
import { isContactMatchingPhoneNumber } from "Renderer/models/phone/is-contact-matching-phone-number"

const findContactByPhoneNumber = (
  contacts: Contact[],
  phoneNumber: string
): Contact | undefined => {
  return contacts.find((contact) =>
    isContactMatchingPhoneNumber(contact, phoneNumber)
  )
}

export default findContactByPhoneNumber
