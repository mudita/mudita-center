import React, { ChangeEvent } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { intl } from "Renderer/utils/intl"
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
  searchPlaceholder: { id: "view.name.calendar.panel.searchPlaceholder" },
  synchroniseButton: { id: "view.name.calendar.panel.synchroniseButton" },
  addEventButton: { id: "view.name.calendar.panel.addEventButton" },
})

interface CalendarPanelProps {
  onAddEventClick?: () => void
  onSynchroniseClick?: () => void
  onSearchTermChange: (value: string) => void
}

const CalendarPanel: FunctionComponent<CalendarPanelProps> = ({
  onAddEventClick = noop,
  onSynchroniseClick = noop,
  onSearchTermChange,
}) => {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(target.value)
  }
  return (
    <Panel>
      <InputComponent
        leadingIcons={[searchIcon]}
        label={intl.formatMessage(messages.searchPlaceholder)}
        onChange={onChange}
        type="search"
        outlined
      />
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
