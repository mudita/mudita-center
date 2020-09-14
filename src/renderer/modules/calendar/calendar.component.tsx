import React from "react"

import { defineMessages, FormattedDate, FormattedTime } from "react-intl"
import { Col, Row } from "Renderer/components/core/table/table.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarProps } from "Renderer/modules/calendar/calendar.interface"
import { calendarSeed } from "App/seeds/calendar"
import {
  CalendarEventsList,
  Header,
} from "Renderer/modules/calendar/calendar.styled"

const messages = defineMessages({
  allEvents: {
    id: "view.name.calendar.allEvents",
  },
})

const Calendar: FunctionComponent<CalendarProps> = () => (
  <>
    <Header message={messages.allEvents} />
    <CalendarEventsList>
      {calendarSeed.map((item) => {
        const { id, name, date } = item
        const [startDate, endDate] = date

        return (
          <Row key={id}>
            <Col>{name}</Col>
            <Col>
              <FormattedTime value={startDate} /> -{" "}
              <FormattedTime value={endDate} />
            </Col>
            <Col>
              <FormattedDate
                value={startDate}
                year="numeric"
                month="long"
                day="2-digit"
                weekday="long"
              />
            </Col>
          </Row>
        )
      })}
    </CalendarEventsList>
  </>
)

export default Calendar
