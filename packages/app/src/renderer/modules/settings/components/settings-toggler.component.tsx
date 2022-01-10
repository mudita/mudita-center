/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { twoStateToggler } from "Renderer/modules/settings/settings-toggler-state"
import { noop } from "Renderer/utils/noop"
import { SettingsTogglerTestIds } from "Renderer/modules/settings/components/settings-toggler-test-ids.enum"

const Toggler = styled(ButtonToggler)`
  margin-right: 3.2rem;
`

const TogglerItem = styled(ButtonTogglerItem)`
  padding: 0 3.6rem;
  width: 8.8rem;
`

export interface SettingsTogglerProps {
  toggleValue?: boolean
  onToggle?: (option: boolean) => void
}

const SettingsToggler: FunctionComponent<SettingsTogglerProps> = ({
  toggleValue,
  onToggle = noop,
  ...props
}) => {
  return (
    <Toggler filled {...props}>
      {twoStateToggler.map((value) => {
        const changeStatus = () => {
          onToggle(value)
        }
        const active = toggleValue === value
        return (
          <TogglerItem
            key={Number(value)}
            label={intl.formatMessage({
              id: value
                ? "module.settings.onLabel"
                : "module.settings.offLabel",
            })}
            onClick={changeStatus}
            active={active}
            data-testid={
              active
                ? SettingsTogglerTestIds.Active
                : SettingsTogglerTestIds.Inactive
            }
          />
        )
      })}
    </Toggler>
  )
}

export default SettingsToggler
