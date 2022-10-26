/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessagesProps } from "App/messages/components/messages/messages.interface"
import { MessageType } from "App/messages/constants"
import { Message } from "App/messages/dto"
import { useEffect } from "react"

type Props = Pick<
  MessagesProps,
  "messageLayoutNotifications" | "removeLayoutNotification"
>

export const useNotification = ({
  messageLayoutNotifications,
  removeLayoutNotification,
}: Props): void => {
  useEffect(() => {
    messageLayoutNotifications
      .filter(
        (item) => (item.content as Message)?.messageType === MessageType.OUTBOX
      )
      .forEach((item) => {
        removeLayoutNotification(item.id)
      })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageLayoutNotifications])
}
