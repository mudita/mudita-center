/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Topic } from "Renderer/models/messages/messages.interface"
import { isCallerMatchingPhoneNumber } from "Renderer/models/messages/utils/caller-utils.ts"

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
