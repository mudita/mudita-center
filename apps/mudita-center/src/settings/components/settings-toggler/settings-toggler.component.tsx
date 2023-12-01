/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { twoStateToggler } from "App/settings/helpers/settings-toggler-state"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { SettingsTogglerTestIds } from "App/settings/components/settings-toggler/settings-toggler-test-ids.enum"
import {
  Toggler,
  TogglerItem,
} from "App/settings/components/settings-toggler/settings-toggler.styled"
import { SettingsTogglerProps } from "App/settings/components/settings-toggler/settings-toggler.interface"

export const SettingsToggler: FunctionComponent<SettingsTogglerProps> = ({
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
