/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { isCallerMatchingPhoneNumber } from "Renderer/models/calls/caller-utils.ts"
import { Thread } from "App/messages/store/messages.interface"

const findThreadBySearchParams = (
  searchParams: URLSearchParams,
  threads: Thread[]
): Thread | undefined => {
  const paramsPhoneNumber = searchParams.get("phoneNumber") || ""

  return threads.find(({ caller }) =>
    isCallerMatchingPhoneNumber(caller, paramsPhoneNumber)
  )
}

export default findThreadBySearchParams
