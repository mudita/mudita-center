import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import { noop } from "Renderer/utils/noop"

const Calendar: FunctionComponent = () => (
  <div>
    <CalendarPanel onSearchTermChange={noop} />
  </div>
)

export default Calendar
