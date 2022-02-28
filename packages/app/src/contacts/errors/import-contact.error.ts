/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactsEvent } from "App/contacts/constants"

export class ImportContactError extends Error {
  public type = ContactsEvent.ImportContact

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ImportContactError)
    }
  }
}
