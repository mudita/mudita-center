import React from "react"

import { defineMessages } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarProps } from "Renderer/modules/calendar/calendar.interface"
import { calendarSeed } from "App/seeds/calendar"
import {
  Event,
  EventsList,
  Header,
} from "Renderer/modules/calendar/calendar.styled"

const messages = defineMessages({
  allEvents: {
    id: "view.name.calendar.allEvents",
  },
})

const Calendar: FunctionComponent<CalendarProps> = ({
  events = calendarSeed,
}) => (
  <>
    <Header message={messages.allEvents} />
    <EventsList>
      {events.map((item) => (
        <Event key={item.id} event={item} />
      ))}
    </EventsList>
  </>
)

export default Calendar
