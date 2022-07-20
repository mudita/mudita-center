/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageType } from "App/messages/constants"

export interface Message {
  id: string
  date: Date
  content: string
  phoneNumber: string
  threadId: string
  messageType: MessageType
}
