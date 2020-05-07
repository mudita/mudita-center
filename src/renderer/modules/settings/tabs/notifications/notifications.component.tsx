import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

interface Props {
  appIncomingCalls?: boolean
  appIncomingMessages?: boolean
  setIncomingCalls: (option: Record<Option.IncomingCalls, boolean>) => void
  setIncomingMessages: (
    option: Record<Option.IncomingMessages, boolean>
  ) => void
  loadSettings: () => void
}

const Notifications: FunctionComponent<Props> = ({
  appIncomingCalls,
  appIncomingMessages,
  setIncomingCalls,
  setIncomingMessages,
  loadSettings,
}) => {
  useEffect(() => {
    ;(async () => {
      await loadSettings()
    })()
  }, [])
  const [lowBattery, setLowBattery] = useState<boolean>(false)
  const [osUpdates, setOsUpdates] = useState<boolean>(false)
  return (
    <NotificationsUI
      appIncomingCalls={appIncomingCalls}
      setIncomingCalls={setIncomingCalls}
      appIncomingMessages={appIncomingMessages}
      setIncomingMessages={setIncomingMessages}
      lowBattery={lowBattery}
      setLowBattery={setLowBattery}
      osUpdates={osUpdates}
      setOsUpdates={setOsUpdates}
    />
  )
}

export default Notifications
