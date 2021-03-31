/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import moment from "moment"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { SlackDateTestIds } from "App/messages/components/slack-date-test-ids.enum"
import Tag from "Renderer/components/core/tag/tag.component"
import Text from "Renderer/components/core/text/text.component"

export const messages = defineMessages({
  today: {
    id: "view.name.messages.todaySlackDate",
  },
})

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 3.6rem 0 2.8rem 0;
`

interface Properties {
  date: Date
}

const formatToSlackDate = (date: Date): string | JSX.Element => {
  if (isToday(date)) {
    return <Text message={messages.today} />
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

const SlackDate: FunctionComponent<Properties> = ({ date }) => {
  return (
    <TagContainer>
      <Tag data-testid={SlackDateTestIds.DateTag}>
        {formatToSlackDate(date)}
      </Tag>
    </TagContainer>
  )
}

export default SlackDate
