import { Contact } from "Renderer/models/phone/phone.typings"
import { removeDecoratorsFromPhoneNumber } from "Renderer/models/utils/remove-decorators-from-phone-number"

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
