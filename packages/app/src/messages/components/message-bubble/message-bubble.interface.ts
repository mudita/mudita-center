/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageType } from "App/messages/constants"
import { User } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"

export interface MessageBubbleProps {
  id: string
  user: User
  message: string
  date: Date
  interlocutor?: boolean
  displayAvatar?: boolean
  forwardMessage?: () => void
  removeMessage?: () => void
  resendMessage?: (messageId: string) => void
  messageType: MessageType
}
