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
import { ContactRepository } from "App/contacts/repositories"
import { ContactService } from "App/contacts/services"
import { Contact } from "App/contacts/reducers"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("Backend/device-service")
jest.mock("App/contacts/repositories")
beforeEach(() => {
  jest.resetAllMocks()
})

const successGetContactResponse = {
  status: RequestResponseStatus.Ok,
  data: {} as Contact,
}

describe("`OutboxService`", () => {
  describe("when Get Outbox Entries returns Contact Deleted Entry", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactService: ContactService
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
          status: RequestResponseStatus.Ok,
          data: { entries },
        }),
      } as unknown as DeviceService
      contactRepository = {
        delete: jest.fn(),
      } as unknown as ContactRepository
      contactService = {
        getContact: jest.fn().mockReturnValue(successGetContactResponse),
      } as unknown as ContactService
      subject = new OutboxService(
        deviceService,
        contactService,
        contactRepository
      )
    })

    test("`delete` method in contactRepository was called", async () => {
      await subject.readOutboxEntries()
      expect(contactRepository.delete).toHaveBeenCalledWith("1")
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
  })

  describe("when Get Outbox Entries returns Contact Created Entry", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactService: ContactService
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
          status: RequestResponseStatus.Ok,
          data: { entries },
        }),
      } as unknown as DeviceService
      contactRepository = {
        create: jest.fn(),
      } as unknown as ContactRepository
      contactService = {
        getContact: jest.fn().mockReturnValue(successGetContactResponse),
      } as unknown as ContactService
      subject = new OutboxService(
        deviceService,
        contactService,
        contactRepository
      )
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
  })

  describe("when Get Outbox Entries returns Contact Updated Entry", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactService: ContactService
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
          status: RequestResponseStatus.Ok,
          data: { entries },
        }),
      } as unknown as DeviceService
      contactRepository = {
        update: jest.fn(),
      } as unknown as ContactRepository
      contactService = {
        getContact: jest.fn().mockReturnValue(successGetContactResponse),
      } as unknown as ContactService
      subject = new OutboxService(
        deviceService,
        contactService,
        contactRepository
      )
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
  })

  describe("when Get Outbox Entries returns Entries with empty list", () => {
    let subject: OutboxService
    let deviceService: DeviceService
    let contactService: ContactService
    let contactRepository: ContactRepository
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: RequestResponseStatus.Ok,
          data: { entries: [] },
        }),
      } as unknown as DeviceService
      contactRepository = {} as unknown as ContactRepository
      contactService = {} as unknown as ContactService
      subject = new OutboxService(
        deviceService,
        contactService,
        contactRepository
      )
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
    let contactService: ContactService
    let contactRepository: ContactRepository
    beforeEach(() => {
      deviceService = {
        request: jest.fn().mockReturnValue({
          status: RequestResponseStatus.Error,
        }),
      } as unknown as DeviceService
      contactRepository = {} as unknown as ContactRepository
      contactService = {} as unknown as ContactService
      subject = new OutboxService(
        deviceService,
        contactService,
        contactRepository
      )
    })

    test("`DataLoaded` isn't emits", async () => {
      await subject.readOutboxEntries()
      expect((ipcMain as any).sendToRenderers).not.toHaveBeenCalledWith(
        IpcEvent.DataLoaded
      )
    })
  })
})
