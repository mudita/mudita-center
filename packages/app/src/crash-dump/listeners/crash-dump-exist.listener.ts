/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { IpcCrashDumpRenderedEvent } from "App/crash-dump/constants"
import { setCrashDump } from "App/crash-dump/actions"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setCrashDumpData = (_: any, data: string[]) => {
  if (data && data.length) {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    store.dispatch(setCrashDump(data))
  }
}

export const registerCrashDumpExistListener = (): (() => void) => {
  ipcRenderer.on(IpcCrashDumpRenderedEvent.CrashDumpExists, setCrashDumpData)

  return () => {
    ipcRenderer.off(IpcCrashDumpRenderedEvent.CrashDumpExists, setCrashDumpData)
  }
}
