/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Type } from "Renderer/components/core/icon/icon.config"
import { Message } from "Renderer/interfaces/message.interface"
import { Caller, CallStatus } from "Renderer/models/calls/calls.interface"

export interface Details {
  id: string
  caller: Caller
  duration: number
  date: Date
  status: CallStatus
  timesMissed: number
  icon: Type
  description: Message
}
