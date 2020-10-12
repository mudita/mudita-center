import { Topic } from "Renderer/models/messages/messages.interface"
import { madeIsCallerMatching } from "Renderer/models/messages/utils/caller-utils.ts"

const findTopicBySearchParams = (
  searchParams: URLSearchParams,
  topics: Topic[]
): Topic | undefined => {
  const phoneNumber = searchParams.get("phoneNumber") || ""
  const callerId = searchParams.get("callerId") || ""
  const isCallerMatching = madeIsCallerMatching(phoneNumber, callerId)

  return topics.find(({ caller }) => isCallerMatching(caller))
}

export default findTopicBySearchParams
