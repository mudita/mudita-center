export const removeDecoratorsFromPhoneNumber = (string = ""): string => {
  return string.replace(/[^\d]/g, "")
}
