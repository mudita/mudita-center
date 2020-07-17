import React from "react"

import FunctionComponent from "Renderer/types/function-component.interface"
import ArrowLeft from "Renderer/svg/arrow-long-left.svg"
import ArrowRight from "Renderer/svg/arrow-long-right.svg"
import { noop } from "Renderer/utils/noop"
import { defineMessages } from "react-intl"
import {
  Button,
  DateRange,
  GotoButton,
  WeekIndicator,
  Wrapper,
} from "Renderer/components/rest/meditation/meditation-nav.styled"
import { FormattedDate } from "react-intl"
import {
  dateWithinThisWeek,
  formatDate,
  MeditationNavProps,
} from "Renderer/components/rest/meditation/meditation-nav.helpers"

const dateFormatConfig = {
  year: "numeric",
  month: "short",
  day: "2-digit",
}

const messages = defineMessages({
  thisWeek: { id: "component.meditation.nav.thisWeek" },
  goToToday: { id: "component.meditation.nav.goToToday" },
})

const MeditationNav: FunctionComponent<MeditationNavProps> = ({
  startDate: baseStartDate,
  endDate: baseEndDate,
}) => {
  const startDate = formatDate(baseStartDate)
  const endDate = formatDate(baseEndDate)

  return (
    <>
      <Wrapper>
        <GotoButton message={messages.goToToday} />
        <div>
          <Wrapper as="nav">
            <Button onClick={noop}>
              <ArrowLeft />
            </Button>
            <DateRange>
              <FormattedDate value={startDate} {...dateFormatConfig} /> -{" "}
              <FormattedDate value={endDate} {...dateFormatConfig} />
            </DateRange>
            <Button onClick={noop}>
              <ArrowRight />
            </Button>
          </Wrapper>
          {dateWithinThisWeek({ startDate, endDate }) && (
            <WeekIndicator message={messages.thisWeek} />
          )}
        </div>
      </Wrapper>
    </>
  )
}

export default MeditationNav
