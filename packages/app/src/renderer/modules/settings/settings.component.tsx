/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"
import { noop } from "Renderer/utils/noop"

interface Properties extends ComponentProps<typeof SettingsUI> {
  checkAutostartValue?: () => Promise<boolean>
}

const Settings: FunctionComponent<Properties> = ({
  checkAutostartValue = noop,
  ...uiComponentProperties
}) => {
  useEffect(() => {
    checkAutostartValue()
  }, [])
  return <SettingsUI {...uiComponentProperties} />
}

export default Settings
