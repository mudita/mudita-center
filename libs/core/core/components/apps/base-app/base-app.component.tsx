/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import AppInitialization from "Core/app-initialization/components/app-initialization.component"
import { useApplicationUpdateEffects } from "Core/core/hooks/use-application-update-effects"
import { CrashDump } from "Core/crash-dump"
import ModalsManager from "Core/modals-manager/components/modals-manager.component"
import { useWatchOutboxEntriesEffect } from "Core/core/hooks/use-watch-outbox-entries-effect"
import { useWatchUnlockStatus } from "Core/core/hooks/use-watch-unlock-status-effect"
import { useDeviceLockedEffect } from "Core/core/hooks/use-device-locked-effect"
import { useDiscoveryRedirectEffect } from "Core/core/hooks/use-discovery-redirect-effect"
import { useRouterListener } from "Core/core/hooks"
import {
  OutboxWrapper,
  useAppEventsListeners,
  useBackupList,
} from "generic-view/store"
import { useFileDialogEventListener, useOnlineListener } from "shared/app-state"
import { useCoreDeviceProtocolListeners } from "core-device/feature"
import { useHelp } from "help/store"
import {
  useDeviceManagerConnected,
  useDeviceManagerConnectFailed,
  useDeviceManagerDetached,
} from "device-manager/feature"
import { useModalClosedListener } from "Core/__deprecated__/renderer/components/core/modal/use-modal-closed-listener"

const BaseApp: FunctionComponent = () => {
  useRouterListener()
  useOnlineListener()
  useApplicationUpdateEffects()
  useDeviceLockedEffect()
  useWatchOutboxEntriesEffect()
  useWatchUnlockStatus()
  useDiscoveryRedirectEffect()
  useCoreDeviceProtocolListeners()
  useModalClosedListener()
  // API
  useAppEventsListeners()
  useBackupList()
  useFileDialogEventListener()
  useHelp()

  // MDS
  useDeviceManagerConnected()
  useDeviceManagerConnectFailed()
  useDeviceManagerDetached()

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
