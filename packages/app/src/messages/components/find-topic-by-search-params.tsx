import { isCallerMatchingPhoneNumber } from "Renderer/models/calls/caller-utils.ts"
import { Topic } from "App/messages/store/messages.interface"

const findTopicBySearchParams = (
  searchParams: URLSearchParams,
  topics: Topic[]
): Topic | undefined => {
  const paramsPhoneNumber = searchParams.get("phoneNumber") || ""

  return topics.find(({ caller }) =>
    isCallerMatchingPhoneNumber(caller, paramsPhoneNumber)
  )
}

export default findTopicBySearchParams
