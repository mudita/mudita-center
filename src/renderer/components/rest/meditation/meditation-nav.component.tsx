import React from "react"

import FunctionComponent from "Renderer/types/function-component.interface"
import ArrowLeft from "Renderer/svg/arrow-long-left.svg"
import ArrowRight from "Renderer/svg/arrow-long-right.svg"
import { noop } from "Renderer/utils/noop"
import {
  Button,
  DateRange,
  GotoButton,
  WeekIndicator,
  Wrapper,
} from "Renderer/components/rest/meditation/meditation-nav.styled"

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

const MeditationNav: FunctionComponent<MeditationNavProps> = ({
  startDate,
  endDate,
}) => {
  return (
    <>
      <Wrapper>
        <GotoButton>Go to today</GotoButton>
        <div>
          <Wrapper as="nav">
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
        </div>
      </Wrapper>
    </>
  )
}

export default MeditationNav
