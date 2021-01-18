import { Contact } from "App/contacts/store/contacts.typings"
import { isContactMatchingPhoneNumber } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"

const findContactByPhoneNumber = (
  contacts: Contact[],
  phoneNumber: string
): Contact | undefined => {
  return contacts.find((contact) =>
    isContactMatchingPhoneNumber(contact, phoneNumber)
  )
}

export default findContactByPhoneNumber
