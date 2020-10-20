export const removeDecoratorsFromPhoneNumber = (string = ""): string => {
  return string.split(" ").join("").replace("+", "")
}
