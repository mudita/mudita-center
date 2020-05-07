import { storiesOf } from "@storybook/react"
import React from "react"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"

storiesOf("Settings|Notifications", module).add("Notifications", () => (
  <div style={{ maxWidth: "63rem" }}>
    <NotificationsUI
      appIncomingCalls={false}
      appIncomingMessages={false}
      appLowBattery={false}
      osUpdates={false}
    />
  </div>
))
