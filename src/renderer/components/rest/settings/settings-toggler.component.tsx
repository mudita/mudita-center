import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { twoStateToggler } from "Renderer/modules/settings/settings-toggler-state"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"
import { noop } from "Renderer/utils/noop"

const Toggler = styled(ButtonToggler)`
  margin-right: 4rem;
`

const TogglerItem = styled(ButtonTogglerItem)`
  padding: 0 3.6rem;
  width: 75%;
`

interface Props {
  toggleValue?: string
  changeToggleValue: (label: ToggleState) => void
  onToggle?: (label: ToggleState) => void
}

const SettingsToggler: FunctionComponent<Props> = ({
  toggleValue,
  changeToggleValue,
  onToggle = noop,
}) => {
  return (
    <Toggler filled>
      {twoStateToggler.map(label => {
        const changeStatus = () => {
          changeToggleValue(label)
          onToggle(label)
        }
        return (
          <TogglerItem
            key={label}
            label={intl.formatMessage({
              id: label,
            })}
            onClick={changeStatus}
            active={toggleValue === label}
            data-testid={
              toggleValue === label ? "toggler-active" : "toggler-inactive"
            }
          />
        )
      })}
    </Toggler>
  )
}

export default SettingsToggler
