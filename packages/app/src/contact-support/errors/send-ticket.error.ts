/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSupportError } from "App/contact-support/constants/errors.enum"

export class SendTicketError extends Error {
  public type = ContactSupportError.SendTicket

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SendTicketError)
    }
  }
}
