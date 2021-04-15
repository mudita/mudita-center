/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarInputSearch, {
  CalendarInputSelectProps,
} from "App/calendar/components/calendar-input-search.component"
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
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { intl } from "Renderer/utils/intl"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { CalendarPanelTestIds } from "App/calendar/components/calendar-panel/calendar-panel-test-ids.enum"
import { exportEvents } from "App/calendar/helpers/export-events/export-events"
import modalService, {
  ModalService,
} from "Renderer/components/core/modal/modal.service"
import ExportErrorModal from "App/calendar/components/export-error-modal/export-error-modal.component"

const messages = defineMessages({
  synchroniseButton: { id: "module.calendar.panel.synchroniseButton" },
  addEventButton: { id: "module.calendar.panel.addEventButton" },
  exportButton: { id: "module.calendar.exportButton" },
  deleteButton: { id: "module.calendar.deleteButton" },
})

interface CalendarPanelProps extends CalendarInputSelectProps {
  onAddEventClick?: () => void
  onSynchroniseClick?: () => void
  selectedEvents: CalendarEvent[]
  allEventsSelected?: boolean
  toggleAll?: UseTableSelect<CalendarEvent>["toggleAll"]
  resetRows: UseTableSelect<CalendarEvent>["resetRows"]
  openModal?: ModalService["openModal"]
  exportCalendarEvents?: (calendarEvents: CalendarEvent[]) => Promise<boolean>
}

const CalendarPanel: FunctionComponent<CalendarPanelProps> = ({
  events,
  onEventSelect,
  onAddEventClick = noop,
  onSynchroniseClick = noop,
  selectedEvents,
  allEventsSelected,
  toggleAll = noop,
  resetRows,
  openModal = modalService.openModal.bind(modalService),
  exportCalendarEvents = exportEvents,
}) => {
  const selectedEventsCount = selectedEvents.length
  const selectionMode = selectedEventsCount > 0

  const exportEventsAction = async () => {
    const exported = await exportCalendarEvents(selectedEvents)
    if (exported) {
      resetRows()
    } else {
      openModal(<ExportErrorModal />)
    }
  }
  return (
    <Panel selectionMode={selectionMode}>
      {selectionMode ? (
        <ContactSelectionManager
          selectedItemsNumber={selectedEventsCount}
          allItemsSelected={Boolean(allEventsSelected)}
          message={{ id: "module.calendar.selectionsNumber" }}
          checkboxSize={Size.Large}
          onToggle={toggleAll}
          buttons={[
            <ButtonComponent
              key="export"
              label={intl.formatMessage(messages.exportButton)}
              displayStyle={DisplayStyle.Link1}
              Icon={Type.UploadDark}
              onClick={exportEventsAction}
              data-testid={CalendarPanelTestIds.ExportButton}
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
