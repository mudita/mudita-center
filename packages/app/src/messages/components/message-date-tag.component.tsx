/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import moment from "moment"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Tag from "Renderer/components/core/tag/tag.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { textColor } from "Renderer/styles/theming/theme-getters"

const messages = defineMessages({
  today: {
    id: "component.textToday",
  },
})

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 3.6rem 0 2.8rem 0;
`

const DateTag = styled(Tag)`
  p {
    color: ${textColor("primary")};
  }
`

interface Properties {
  date: Date
}

const formatToMessageDate = (date: Date): string | JSX.Element => {
  if (isToday(date)) {
    return <Text message={messages.today} element={"span"} />
  } else if (isThisYear(date)) {
    return moment(date).format("dddd, MMMM Do")
  } else {
    return moment(date).format("MMMM Do, YYYY")
  }
}

const isToday = (date: Date): boolean => {
  return moment(date).isSame(new Date(), "day")
}

const isThisYear = (date: Date): boolean => {
  return moment(date).isSame(new Date(), "year")
}

const MessageDateTag: FunctionComponent<Properties> = ({ date, ...props }) => {
  return (
    <TagContainer {...props}>
      <DateTag>
        <Text displayStyle={TextDisplayStyle.SmallFadedText}>
          {formatToMessageDate(date)}
        </Text>
      </DateTag>
    </TagContainer>
  )
}

export default MessageDateTag
