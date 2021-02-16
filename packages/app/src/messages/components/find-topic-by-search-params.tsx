/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

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
