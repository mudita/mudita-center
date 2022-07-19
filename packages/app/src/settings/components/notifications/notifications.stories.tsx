/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import NotificationsUI from "App/settings/components/notifications/notifications-ui.component"

storiesOf("Settings/Notifications", module).add("Notifications", () => (
  <div style={{ maxWidth: "63rem" }}>
    <NotificationsUI
      incomingCalls={false}
      incomingMessages={false}
      lowBattery={false}
      osUpdates={false}
      setIncomingCalls={jest.fn()}
      setIncomingMessages={jest.fn()}
      setLowBattery={jest.fn()}
      setOsUpdates={jest.fn()}
    />
  </div>
))
