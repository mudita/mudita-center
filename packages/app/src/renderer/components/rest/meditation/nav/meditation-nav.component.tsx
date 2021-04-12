/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"

import { FunctionComponent } from "Renderer/types/function-component.interface"
import ArrowLeft from "Renderer/svg/arrow-long-left.svg"
import ArrowRight from "Renderer/svg/arrow-long-right.svg"
import { noop } from "Renderer/utils/noop"
import { defineMessages, FormattedDate } from "react-intl"
import {
  Button,
  DateRange,
  GotoButton,
  Separator,
  WeekIndicator,
  Wrapper,
} from "Renderer/components/rest/meditation/nav/meditation-nav.styled"
import {
  DateFormatItems,
  dateWithinThisWeek,
  formatDate,
  intlFormatDateConfig,
  MeditationNavProps,
} from "Renderer/components/rest/meditation/nav/meditation-nav.helpers"

const intlDateFormat = (show: DateFormatItems[]) => {
  const baseConfig: intlFormatDateConfig = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }

  const config: intlFormatDateConfig = {}

  show.forEach((item) => {
    if (item === DateFormatItems.Day) {
      config.day = baseConfig.day
    }

    if (item === DateFormatItems.Month) {
      config.month = baseConfig.month
    }

    if (item === DateFormatItems.Year) {
      config.year = baseConfig.year
    }
  })

  return config
}

const messages = defineMessages({
  thisWeek: { id: "view.name.meditation.navigation.thisWeek" },
  goToToday: { id: "view.name.meditation.navigation.goToToday" },
})

const MeditationNav: FunctionComponent<MeditationNavProps> = ({
  startDate: baseStartDate,
  endDate: baseEndDate,
  show: baseShow,
}) => {
  const startDate = formatDate(baseStartDate)
  const endDate = baseEndDate && formatDate(baseEndDate)
  const show = baseShow || [
    DateFormatItems.Day,
    DateFormatItems.Month,
    DateFormatItems.Year,
  ]

  return (
    <Wrapper>
      <GotoButton labelMessage={messages.goToToday} />
      <div>
        <Wrapper as="nav">
          <Button onClick={noop}>
            <ArrowLeft />
          </Button>
          <DateRange long={Boolean(endDate)}>
            <FormattedDate value={startDate} {...intlDateFormat(show)} />
            {endDate && (
              <>
                <Separator />
                <FormattedDate value={endDate} {...intlDateFormat(show)} />
              </>
            )}
          </DateRange>
          <Button onClick={noop}>
            <ArrowRight />
          </Button>
        </Wrapper>
        {endDate && dateWithinThisWeek({ startDate, endDate }) && (
          <WeekIndicator message={messages.thisWeek} />
        )}
      </div>
    </Wrapper>
  )
}

export default MeditationNav
