/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import NotificationsUI from "App/settings/components/notifications/notifications-ui.component"

export interface NotificationsProps {
  incomingCalls: boolean
  incomingMessages: boolean
  lowBattery: boolean
  osUpdates: boolean
  setIncomingCalls: (option: boolean) => void
  setIncomingMessages: (option: boolean) => void
  setLowBattery: (option: boolean) => void
  setOsUpdates: (option: boolean) => void
  loadSettings: () => void
}

export const Notifications: FunctionComponent<NotificationsProps> = ({
  incomingCalls,
  incomingMessages,
  lowBattery,
  osUpdates,
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
