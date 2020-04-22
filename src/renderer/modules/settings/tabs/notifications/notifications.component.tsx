import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  ToggleState,
  twoStateToggler,
} from "Renderer/modules/settings/settings.component"
import NotificationsUI from "Renderer/modules/settings/tabs/notifications/notifications-ui.component"

const Notifications: FunctionComponent = () => {
  const [incomingCallsNotifications, setIncomingCallsNotifications] = useState<
    ToggleState
  >(ToggleState.Off)
  const [
    incomingMessagesNotifications,
    setIncomingMessagesNotifications,
  ] = useState<ToggleState>(ToggleState.Off)
  const [lowBatteryNotifications, setLowBatteryNotifications] = useState<
    ToggleState
  >(ToggleState.Off)
  const [pureOsUpdatesNotifications, setPureOsUpdatesNotifications] = useState<
    ToggleState
  >(ToggleState.Off)
  return (
    <NotificationsUI
      incomingCallsNotifications={incomingCallsNotifications}
      incomingMessagesNotifications={incomingMessagesNotifications}
      lowBatteryNotifications={lowBatteryNotifications}
      pureOsUpdatesNotifications={pureOsUpdatesNotifications}
      setIncomingCallsNotifications={setIncomingCallsNotifications}
      setIncomingMessagesNotifications={setIncomingMessagesNotifications}
      setLowBatteryNotifications={setLowBatteryNotifications}
      setPureOsUpdatesNotifications={setPureOsUpdatesNotifications}
      togglerState={twoStateToggler}
    />
  )
}

export default Notifications
