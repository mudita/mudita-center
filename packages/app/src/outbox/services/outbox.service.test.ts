/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entry, EntryChange, EntryType } from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import { OutboxService } from "App/outbox/services/outbox.service"
import DeviceService from "Backend/device-service"
import { IpcEvent } from "App/data-sync/constants"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

const entries: Entry[] = [
  {
    uid: 1,
    type: EntryType.Contact,
    change: EntryChange.Deleted,
    record_id: 1,
  },
]

jest.mock("Backend/device-service")

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`OutboxService`", () => {
  describe("when Get Outbox Entries returns Entries", () => {
    let deviceService: DeviceService
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: DeviceResponseStatus.Ok,
          data: { entries },
        }),
      } as unknown as DeviceService
    })

    test("`DataLoaded` is emits", async () => {
      const subject = new OutboxService(deviceService, ipcMain)
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })

  describe("when Get Outbox Entries returns Entries with empty list", () => {
    let deviceService: DeviceService
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: DeviceResponseStatus.Ok,
          data: { entries: [] },
        }),
      } as unknown as DeviceService
    })

    test("`DataLoaded` isn't emits", async () => {
      const subject = new OutboxService(deviceService, ipcMain)
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })

  describe("when Get Outbox Entries returns error", () => {
    let deviceService: DeviceService
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: DeviceResponseStatus.Error
        }),
      } as unknown as DeviceService
    })

    test("`DataLoaded` isn't emits", async () => {
      const subject = new OutboxService(deviceService, ipcMain)
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })
})
