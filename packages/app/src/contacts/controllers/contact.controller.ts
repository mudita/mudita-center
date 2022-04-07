/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ControllerPrefix, IpcContactEvent } from "App/contacts/constants"
import { ContactService } from "App/contacts/services/contact.service"
import { Contact, ContactID } from "App/contacts/reducers"
import { RequestResponse } from "App/core/types/request-response.interface"

@Controller(ControllerPrefix)
export class ContactController {
  constructor(private contactService: ContactService) {}

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
