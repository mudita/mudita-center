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
} from "Renderer/components/rest/phone/contact-panel.component"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"

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
        label={intl.formatMessage({
          id: "view.name.calendar.panel.searchPlaceholder",
        })}
        onChange={onChange}
        type="search"
        outlined
      />
      <Buttons>
        <ButtonComponent
          displayStyle={DisplayStyle.Secondary}
          labelMessage={{ id: "view.name.calendar.panel.synchroniseButton" }}
          onClick={onSynchroniseClick}
        />
        <ButtonComponent
          labelMessage={{
            id: "view.name.calendar.panel.addEventButton",
          }}
          onClick={onAddEventClick}
          Icon={Type.PlusSign}
        />
      </Buttons>
    </Panel>
  )
}

export default CalendarPanel
