import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

interface Props {
  appIncomingCalls?: boolean
  setIncomingCalls: (option: Record<Option.IncomingCalls, boolean>) => void
  loadSettings: () => void
}

const Notifications: FunctionComponent<Props> = ({
  appIncomingCalls,
  setIncomingCalls,
  loadSettings,
}) => {
  useEffect(() => {
    ;(async () => {
      await loadSettings()
    })()
  }, [])
  const [incomingMessages, setIncomingMessages] = useState<boolean>(false)
  const [lowBattery, setLowBattery] = useState<boolean>(false)
  const [osUpdates, setOsUpdates] = useState<boolean>(false)
  return (
    <NotificationsUI
      appIncomingCalls={appIncomingCalls}
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
