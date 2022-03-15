/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  OutboxEntry,
  OutboxEntryChange,
  OutboxEntryType,
  Method,
} from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import { OutboxService } from "App/outbox/services/outbox.service"
import DeviceService from "Backend/device-service"
import { IpcEvent } from "App/data-sync/constants"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { ContactRepository } from "App/data-sync/repositories"

jest.mock("Backend/device-service")
jest.mock("App/data-sync/repositories")
beforeEach(() => {
  jest.resetAllMocks()
})

describe("`OutboxService`", () => {
  describe("when Get Outbox Entries returns Contact Deleted Entry", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactRepository: ContactRepository
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
          status: DeviceResponseStatus.Ok,
          data: { entries },
        }),
      } as unknown as DeviceService
      contactRepository = {
        delete: jest.fn(),
      } as unknown as ContactRepository
      subject = new OutboxService(ipcMain, deviceService, contactRepository)
    })

    test("`delete` method in contactRepository was called", async () => {
      await subject.readOutboxEntries()
      expect(contactRepository.delete).toHaveBeenCalledWith(1)
    })

    test("outbox `delete` request was called", async () => {
      await subject.readOutboxEntries()
      expect(deviceService.request).toHaveBeenCalledWith({
        endpoint: Endpoint.Outbox,
        method: Method.Delete,
        body: {
          entries: [1],
        },
      })
    })

    test("`DataLoaded` is emits", async () => {
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })

  describe("when Get Outbox Entries returns Contact Created Entry", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactRepository: ContactRepository
    const entries: OutboxEntry[] = [
      {
        uid: 1,
        type: OutboxEntryType.Contact,
        change: OutboxEntryChange.Created,
        record_id: 1,
      },
    ]

    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: DeviceResponseStatus.Ok,
          data: { entries },
        }),
      } as unknown as DeviceService
      contactRepository = {
        create: jest.fn(),
      } as unknown as ContactRepository
      subject = new OutboxService(ipcMain, deviceService, contactRepository)
    })

    test("`create` method in contactRepository was called", async () => {
      await subject.readOutboxEntries()
      expect(contactRepository.create).toHaveBeenCalled()
    })

    test("outbox `delete` request was called", async () => {
      await subject.readOutboxEntries()
      expect(deviceService.request).toHaveBeenCalledWith({
        endpoint: Endpoint.Outbox,
        method: Method.Delete,
        body: {
          entries: [1],
        },
      })
    })

    test("`DataLoaded` is emits", async () => {
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })

  describe("when Get Outbox Entries returns Contact Updated Entry", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactRepository: ContactRepository
    const entries: OutboxEntry[] = [
      {
        uid: 1,
        type: OutboxEntryType.Contact,
        change: OutboxEntryChange.Updated,
        record_id: 1,
      },
    ]

    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: DeviceResponseStatus.Ok,
          data: { entries },
        }),
      } as unknown as DeviceService
      contactRepository = {
        update: jest.fn(),
      } as unknown as ContactRepository
      subject = new OutboxService(ipcMain, deviceService, contactRepository)
    })

    test("`update` method in contactRepository was called", async () => {
      await subject.readOutboxEntries()
      expect(contactRepository.update).toHaveBeenCalled()
    })

    test("outbox `delete` request was called", async () => {
      await subject.readOutboxEntries()
      expect(deviceService.request).toHaveBeenCalledWith({
        endpoint: Endpoint.Outbox,
        method: Method.Delete,
        body: {
          entries: [1],
        },
      })
    })

    test("`DataLoaded` is emits", async () => {
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })

  describe("when Get Outbox Entries returns Entries with empty list", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactRepository: ContactRepository
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: DeviceResponseStatus.Ok,
          data: { entries: [] },
        }),
      } as unknown as DeviceService
      contactRepository = {} as unknown as ContactRepository
      subject = new OutboxService(ipcMain, deviceService, contactRepository)
    })

    test("`DataLoaded` isn't emits", async () => {
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })

  describe("when Get Outbox Entries returns error", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactRepository: ContactRepository
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: DeviceResponseStatus.Error,
        }),
      } as unknown as DeviceService
      contactRepository = {} as unknown as ContactRepository
      subject = new OutboxService(ipcMain, deviceService, contactRepository)
    })

    test("`DataLoaded` isn't emits", async () => {
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })
})
