import React from "react"
import { FormattedTime } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

type Props = Pick<CalendarEvent, "startDate" | "endDate">

export const TimeWindow: FunctionComponent<Props> = ({
  startDate,
  endDate,
}) => {
  return (
    <>
      <FormattedTime value={startDate} /> - <FormattedTime value={endDate} />
    </>
  )
}
