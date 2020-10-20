import { Contact } from "Renderer/models/phone/phone.typings"
import { removeDecoratorsFromPhoneNumber } from "Renderer/modules/messages/find-topic-by-search-params"

const findContactBySearchParams = (
  searchParams: URLSearchParams,
  contacts: Contact[]
): Contact | undefined => {
  const phoneNumber = searchParams.get("phoneNumber") || ""

  return contacts.find(
    ({ primaryPhoneNumber = "", secondaryPhoneNumber = "" }) => {
      if (phoneNumber === "") return false

      return (
        phoneNumber === removeDecoratorsFromPhoneNumber(primaryPhoneNumber) ||
        phoneNumber === removeDecoratorsFromPhoneNumber(secondaryPhoneNumber)
      )
    }
  )
}

export default findContactBySearchParams
