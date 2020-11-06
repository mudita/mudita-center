import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarInputSearch, {
  CalendarInputSelectProps,
} from "Renderer/components/rest/calendar/calendar-input-search.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import {
  Buttons,
  Panel,
} from "Renderer/components/rest/phone/contact-panel.styled"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  synchroniseButton: { id: "view.name.calendar.panel.synchroniseButton" },
  addEventButton: { id: "view.name.calendar.panel.addEventButton" },
})

interface CalendarPanelProps extends CalendarInputSelectProps {
  onAddEventClick?: () => void
  onSynchroniseClick?: () => void
}

const CalendarPanel: FunctionComponent<CalendarPanelProps> = ({
  events,
  onEventSelect,
  onAddEventClick = noop,
  onSynchroniseClick = noop,
}) => (
  <Panel>
    <CalendarInputSearch events={events} onEventSelect={onEventSelect} />
    <Buttons>
      <ButtonComponent
        displayStyle={DisplayStyle.Secondary}
        labelMessage={messages.synchroniseButton}
        onClick={onSynchroniseClick}
      />
      <ButtonComponent
        labelMessage={messages.addEventButton}
        onClick={onAddEventClick}
        Icon={Type.PlusSign}
      />
    </Buttons>
  </Panel>
)

export default CalendarPanel
