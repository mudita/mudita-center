/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"

export enum ContactSupportEvent {
  SendTicket = "contactSupport/sendTicket",
  CloseContactSupportFlow = "contactSupport/closeContactSupportFlow",
}

export const sendTicket = createAsyncThunk(
  ContactSupportEvent.SendTicket,
  async (_ticketData) => {
    // TODO: integrate actual request logic (e.g., sendTicketRequest(ticketData))
    // For now, we simulate a successful response
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000) // Simulating a delay of 1 second
    })
  }
)

export const closeContactSupportFlow = createAction<void>(
  ContactSupportEvent.CloseContactSupportFlow
)
