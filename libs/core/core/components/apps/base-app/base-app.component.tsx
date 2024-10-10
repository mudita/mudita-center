/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import AppInitialization from "Core/app-initialization/components/app-initialization.component"
import { useDeviceConnectedEffect } from "Core/core/hooks/use-device-connected-effect"
import { useApplicationUpdateEffects } from "Core/core/hooks/use-application-update-effects"
import { CrashDump } from "Core/crash-dump"
import ModalsManager from "Core/modals-manager/components/modals-manager.component"
import { useWatchOutboxEntriesEffect } from "Core/core/hooks/use-watch-outbox-entries-effect"
import { useWatchUnlockStatus } from "Core/core/hooks/use-watch-unlock-status-effect"
import { useDeviceLockedEffect } from "Core/core/hooks/use-device-locked-effect"
import { useDeviceDetachedEffect } from "Core/core/hooks/use-device-detached-effect"
import { useDeviceConnectFailedEffect } from "Core/core/hooks/use-device-connect-failed-effect"
import { useDiscoveryRedirectEffect } from "Core/core/hooks/use-discovery-redirect-effect"
import { useAbortFlashingOnDeviceDetached } from "Core/core/hooks/use-abort-flashing-on-device-detached"
import { useRouterListener } from "Core/core/hooks"
import {
  OutboxWrapper,
  useAPISerialPortListeners,
  useAppEventsListeners,
  useBackupList,
} from "generic-view/store"
import { useFileDialogEventListener, useOnlineListener } from "shared/app-state"
import { useCoreDeviceProtocolListeners } from "core-device/feature"
import { useHelp } from "help/store"

const BaseApp: FunctionComponent = () => {
  useRouterListener()
  useOnlineListener()
  useApplicationUpdateEffects()
  useDeviceConnectedEffect()
  useDeviceConnectFailedEffect()
  useDeviceDetachedEffect()
  useDeviceLockedEffect()
  useWatchOutboxEntriesEffect()
  useWatchUnlockStatus()
  useDiscoveryRedirectEffect()
  useCoreDeviceProtocolListeners()
  // API
  useAPISerialPortListeners()
  useAppEventsListeners()
  useBackupList()
  useFileDialogEventListener()
  useHelp()

  // MSC
  useAbortFlashingOnDeviceDetached()

  return (
    <>
      <OutboxWrapper />
      <CrashDump />
      <ModalsManager />
      <AppInitialization />
    </>
  )
}

export default BaseApp
