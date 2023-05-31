/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OutboxEntry } from "App/device/types/mudita-os"
import { OutboxEntryChange } from "App/device/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { ContactService } from "App/contacts/services"
import { ContactRepository } from "App/contacts/repositories"
import { EntryHandler } from "App/outbox/services/entry-handler.type"
import { Contact } from "App/contacts/dto"
import { PhoneNumberService } from "App/messages/services"
import { PhoneNumberRepository } from "App/phone-numbers/repositories"

export class ContactEntryHandlerService implements EntryHandler<Contact> {
  constructor(
    private contactService: ContactService,
    private contactRepository: ContactRepository,
    private phoneNumberService: PhoneNumberService,
    private phoneNumberRepository: PhoneNumberRepository
  ) {}

  public handleEntry = async (
    entry: OutboxEntry
  ): Promise<Contact | undefined> => {
    const id = String(entry.record_id)

    if (entry.change === OutboxEntryChange.Deleted) {
      const contact = this.contactRepository.get(id)

      if (contact) {
        this.deletePhoneNumber(contact.primaryPhoneNumberId)
        this.deletePhoneNumber(contact.secondaryPhoneNumberId)
      }

      this.contactRepository.delete(id)
      return
    }

    const { status, data } = await this.contactService.getContact(id)

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return
    }

    if (entry.change === OutboxEntryChange.Created) {
      this.addPhoneNumber(data.primaryPhoneNumber)
      this.addPhoneNumber(data.secondaryPhoneNumberId)
      return this.contactRepository.create(data)
    }

    if (entry.change === OutboxEntryChange.Updated) {
      this.updatePhoneNumber(data.primaryPhoneNumber)
      this.updatePhoneNumber(data.secondaryPhoneNumberId)
      return this.contactRepository.update(data)
    }

    return
  }

  //REFACTOR CP-1873 - move it to phoneNumber repository or service?
  private addPhoneNumber = async (phoneNumberId?: string) => {
    if (phoneNumberId) {
      const response = await this.phoneNumberService.getPhoneNumber(
        phoneNumberId
      )
      if (response?.status === RequestResponseStatus.Ok && response.data) {
        this.phoneNumberRepository.create(response.data)
      }
    }
  }

  private updatePhoneNumber = async (phoneNumberId?: string) => {
    if (phoneNumberId) {
      const response = await this.phoneNumberService.getPhoneNumber(
        phoneNumberId
      )
      if (response?.status === RequestResponseStatus.Ok && response.data) {
        this.phoneNumberRepository.update(response.data)
      }
    }
  }

  private deletePhoneNumber = async (phoneNumberId?: string) => {
    if (phoneNumberId) {
      this.phoneNumberRepository.delete(phoneNumberId)
    }
  }
}
