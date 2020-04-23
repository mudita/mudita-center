import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { noop } from "Renderer/utils/noop"
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
  onToggleValueChange?: () => void
}

const SettingsToggler: FunctionComponent<Props> = ({
  togglerState,
  onToggleValueChange = noop,
}) => {
  const [toggleValue, setToggleValue] = useState<ToggleState>(ToggleState.Off)
  return (
    <Toggler filled>
      {togglerState.map(label => {
        const changeStatus = () => {
          setToggleValue(label)
          onToggleValueChange()
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
