/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactService } from "App/contacts/services"
import { ContactRepository } from "App/contacts/repositories"
import { OutboxEntry, OutboxEntryChange, OutboxEntryType } from "@mudita/pure"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { ContactEntryHandlerService } from "App/outbox/services/contact-entry-handler.service"
import { Contact } from "App/contacts/reducers"

jest.mock("App/contacts/repositories")

const successGetContactResponse = {
  status: RequestResponseStatus.Ok,
  data: {} as Contact,
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("ContactEntryHandlerService: handleEntry", () => {
  describe("when Contact Entry has Deleted change", () => {
    let subject: ContactEntryHandlerService
    let contactService: ContactService
    let contactRepository: ContactRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Contact,
      change: OutboxEntryChange.Deleted,
      record_id: 1,
    }

    beforeEach(() => {
      contactRepository = {
        delete: jest.fn(),
      } as unknown as ContactRepository
      contactService = {
        getContact: jest.fn().mockReturnValue(successGetContactResponse),
      } as unknown as ContactService
      subject = new ContactEntryHandlerService(
        contactService,
        contactRepository
      )
    })

    test("`delete` method in contactRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(contactRepository.delete).toHaveBeenCalledWith("1")
    })
  })

  describe("when Contact Entry has Created change", () => {
    let subject: ContactEntryHandlerService
    let contactService: ContactService
    let contactRepository: ContactRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Contact,
      change: OutboxEntryChange.Created,
      record_id: 1,
    }

    beforeEach(() => {
      contactRepository = {
        create: jest.fn(),
      } as unknown as ContactRepository
      contactService = {
        getContact: jest.fn().mockReturnValue(successGetContactResponse),
      } as unknown as ContactService
      subject = new ContactEntryHandlerService(
        contactService,
        contactRepository
      )
    })

    test("`create` method in contactRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(contactRepository.create).toHaveBeenCalled()
    })
  })

  describe("when Contact Entry has Updated change", () => {
    let subject: ContactEntryHandlerService
    let contactService: ContactService
    let contactRepository: ContactRepository
    const entry: OutboxEntry = {
      uid: 1,
      type: OutboxEntryType.Contact,
      change: OutboxEntryChange.Updated,
      record_id: 1,
    }

    beforeEach(() => {
      contactRepository = {
        update: jest.fn(),
      } as unknown as ContactRepository
      contactService = {
        getContact: jest.fn().mockReturnValue(successGetContactResponse),
      } as unknown as ContactService
      subject = new ContactEntryHandlerService(
        contactService,
        contactRepository
      )
    })

    test("`update` method in contactRepository was called", async () => {
      await subject.handleEntry(entry)
      expect(contactRepository.update).toHaveBeenCalled()
    })
  })
})
