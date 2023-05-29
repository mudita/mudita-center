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
  //TODO CP-1873 - make sure that works
  const paramsPhoneNumberId = searchParams.get("phoneNumberId") || ""

  return threads.find(({ phoneNumberId }) =>
    isCallerMatchingPhoneNumber(phoneNumberId, paramsPhoneNumberId)
  )
}

export default findThreadBySearchParams
