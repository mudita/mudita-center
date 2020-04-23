import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import {
  ToggleState,
  twoStateToggler,
} from "Renderer/modules/settings/settings.enum"

const Toggler = styled(ButtonToggler)`
  margin-right: 4rem;
`

const TogglerItem = styled(ButtonTogglerItem)`
  padding: 0 3.6rem;
  width: 75%;
`

interface Props {
  togglerValue?: string
  changeTogglerValue: (label: ToggleState) => void
  togglerState: typeof twoStateToggler
}

const SettingsToggler: FunctionComponent<Props> = ({
  changeTogglerValue,
  togglerState,
  togglerValue,
}) => {
  return (
    <Toggler filled>
      {togglerState.map(label => {
        const changeStatus = () => changeTogglerValue(label)
        return (
          <TogglerItem
            key={label}
            label={intl.formatMessage({
              id: label,
            })}
            onClick={changeStatus}
            active={togglerValue === label}
            data-testid={
              togglerValue === label ? "toggler-active" : "toggler-inactive"
            }
          />
        )
      })}
    </Toggler>
  )
}

export default SettingsToggler
