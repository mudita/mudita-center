import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"

interface Props {
  incomingCalls?: boolean
  loadSettings: () => void
}

const Notifications: FunctionComponent<Props> = ({
  incomingCalls,
  loadSettings,
}) => {
  useEffect(() => {
    ;(async () => {
      await loadSettings()
    })()
  }, [])
  console.log(incomingCalls)
  // const [incomingCalls, setIncomingCalls] = useState<boolean>(false)
  const [incomingMessages, setIncomingMessages] = useState<boolean>(false)
  const [lowBattery, setLowBattery] = useState<boolean>(false)
  const [osUpdates, setOsUpdates] = useState<boolean>(false)
  return (
    <NotificationsUI
      incomingCalls={incomingCalls}
      // setIncomingCalls={setIncomingCalls}
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
