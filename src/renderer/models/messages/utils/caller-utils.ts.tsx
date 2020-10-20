import { Author } from "Renderer/models/messages/messages.interface"

const removeDecoratorsFromPhoneNumber = (string = ""): string => {
  return string.split(" ").join("").replace("+", "")
}

export interface CallerSearchParams extends Record<string, string> {
  id: string
  phoneNumber: string
}

export const isCallerMatchingSearchParams = (
  caller: Author,
  params: CallerSearchParams
): boolean => {
  return (
    params.id === caller.id &&
    removeDecoratorsFromPhoneNumber(caller.primaryPhoneNumber) ===
      removeDecoratorsFromPhoneNumber(params.phoneNumber)
  )
}
