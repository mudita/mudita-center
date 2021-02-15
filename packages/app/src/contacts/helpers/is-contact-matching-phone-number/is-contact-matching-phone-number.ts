import { removeDecoratorsFromPhoneNumber } from "Renderer/models/utils/remove-decorators-from-phone-number"
import { Props } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number.type"

export const isContactMatchingPhoneNumber = (
  { primaryPhoneNumber = "", secondaryPhoneNumber = "" }: Props,
  phoneNumber: string
): boolean => {
  if (phoneNumber === "") {
    return false
  }

  return (
    removeDecoratorsFromPhoneNumber(phoneNumber) ===
      removeDecoratorsFromPhoneNumber(primaryPhoneNumber) ||
    removeDecoratorsFromPhoneNumber(phoneNumber) ===
      removeDecoratorsFromPhoneNumber(secondaryPhoneNumber)
  )
}
