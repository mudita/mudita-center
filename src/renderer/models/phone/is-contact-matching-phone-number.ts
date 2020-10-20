import { Contact } from "Renderer/models/phone/phone.typings"
import { removeDecoratorsFromPhoneNumber } from "Renderer/modules/messages/find-topic-by-search-params"

export const isContactMatchingPhoneNumber = (
  { primaryPhoneNumber = "", secondaryPhoneNumber = "" }: Contact,
  phoneNumber: string
): boolean => {
  if (phoneNumber === "") return false

  return (
    removeDecoratorsFromPhoneNumber(phoneNumber) ===
      removeDecoratorsFromPhoneNumber(primaryPhoneNumber) ||
    removeDecoratorsFromPhoneNumber(phoneNumber) ===
      removeDecoratorsFromPhoneNumber(secondaryPhoneNumber)
  )
}
