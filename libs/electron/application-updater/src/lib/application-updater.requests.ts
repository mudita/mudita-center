/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcApplicationUpdaterEvent } from "./ipc-application-updater.event"

export const downloadAppUpdateRequest = (): Promise<void> =>
  ipcRenderer.callMain(IpcApplicationUpdaterEvent.Download)

export const checkAppUpdateRequest = (): Promise<void> =>
  ipcRenderer.callMain(IpcApplicationUpdaterEvent.Check)

export const installAppUpdateRequest = (): Promise<void> =>
  ipcRenderer.callMain(IpcApplicationUpdaterEvent.Install)
