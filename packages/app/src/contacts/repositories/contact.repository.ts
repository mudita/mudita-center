/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { ContactModel } from "App/contacts/models"

export class ContactRepository implements Repository{
  constructor(private contactModel: ContactModel) {
  }

  public create(data: any): void {
    return
  }

  public update(data: any): void {
    return
  }

  public delete(id: string | number): void {
    return this.contactModel.delete(String(id))
  }
}
