import React from "react"
import NotificationsUI from "App/settings/components/notifications/notifications-ui.component"

export default {
  title: "Settings/Notifications",
}

export const Notifications = () => (
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
)
