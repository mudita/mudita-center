import { Topic } from "Renderer/models/messages/messages.interface"

const transformPhoneNumberToNumber = (string: string): number => {
  return Number(string.split(" ").join("").replace("+", ""))
}

const findTopicBySearchParams = (
  searchParams: URLSearchParams,
  topics: Topic[]
): Topic | undefined => {
  return topics.find(({ caller: { id, primaryPhoneNumber = "" } }) => {
    const paramsPhoneNumber = searchParams.get("phoneNumber") || ""
    const paramsCallerId = searchParams.get("callerId") || ""
    return (
      id === paramsCallerId &&
      transformPhoneNumberToNumber(primaryPhoneNumber) ===
        transformPhoneNumberToNumber(paramsPhoneNumber)
    )
  })
}

export default findTopicBySearchParams
