/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageType } from "App/messages/constants"

export interface Thread {
  id: string
  contactId: string | undefined
  contactName: string | undefined
  phoneNumber: string
  lastUpdatedAt: Date
  messageSnippet: string
  unread: boolean
  messageType: MessageType
}
