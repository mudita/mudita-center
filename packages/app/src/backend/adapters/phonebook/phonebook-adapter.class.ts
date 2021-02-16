/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import {
  Contact,
  ContactID,
  NewContact,
} from "App/contacts/store/contacts.type"

export default abstract class PhonebookAdapter {
  public abstract getContacts(): Promise<DeviceResponse<Contact[]>>
  public abstract addContact(
    contact: NewContact
  ): Promise<DeviceResponse<Contact>>
  public abstract editContact(
    contact: Contact
  ): Promise<DeviceResponse<Contact>>
  public abstract deleteContacts(
    contactIds: ContactID[]
  ): Promise<DeviceResponse<ContactID[]>>
}
