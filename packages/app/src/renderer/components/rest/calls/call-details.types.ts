/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Message } from "Renderer/interfaces/message.interface"
import { Caller, CallStatus } from "Renderer/models/calls/calls.interface"
import { IconType } from "Renderer/components/core/icon/icon-type"

export interface Details {
  id: string
  caller: Caller
  duration: number
  date: Date
  status: CallStatus
  timesMissed: number
  icon: IconType
  description: Message
}
