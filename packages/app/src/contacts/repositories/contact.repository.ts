/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { ContactModel } from "App/contacts/models"
import { Contact as PureContact } from "@mudita/pure"
import { ContactPresenter } from "App/contacts/presenters/contact.presenter"

export class ContactRepository implements Repository{
  private contactPresenter = new ContactPresenter()
  constructor(private contactModel: ContactModel) {
  }

  public create(pureContact: PureContact): void {
    const contact = this.contactPresenter.serialize(pureContact)
    this.contactModel.create(contact)
  }

  public update(pureContact: PureContact): void {
    const contact = this.contactPresenter.serialize(pureContact)
    this.contactModel.update(contact)
  }

  public delete(id: string | number): void {
    this.contactModel.delete(String(id))
  }
}
