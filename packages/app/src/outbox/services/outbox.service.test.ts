/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import {
  EntryHandlersMapType,
  OutboxService,
} from "App/outbox/services/outbox.service"
import { DeviceManager } from "App/device-manager/services"
import { IpcEvent } from "App/data-sync/constants"
import { OutboxEntry } from "App/device/types/mudita-os"
import {
  DeviceCommunicationError,
  OutboxEntryChange,
  OutboxEntryType,
  Endpoint,
  Method,
} from "App/device/constants"

const deviceManager = {
  device: {
    request: jest.fn().mockResolvedValue(Result.success({ entries: [] })),
  },
} as unknown as DeviceManager
const entryHandlersMap = {
  [OutboxEntryType.Contact]: {
    handleEntry: jest.fn(),
  },
} as unknown as EntryHandlersMapType
const subject = new OutboxService(deviceManager, entryHandlersMap)

const entriesMock: OutboxEntry[] = [
  {
    uid: 1,
    type: OutboxEntryType.Contact,
    change: OutboxEntryChange.Deleted,
    record_id: 1,
  },
]

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`OutboxService`", () => {
  describe("when Get Outbox Entries returns Contact Entry", () => {
    test("`DataLoaded` isn't emits", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(Result.success({ entries: entriesMock }))

      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })

    test("outbox `delete` request was called", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(Result.success({ entries: entriesMock }))

      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceManager.device.request).toHaveBeenCalledWith({
        endpoint: Endpoint.Outbox,
        method: Method.Delete,
        body: {
          entries: [1],
        },
      })
    })

    test("contact handler was called", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(Result.success({ entries: entriesMock }))

      await subject.readOutboxEntries()
      expect(
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        entryHandlersMap[OutboxEntryType.Contact].handleEntry
      ).toHaveBeenCalledWith(entriesMock[0])
    })
  })

  describe("when Get Outbox Entries returns Entries with empty list", () => {
    test("`DataLoaded` isn't emits", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(Result.success({ entries: [] }))

      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })

  describe("when Get Outbox Entries returns error", () => {
    test("`DataLoaded` isn't emits", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(
          Result.failed(
            new AppError(DeviceCommunicationError.RequestFailed, "", {
              entries: [],
            })
          )
        )

      await subject.readOutboxEntries()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })
})
