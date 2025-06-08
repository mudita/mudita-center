/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type ContactSupportError = string | null
export type RequestStatus = "idle" | "pending" | "succeeded" | "failed"

export interface SendTicketState {
  status: RequestStatus
  error: ContactSupportError
}

export interface ContactSupportState {
  sendTicket: SendTicketState
}
