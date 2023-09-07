/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Event } from "electron"
import { ipcRenderer } from "electron-better-ipc"
import { DeviceIpcEvent } from "App/device/constants/device-ipc-event.constant"

export const registerAgreementStatusListener = (
  listener: (event: Event, status: boolean) => void
): void => {
  ipcRenderer.on(DeviceIpcEvent.DeviceOnboardingStatus, listener)
}

export const removeAgreementStatusListener = (
  listener: (event: Event, status: boolean) => void
): void => {
  ipcRenderer.removeListener(DeviceIpcEvent.DeviceOnboardingStatus, listener)
}
