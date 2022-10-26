/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageType } from "App/messages/constants"
import { Thread } from "App/messages/dto"

export const mockThread: Thread = {
  id: "tmpId",
  phoneNumber: "New Conversation",
  lastUpdatedAt: new Date(),
  messageSnippet: "",
  unread: false,
  messageType: MessageType.OUTBOX,
  contactId: undefined,
  contactName: undefined,
}
