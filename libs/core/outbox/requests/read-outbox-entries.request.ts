/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcOutboxEvent } from "Core/outbox/constants/controller.constant"
import { EntryChangesEvent } from "Core/outbox/services"

export const readOutboxEntriesRequest = (): Promise<
  EntryChangesEvent[] | undefined
> => {
  return ipcRenderer.callMain(IpcOutboxEvent.ReadOutboxEntries)
}
