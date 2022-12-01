/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import {
  EntryHandlersMapType,
  OutboxService,
} from "App/outbox/services/outbox.service"
import DeviceService from "App/__deprecated__/backend/device-service"
import { IpcEvent } from "App/data-sync/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { OutboxEntry } from "App/device/types/mudita-os"
import {
  OutboxEntryChange,
  OutboxEntryType,
  Endpoint,
  Method,
} from "App/device/constants"

jest.mock("App/__deprecated__/backend/device-service")

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`OutboxService`", () => {
  describe("when Get Outbox Entries returns Contact Entry", () => {
    let subject: OutboxService
    let entryHandlersMap: EntryHandlersMapType
    let deviceService: DeviceService
    const entries: OutboxEntry[] = [
      {
        uid: 1,
        type: OutboxEntryType.Contact,
        change: OutboxEntryChange.Deleted,
        record_id: 1,
      },
    ]

    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: RequestResponseStatus.Ok,
          data: { entries },
        }),
      } as unknown as DeviceService
      entryHandlersMap = {
        [OutboxEntryType.Contact]: {
          handleEntry: jest.fn(),
        },
      } as unknown as EntryHandlersMapType
      subject = new OutboxService(deviceService, entryHandlersMap)
    })

    test("`DataLoaded` isn't emits", async () => {
      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })

    test("outbox `delete` request was called", async () => {
      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceService.request).toHaveBeenCalledWith({
        endpoint: Endpoint.Outbox,
        method: Method.Delete,
        body: {
          entries: [1],
        },
      })
    })

    test("contact handler was called", async () => {
      await subject.readOutboxEntries()
      expect(
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        entryHandlersMap[OutboxEntryType.Contact].handleEntry
      ).toHaveBeenCalledWith(entries[0])
    })
  })

  describe("when Get Outbox Entries returns Entries with empty list", () => {
    let subject: OutboxService
    let entryHandlersMap: EntryHandlersMapType
    let deviceService: DeviceService
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: RequestResponseStatus.Ok,
          data: { entries: [] },
        }),
      } as unknown as DeviceService
      subject = new OutboxService(deviceService, entryHandlersMap)
    })

    test("`DataLoaded` isn't emits", async () => {
      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })

  describe("when Get Outbox Entries returns error", () => {
    let subject: OutboxService
    let entryHandlersMap: EntryHandlersMapType
    let deviceService: DeviceService
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: RequestResponseStatus.Error,
          data: { entries: [] },
        }),
      } as unknown as DeviceService
      subject = new OutboxService(deviceService, entryHandlersMap)
    })

    test("`DataLoaded` isn't emits", async () => {
      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })
})
