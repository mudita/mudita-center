/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ContactService } from "Core/contacts/services"
import { RequestResponse } from "Core/core/types/request-response.interface"
import { IpcContactEvent } from "Core/contacts/constants"
import { Contact, ContactID } from "Core/contacts/reducers"
import { DeviceId } from "Core/device/constants/device-id"

export class ContactController {
  constructor(private contactService: ContactService) {}

  @IpcEvent(IpcContactEvent.GetContacts)
  public getContacts(deviceId: DeviceId): Promise<RequestResponse<Contact[]>> {
    return this.contactService.getContacts(deviceId)
  }

  @IpcEvent(IpcContactEvent.CreateContact)
  public createContact(contact: Contact): Promise<RequestResponse<Contact>> {
    return this.contactService.createContact(contact)
  }

  @IpcEvent(IpcContactEvent.EditContact)
  public editContact(contact: Contact): Promise<RequestResponse<Contact>> {
    return this.contactService.editContact(contact)
  }

  @IpcEvent(IpcContactEvent.DeleteContacts)
  public deleteContacts(
    contactIds: ContactID[]
  ): Promise<RequestResponse<ContactID[]>> {
    return this.contactService.deleteContacts(contactIds)
  }
}
