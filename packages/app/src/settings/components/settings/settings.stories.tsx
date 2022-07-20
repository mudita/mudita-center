/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { SettingsUI } from "App/settings/components/settings/settings-ui.component"

storiesOf("Settings/Settings(connection)", module).add(
  "Settings(connection)",
  () => (
    <div style={{ maxWidth: "63rem" }}>
      <SettingsUI
        autostart={false}
        tethering={false}
        collectingData={false}
        toggleTethering={jest.fn()}
        toggleCollectionData={jest.fn()}
      />
    </div>
  )
)
