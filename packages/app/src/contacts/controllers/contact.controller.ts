/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ContactService } from "App/contacts/services"
import { RequestResponse } from "App/core/types/request-response.interface"
import { ControllerPrefix, IpcContactEvent } from "App/contacts/constants"
import { Contact, ContactID } from "App/contacts/reducers"
import { SearchContactsService } from "App/contacts/services/search-contacts.service"

@Controller(ControllerPrefix)
export class ContactController {
  constructor(
    private contactService: ContactService,
    private searchContactsService: SearchContactsService
  ) {}

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

  @IpcEvent(IpcContactEvent.SearchContacts)
  public searchContacts(query: string): Contact[] {
    return this.searchContactsService.searchContacts(query)
  }
}
