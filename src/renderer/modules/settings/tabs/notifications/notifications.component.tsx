import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

const Notifications: FunctionComponent = () => {
  const [incomingCalls, setIncomingCalls] = useState<ToggleState>(
    ToggleState.Off
  )
  const [incomingMessages, setIncomingMessages] = useState<ToggleState>(
    ToggleState.Off
  )
  const [lowBattery, setLowBattery] = useState<ToggleState>(ToggleState.Off)
  const [osUpdates, setOsUpdates] = useState<ToggleState>(ToggleState.Off)
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
