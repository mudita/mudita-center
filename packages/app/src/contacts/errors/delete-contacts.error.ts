/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactsEvent } from "App/contacts/constants"

export class DeleteContactsError extends Error {
  public type = ContactsEvent.DeleteContacts

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DeleteContactsError)
    }
  }
}
