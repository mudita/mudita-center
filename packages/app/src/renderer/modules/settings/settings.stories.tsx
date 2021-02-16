/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import SettingsUI from "Renderer/components/rest/settings/settings-ui.component"

storiesOf("Settings/Settings(connection)", module).add(
  "Settings(connection)",
  () => (
    <div style={{ maxWidth: "63rem" }}>
      <SettingsUI appAutostart={false} appTethering={false} />
    </div>
  )
)
