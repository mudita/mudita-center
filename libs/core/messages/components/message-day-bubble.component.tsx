/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { MessageBubbleProps } from "Core/messages/components/message-bubble"
import MessageBubble from "Core/messages/components/message-bubble/message-bubble.component"
import MessageDateTag from "Core/messages/components/message-date-tag.component"
import { MessageDayBubbleTestIds } from "Core/messages/components/message-day-bubble-test-ids"
import { FunctionComponent } from "Core/core/types/function-component.interface"

interface Properties extends MessageBubbleProps {
  displayDate: boolean
  date: Date
}

const MessageDayBubble: FunctionComponent<Properties> = ({
  displayAvatar,
  displayDate,
  ...messageProps
}) => {
  return (
    <div key={messageProps.id}>
      {!displayDate && (
        <MessageDateTag
          data-testid={MessageDayBubbleTestIds.Date}
          date={messageProps.date}
        />
      )}
      <MessageBubble
        {...messageProps}
        displayAvatar={!displayDate || displayAvatar}
      />
    </div>
  )
}

export default MessageDayBubble
