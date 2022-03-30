/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ControllerPrefix, IpcContactEvent } from "App/contacts/constants"
import { ContactService } from "App/contacts/services/contact.service"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { Contact, ContactID } from "App/contacts/reducers"

@Controller(ControllerPrefix)
export class ContactController {
  constructor(private contactService: ContactService) {}

  @IpcEvent(IpcContactEvent.GetContacts)
  public getContacts(): Promise<DeviceResponse<Contact[]>> {
    return this.contactService.getContacts()
  }

  @IpcEvent(IpcContactEvent.AddContact)
  public addContact(contact: Contact): Promise<DeviceResponse<Contact>> {
    return this.contactService.addContact(contact)
  }

  @IpcEvent(IpcContactEvent.EditContact)
  public editContact(contact: Contact): Promise<DeviceResponse<Contact>> {
    return this.contactService.editContact(contact)
  }

  @IpcEvent(IpcContactEvent.DeleteContacts)
  public deleteContacts(
    contactIds: ContactID[]
  ): Promise<DeviceResponse<ContactID[]>> {
    return this.contactService.deleteContacts(contactIds)
  }
}
