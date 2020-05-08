import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"

const Notifications: FunctionComponent = () => {
  const [incomingCalls, setIncomingCalls] = useState<boolean>(false)
  const [incomingMessages, setIncomingMessages] = useState<boolean>(false)
  const [lowBattery, setLowBattery] = useState<boolean>(false)
  const [osUpdates, setOsUpdates] = useState<boolean>(false)
  return (
    <NotificationsUI
      incomingCalls={incomingCalls}
      setIncomingCalls={setIncomingCalls}
      incomingMessages={incomingMessages}
      setIncomingMessages={setIncomingMessages}
      lowBattery={lowBattery}
      setLowBattery={setLowBattery}
      osUpdates={osUpdates}
      setOsUpdates={setOsUpdates}
    />
  )
}

export default Notifications
