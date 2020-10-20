import React from "react"
import { FormattedTime } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarEvent } from "Renderer/modules/calendar/calendar.interface"

type Props = Pick<CalendarEvent, "date">

export const TimeWindow: FunctionComponent<Props> = ({
  date: [startDate, endDate],
}) => {
  return (
    <>
      <FormattedTime value={startDate} /> - <FormattedTime value={endDate} />
    </>
  )
}
