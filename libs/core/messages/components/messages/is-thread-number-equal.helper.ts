/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread } from "Core/messages/dto"
import { mapToRawNumber } from "Core/messages/helpers"

export const isThreadNumberEqual =
  (phoneNumber: string) =>
  (thread: Thread): boolean => {
    return mapToRawNumber(thread.phoneNumber) === mapToRawNumber(phoneNumber)
  }
