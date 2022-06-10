/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import ArrowLeft from "App/__deprecated__/renderer/svg/arrow-long-left.svg"
import ArrowRight from "App/__deprecated__/renderer/svg/arrow-long-right.svg"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { defineMessages, FormattedDate } from "react-intl"
import {
  Button,
  DateRange,
  GotoButton,
  Separator,
  WeekIndicator,
  Wrapper,
} from "App/__deprecated__/renderer/components/rest/meditation/nav/meditation-nav.styled"
import {
  DateFormatItems,
  dateWithinThisWeek,
  formatDate,
  intlFormatDateConfig,
  MeditationNavProps,
} from "App/__deprecated__/renderer/components/rest/meditation/nav/meditation-nav.helpers"

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
  thisWeek: { id: "module.meditation.navigationThisWeek" },
  goToToday: { id: "module.meditation.navigationGoToToday" },
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
