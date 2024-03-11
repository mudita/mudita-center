/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread } from "Core/messages/dto"
import { isCallerMatchingPhoneNumber } from "Core/__deprecated__/renderer/models/utils/caller-utils.ts"

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
