import React, { useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"

export interface NotificationsProps {
  appIncomingCalls?: boolean
  appIncomingMessages?: boolean
  appLowBattery?: boolean
  appOsUpdates?: boolean
  setIncomingCalls: (option: boolean) => void
  setIncomingMessages: (option: boolean) => void
  setLowBattery: (option: boolean) => void
  setOsUpdates: (option: boolean) => void
  loadSettings: () => void
}

const Notifications: FunctionComponent<NotificationsProps> = ({
  appIncomingCalls,
  appIncomingMessages,
  appLowBattery,
  appOsUpdates,
  setIncomingCalls,
  setIncomingMessages,
  setLowBattery,
  setOsUpdates,
  loadSettings,
}) => {
  useEffect(() => {
    loadSettings()
  }, [])
  return (
    <NotificationsUI
      appIncomingCalls={appIncomingCalls}
      setIncomingCalls={setIncomingCalls}
      appIncomingMessages={appIncomingMessages}
      setIncomingMessages={setIncomingMessages}
      appLowBattery={appLowBattery}
      setLowBattery={setLowBattery}
      appOsUpdates={appOsUpdates}
      setOsUpdates={setOsUpdates}
    />
  )
}

export default Notifications
