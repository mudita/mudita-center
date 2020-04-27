import { storiesOf } from "@storybook/react"
import React from "react"
import Notifications from "Renderer/modules/settings/tabs/notifications/notifications.component"

storiesOf("Settings|Notifications", module).add("Notifications", () => (
  <div style={{ maxWidth: "63rem" }}>
    <Notifications />
  </div>
))
