/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import React, { ComponentProps } from "react"
import MessageBubble from "App/messages/components/message-bubble.component"
import SlackDate from "App/messages/components/slack-date.component"

interface Properties extends ComponentProps<typeof MessageBubble> {
  previousDateIsSame: boolean
  date: Date
}

const MessageDayBubble: FunctionComponent<Properties> = ({
  previousAuthor,
  previousDateIsSame,
  date,
  ...messageProps
}) => {
  return (
    <>
      {!previousDateIsSame && <SlackDate date={date} />}
      <MessageBubble
        {...messageProps}
        previousAuthor={!previousDateIsSame || previousAuthor}
      />
    </>
  )
}

export default MessageDayBubble
