import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

interface Props {
  appIncomingCalls?: boolean
  appIncomingMessages?: boolean
  appLowBattery?: boolean
  setIncomingCalls: (option: Record<Option.IncomingCalls, boolean>) => void
  setIncomingMessages: (
    option: Record<Option.IncomingMessages, boolean>
  ) => void
  setLowBattery: (option: Record<Option.LowBattery, boolean>) => void
  loadSettings: () => void
}

const Notifications: FunctionComponent<Props> = ({
  appIncomingCalls,
  appIncomingMessages,
  appLowBattery,
  setIncomingCalls,
  setIncomingMessages,
  setLowBattery,
  loadSettings,
}) => {
  useEffect(() => {
    ;(async () => {
      await loadSettings()
    })()
  }, [])
  const [osUpdates, setOsUpdates] = useState<boolean>(false)
  return (
    <NotificationsUI
      appIncomingCalls={appIncomingCalls}
      setIncomingCalls={setIncomingCalls}
      appIncomingMessages={appIncomingMessages}
      setIncomingMessages={setIncomingMessages}
      appLowBattery={appLowBattery}
      setLowBattery={setLowBattery}
      osUpdates={osUpdates}
      setOsUpdates={setOsUpdates}
    />
  )
}

export default Notifications
