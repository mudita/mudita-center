import { Topic } from "Renderer/models/messages/messages.interface"

const removeDecoratorsFromPhoneNumber = (string: string): string => {
  return string.split(" ").join("").replace("+", "")
}

const findTopicBySearchParams = (
  searchParams: URLSearchParams,
  topics: Topic[]
): Topic | undefined => {
  return topics.find(({ caller: { id, primaryPhoneNumber = "" } }) => {
    const paramsPhoneNumber = searchParams.get("phoneNumber") || ""
    const paramsCallerId = searchParams.get("callerId") || ""
    console.log("primaryPhoneNumber: ", primaryPhoneNumber)
    console.log(
      "removeDecoratorsFromPhoneNumber(primaryPhoneNumber): ",
      removeDecoratorsFromPhoneNumber(primaryPhoneNumber)
    )
    console.log("paramsPhoneNumber: ", paramsPhoneNumber)
    return (
      id === paramsCallerId &&
      removeDecoratorsFromPhoneNumber(primaryPhoneNumber) ===
        removeDecoratorsFromPhoneNumber(paramsPhoneNumber)
    )
  })
}

export default findTopicBySearchParams
