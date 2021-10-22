/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isCallerMatchingPhoneNumber } from "Renderer/models/calls/caller-utils.ts"
import { Thread } from "App/messages/reducers/messages.interface"

const findThreadBySearchParams = (
  searchParams: URLSearchParams,
  threads: Thread[]
): Thread | undefined => {
  const paramsPhoneNumber = searchParams.get("phoneNumber") || ""

  return threads.find(({ id }) =>
    isCallerMatchingPhoneNumber(id, paramsPhoneNumber)
  )
}

export default findThreadBySearchParams
