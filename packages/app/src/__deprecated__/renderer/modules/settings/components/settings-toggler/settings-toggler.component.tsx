/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import ButtonToggler, {
  ButtonTogglerItem,
} from "App/__deprecated__/renderer/components/core/button-toggler/button-toggler.component"
import { twoStateToggler } from "App/__deprecated__/renderer/modules/settings/helpers/settings-toggler-state"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { SettingsTogglerTestIds } from "App/__deprecated__/renderer/modules/settings/components/settings-toggler/settings-toggler-test-ids.enum"

const Toggler = styled(ButtonToggler)`
  margin-right: 3.2rem;
`

const TogglerItem = styled(ButtonTogglerItem)`
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
