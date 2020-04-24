import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { twoStateToggler } from "Renderer/modules/settings/settings-toggler-state"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

const Toggler = styled(ButtonToggler)`
  margin-right: 4rem;
`

const TogglerItem = styled(ButtonTogglerItem)`
  padding: 0 3.6rem;
  width: 75%;
`

interface Props {
  togglerState: typeof twoStateToggler
  toggleValue?: string
  onToggle: (label: ToggleState) => void
}

const SettingsToggler: FunctionComponent<Props> = ({
  togglerState,
  toggleValue,
  onToggle,
}) => {
  return (
    <Toggler filled>
      {togglerState.map(label => {
        const changeStatus = () => {
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
