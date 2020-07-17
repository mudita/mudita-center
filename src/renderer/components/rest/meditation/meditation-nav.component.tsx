import React from "react"
import styled from "styled-components"

import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import ArrowLeft from "Renderer/svg/arrow-long-left.svg"
import ArrowRight from "Renderer/svg/arrow-long-right.svg"
import { noop } from "Renderer/utils/noop"

type MediationDate = string | Date

interface MeditationNavProps {
  startDate: MediationDate
  endDate: MediationDate
}

const formatDate = (input: MediationDate): string => {
  if (typeof input === "string") {
    return input
  }

  return ""
}

const DateRange = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.LargeBoldText,
}))`
  margin-bottom: 0.4rem;
  text-align: center;
  min-width: 17rem;
`

const WeekIndicator = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallFadedText,
}))``

const Button = styled.button`
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
  position: relative;
  top: -0.2rem;
`

const Wrapper = styled.div`
  display: flex;
`

const GotoButton = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallSupplementaryText,
  element: "button",
}))`
  line-height: 1.7rem;
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0;
  position: relative;
  top: -0.2rem;
  margin-right: 1.65rem;
`

const MeditationNav: FunctionComponent<MeditationNavProps> = ({
  startDate,
  endDate,
}) => {
  return (
    <>
      <Wrapper>
        <GotoButton>Go to today</GotoButton>
        <Button onClick={noop}>
          <ArrowLeft />
        </Button>
        <DateRange>
          {formatDate(startDate)} - {formatDate(endDate)}
        </DateRange>
        <Button onClick={noop}>
          <ArrowRight />
        </Button>
      </Wrapper>
      <WeekIndicator>This week</WeekIndicator>
    </>
  )
}

export default MeditationNav
