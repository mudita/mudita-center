/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"

type Properties = ComponentProps<typeof SettingsUI>

const Settings: FunctionComponent<Properties> = ({
  ...uiComponentProperties
}) => {
  return <SettingsUI {...uiComponentProperties} />
}

export default Settings
