/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
// import { ContactSupportError } from './contact-support.types'; --> will be used later

export enum ContactSupportEvent {
  SendTicket = "contactSupport/sendTicket",
  CloseContactSupportFlow = "contactSupport/closeContactSupportFlow",
}

export const sendTicket = createAsyncThunk<void, any, { rejectValue: string }>(
  ContactSupportEvent.SendTicket,
  async (ticketData, { rejectWithValue }) => {
    // TODO: integrate actual request logic (e.g., sendTicketRequest(ticketData))
    try {
      // Placeholder: simulate a successful request
      return
    } catch (error) {
      // Placeholder error handling: return a simplified error message
      return rejectWithValue("Failed to send support ticket")
    }
  }
)

export const closeContactSupportFlow = createAction<void>(
  ContactSupportEvent.CloseContactSupportFlow
)
