/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isCallerMatchingPhoneNumber } from "App/__deprecated__/renderer/models/calls/caller-utils.ts"
import { Thread } from "App/messages/dto"

const findThreadBySearchParams = (
  searchParams: URLSearchParams,
  threads: Thread[]
): Thread | undefined => {
  const paramsPhoneNumber = searchParams.get("phoneNumber") || ""

  return threads.find(({ phoneNumber }) =>
    isCallerMatchingPhoneNumber(phoneNumber, paramsPhoneNumber)
  )
}

export default findThreadBySearchParams
