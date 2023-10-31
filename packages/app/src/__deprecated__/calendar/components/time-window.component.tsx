/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FormattedTime } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"

type Props = Pick<CalendarEvent, "startDate" | "endDate">

export const TimeWindow: FunctionComponent<Props> = ({
  startDate,
  endDate,
}) => (
  <>
    <FormattedTime value={startDate} /> - <FormattedTime value={endDate} />
  </>
)
