import { Author } from "Renderer/models/messages/messages.interface"

export const removeDecoratorsFromPhoneNumber = (string: string): string => {
  return string.split(" ").join("").replace("+", "")
}

export const madeIsCallerMatching = (
  phoneNumber: string,
  callerId: string
): ((caller: Author) => boolean) => {
  return ({ id, primaryPhoneNumber = "" }) =>
    callerId === id &&
    removeDecoratorsFromPhoneNumber(primaryPhoneNumber) ===
      removeDecoratorsFromPhoneNumber(phoneNumber)
}
