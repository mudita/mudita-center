import React from "react"
import styled from "styled-components"
import CalendarUIStateless from "App/__deprecated__/calendar/components/calendar-ui-stateless.component"
import { action } from "@storybook/addon-actions"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { calendarSeed } from "App/__deprecated__/seeds/calendar"
import { CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"

const Wrapper = styled.div`
  max-width: 97.5rem;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
`

export default {
  title: "Views/Calendar/Main view",
}

export const WithEvents = () => {
  const tableSelectHook = useTableSelect<CalendarEvent>(calendarSeed.events)
  return (
    <Wrapper>
      <CalendarUIStateless
        events={calendarSeed.events}
        openSelectVendorModal={action("open vendor modal")}
        tableSelectHook={tableSelectHook}
        onEventSelect={action("event select")}
      />
    </Wrapper>
  )
}

WithEvents.story = {
  name: "With events",
}

export const NoEvents = () => {
  const tableSelectHook = useTableSelect<CalendarEvent>(calendarSeed.events)
  return (
    <Wrapper>
      <CalendarUIStateless
        events={[]}
        openSelectVendorModal={action("open vendor modal")}
        tableSelectHook={tableSelectHook}
        onEventSelect={action("event select")}
      />
    </Wrapper>
  )
}

NoEvents.story = {
  name: "No events",
}
