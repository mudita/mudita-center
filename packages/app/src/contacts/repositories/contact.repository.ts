/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { ContactModel } from "App/contacts/models"
import { Contact } from "App/contacts/reducers"
import { Contact as ContactDto } from "App/contacts/dto"

export class ContactRepository implements Repository {
  constructor(private contactModel: ContactModel) {}

  public findById(id: string): ContactDto | undefined {
    return this.contactModel.findById(id)
  }

  public create(
    contact: Contact,
    skipCallbacks = false
  ): ContactDto | undefined {
    return this.contactModel.create(contact, skipCallbacks)
  }

  public update(
    contact: Contact,
    skipCallbacks = false
  ): ContactDto | undefined {
    return this.contactModel.update(contact, skipCallbacks)
  }

  public delete(id: Contact["id"], skipCallbacks = false): void {
    this.contactModel.delete(id, skipCallbacks)
  }
}
