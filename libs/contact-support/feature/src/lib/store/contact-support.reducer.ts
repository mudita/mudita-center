/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { ContactSupportState, SendTicketStatus } from "contact-support/models"
import { sendTicket, closeContactSupportFlow } from "./contact-support.actions"

const initialContactSupportState: ContactSupportState = {
  sendTicket: {
    status: SendTicketStatus.Idle,
    error: null,
  },
}

export const contactSupportReducer = createReducer(
  initialContactSupportState,
  (builder) => {
    builder.addCase(sendTicket.pending, (state) => {
      state.sendTicket.status = SendTicketStatus.Sending
      state.sendTicket.error = null
    })
    builder.addCase(sendTicket.fulfilled, (state) => {
      state.sendTicket.status = SendTicketStatus.Success
    })
    builder.addCase(sendTicket.rejected, (state, action) => {
      state.sendTicket.status = SendTicketStatus.Error
      if (action.payload) {
        state.sendTicket.error = action.payload as string
      } else {
        state.sendTicket.error = action.error?.message || null
      }
    })
    builder.addCase(closeContactSupportFlow, () => {
      return {
        sendTicket: { status: SendTicketStatus.Idle, error: null },
      }
    })
  }
)
