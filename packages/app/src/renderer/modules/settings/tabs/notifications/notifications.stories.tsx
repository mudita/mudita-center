/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import NotificationsUI from "Renderer/modules/settings/components/notifications-ui.component"

storiesOf("Settings/Notifications", module).add("Notifications", () => (
  <div style={{ maxWidth: "63rem" }}>
    <NotificationsUI
      appIncomingCalls={false}
      appIncomingMessages={false}
      appLowBattery={false}
      appOsUpdates={false}
    />
  </div>
))
