import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarInputSearch, {
  CalendarInputSelectProps,
} from "Renderer/components/rest/calendar/calendar-input-search.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import {
  Buttons,
  ContactSelectionManager,
  Panel,
} from "App/contacts/components/contact-panel/contact-panel.styled"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { defineMessages } from "react-intl"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { intl } from "Renderer/utils/intl"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { CalendarPanelTestIds } from "Renderer/components/rest/calendar/calendar-panel-test-ids.enum"

const messages = defineMessages({
  synchroniseButton: { id: "view.name.calendar.panel.synchroniseButton" },
  addEventButton: { id: "view.name.calendar.panel.addEventButton" },
  exportButton: { id: "view.name.calendar.exportButton" },
  deleteButton: { id: "view.name.calendar.deleteButton" },
})

interface CalendarPanelProps extends CalendarInputSelectProps {
  onAddEventClick?: () => void
  onSynchroniseClick?: () => void
  selectedEvents: CalendarEvent[]
  allEventsSelected?: boolean
  toggleAll?: UseTableSelect<CalendarEvent>["toggleAll"]
}

const CalendarPanel: FunctionComponent<CalendarPanelProps> = ({
  events,
  onEventSelect,
  onAddEventClick = noop,
  onSynchroniseClick = noop,
  selectedEvents,
  allEventsSelected,
  toggleAll = noop,
}) => {
  const selectedEventsCount = selectedEvents.length
  const selectionMode = selectedEventsCount > 0
  return (
    <Panel selectionMode={selectionMode}>
      {selectionMode ? (
        <ContactSelectionManager
          selectedItemsNumber={selectedEventsCount}
          allItemsSelected={Boolean(allEventsSelected)}
          message={{ id: "view.name.calendar.selectionsNumber" }}
          checkboxSize={Size.Large}
          onToggle={toggleAll}
          buttons={[
            <ButtonComponent
              key="export"
              label={intl.formatMessage(messages.exportButton)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.UploadDark}
              onClick={noop}
            />,
            <ButtonComponent
              key="delete"
              label={intl.formatMessage(messages.deleteButton)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.Delete}
              onClick={noop}
            />,
          ]}
          data-testid={CalendarPanelTestIds.SelectionManager}
        />
      ) : (
        <CalendarInputSearch events={events} onEventSelect={onEventSelect} />
      )}
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
}

export default CalendarPanel
