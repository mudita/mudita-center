import { Topic } from "Renderer/models/messages/messages.interface"

export const removeDecoratorsFromPhoneNumber = (string: string): string => {
  return string.split(" ").join("").replace("+", "")
}

const findTopicBySearchParams = (
  searchParams: URLSearchParams,
  topics: Topic[]
): Topic | undefined => {
  const paramsPhoneNumber = searchParams.get("phoneNumber") || ""

  return topics.find(({ caller: { phoneNumber = "" } }) => {
    return (
      removeDecoratorsFromPhoneNumber(phoneNumber) ===
      removeDecoratorsFromPhoneNumber(paramsPhoneNumber)
    )
  })
}

export default findTopicBySearchParams
