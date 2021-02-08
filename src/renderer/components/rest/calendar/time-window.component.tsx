/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FormattedTime } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

type Props = Pick<CalendarEvent, "startDate" | "endDate">

export const TimeWindow: FunctionComponent<Props> = ({
  startDate,
  endDate,
}) => (
  <>
    <FormattedTime value={startDate} /> - <FormattedTime value={endDate} />
  </>
)
