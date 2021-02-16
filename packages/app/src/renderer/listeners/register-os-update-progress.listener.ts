/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

export type OsUpdateProgressListener = (
  event: any,
  props: { progress: number }
) => void

const registerOsUpdateProgressListener = (
  listener: OsUpdateProgressListener
): void => {
  ipcRenderer.on(IpcEmitter.OsUpdateProgress, listener)
}

export const removeOsUpdateProgressListener = (
  listener: OsUpdateProgressListener
): void => {
  ipcRenderer.removeListener(IpcEmitter.OsUpdateProgress, listener)
}

export default registerOsUpdateProgressListener
