/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { ContactSupportEvent } from "App/contact-support/constants"
import { ContactSupportError } from "App/contact-support/constants/errors.enum"
import { attachedFileName } from "App/contact-support/helpers/downloading-logs"
import { AppError } from "App/core/errors"

export const files = [
  {
    name: attachedFileName,
  },
]

export enum SendTicketState {
  Sending = "sending",
  Success = "success",
  Error = "error",
}

export interface ContactSupportState {
  state: SendTicketState | null
  error: Error | string | null
}

export type SendTicketRejectAction = PayloadAction<
  AppError<ContactSupportError.SendTicket>,
  ContactSupportEvent.SendTicket
>
