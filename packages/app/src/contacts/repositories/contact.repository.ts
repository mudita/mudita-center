/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { ContactModel } from "App/contacts/models"
import { Contact } from "App/contacts/reducers"

export class ContactRepository implements Repository {
  constructor(private contactModel: ContactModel) {}

  public create(contact: Contact, skipCallbacks = false): void {
    this.contactModel.create(contact, skipCallbacks)
  }

  public update(contact: Contact, skipCallbacks = false): void {
    this.contactModel.update(contact, skipCallbacks)
  }

  public delete(id: Contact["id"], skipCallbacks = false): void {
    this.contactModel.delete(id, skipCallbacks)
  }
}
