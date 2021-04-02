/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import React, { ComponentProps } from "react"
import MessageBubble from "App/messages/components/message-bubble.component"
import MessageDateTag from "App/messages/components/message-date-tag.component"
import { MessageDayBubbleTestIds } from "App/messages/components/message-day-bubble-test-ids"

interface Properties extends ComponentProps<typeof MessageBubble> {
  displayDate: boolean
  date: Date
}

const MessageDayBubble: FunctionComponent<Properties> = ({
  previousAuthor,
  displayDate,
  date,
  ...messageProps
}) => {
  return (
    <>
      {!displayDate && (
        <MessageDateTag data-testid={MessageDayBubbleTestIds.Date} date={date} />
      )}
      <MessageBubble
        {...messageProps}
        previousAuthor={!displayDate || previousAuthor}
      />
    </>
  )
}

export default MessageDayBubble
