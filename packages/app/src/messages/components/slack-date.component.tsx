import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Tag from "Renderer/components/core/tag/tag.component"
import React from "react"
import moment from "moment"

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

const formatToSlackDate = (date: Date): string => {
  if (isToday(date)) {
    return "Today"
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
      <Tag>{formatToSlackDate(date)}</Tag>
    </TagContainer>
  )
}

export default SlackDate
