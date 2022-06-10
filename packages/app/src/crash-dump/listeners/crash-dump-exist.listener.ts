/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "Renderer/store"
import { IpcCrashDumpRenderedEvent } from "App/crash-dump/constants"
import { setCrashDump } from "App/crash-dump/actions"

const setCrashDumpData = (_: any, data: string[]) => {
  if (data && data.length) {
    store.dispatch(setCrashDump(data))
  }
}

export const registerCrashDumpExistListener = (): (() => void) => {
  ipcRenderer.on(IpcCrashDumpRenderedEvent.CrashDumpExists, setCrashDumpData)

  return () => {
    ipcRenderer.off(IpcCrashDumpRenderedEvent.CrashDumpExists, setCrashDumpData)
  }
}
