/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { FormattedDate } from "react-intl"
import { TimeWindow } from "Renderer/components/rest/calendar/time-window.component"
import moment from "moment"

type Props = Pick<CalendarEvent, "startDate" | "endDate">

const EventsListDate: FunctionComponent<Props> = ({ startDate, endDate }) => {
  const sameDay = moment(startDate).isSame(endDate, "day")
  return (
    <>
      {!sameDay ? (
        <>
          <FormattedDate
            value={startDate}
            year="numeric"
            month="long"
            day="2-digit"
            hour="2-digit"
            minute="2-digit"
          />{" "}
          -{" "}
          <FormattedDate
            value={endDate}
            year="numeric"
            month="long"
            day="2-digit"
            hour="2-digit"
            minute="2-digit"
          />
        </>
      ) : (
        <>
          <FormattedDate
            value={startDate}
            year="numeric"
            month="long"
            day="2-digit"
            weekday="long"
          />
          {", "}
          <TimeWindow startDate={startDate} endDate={endDate} />
        </>
      )}
    </>
  )
}

export default EventsListDate
