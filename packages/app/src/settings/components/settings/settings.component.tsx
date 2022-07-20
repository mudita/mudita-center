/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { SettingsUI } from "App/settings/components/settings/settings-ui.component"

type Properties = ComponentProps<typeof SettingsUI>

export const Settings: FunctionComponent<Properties> = ({
  ...uiComponentProperties
}) => {
  return <SettingsUI {...uiComponentProperties} />
}
