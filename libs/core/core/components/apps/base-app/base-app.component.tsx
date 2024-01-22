/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import AppInitialization from "Core/app-initialization/components/app-initialization.component"
import { useDeviceConnectedEffect } from "Core/core/hooks/use-device-connected-effect"
import { useApplicationUpdateEffects } from "Core/core/hooks/use-application-update-effects"
import { CrashDump } from "Core/crash-dump"
import NetworkStatusChecker from "Core/__deprecated__/renderer/components/core/network-status-checker/network-status-checker.container"
import ModalsManager from "Core/modals-manager/components/modals-manager.container"
import { useWatchOutboxEntriesEffect } from "Core/core/hooks/use-watch-outbox-entries-effect"
import { useWatchUnlockStatus } from "Core/core/hooks/use-watch-unlock-status-effect"
import { useDeviceLockedEffect } from "Core/core/hooks/use-device-locked-effect"
import { useDeviceDetachedEffect } from "Core/core/hooks/use-device-detached-effect"
import { useAPISerialPortListeners } from "device/feature"
import { useDeviceConnectFailedEffect } from "Core/core/hooks/use-device-connect-failed-effect"
import { useRouterListener } from "Core/core/hooks"
import {
  URL_MAIN,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"

const actions = {
  [URL_MAIN.contacts]: [],
  [URL_MAIN.phone]: [],
  [URL_OVERVIEW.root]: [],
  [URL_MAIN.messages]: [],
}

const BaseApp: FunctionComponent = () => {
  const history = useHistory()
  useRouterListener(history, actions)

  useApplicationUpdateEffects()
  useDeviceConnectedEffect()
  useDeviceConnectFailedEffect()
  useDeviceDetachedEffect()
  useDeviceLockedEffect()
  useWatchOutboxEntriesEffect()
  useWatchUnlockStatus()
  // API
  useAPISerialPortListeners()

  return (
    <>
      <CrashDump />
      <NetworkStatusChecker />
      <ModalsManager />
      <AppInitialization />
    </>
  )
}

export default BaseApp
