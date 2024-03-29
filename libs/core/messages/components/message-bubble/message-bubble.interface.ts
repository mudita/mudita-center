/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageType } from "Core/messages/constants"
import { User } from "Core/__deprecated__/renderer/components/core/avatar/avatar.component"

export interface MessageBubbleProps {
  id: string
  user: User
  message: string
  date: Date
  interlocutor?: boolean
  displayAvatar?: boolean
  removeMessage: (messageId: string) => void
  resendMessage?: (messageId: string) => void
  messageType: MessageType
  isMessageBeingDeleted: boolean
  searchQuery: string
  selected: boolean
}
