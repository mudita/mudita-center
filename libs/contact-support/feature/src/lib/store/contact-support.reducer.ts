/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { ContactSupportState } from "contact-support/models"
import { sendTicket, closeContactSupportFlow } from "./contact-support.actions"

const initialContactSupportState: ContactSupportState = {
  sendTicket: {
    status: "idle",
    error: null,
  },
}

export const contactSupportReducer = createReducer(
  initialContactSupportState,
  (builder) => {
    builder.addCase(sendTicket.pending, (state) => {
      state.sendTicket.status = "pending"
      state.sendTicket.error = null
    })
    builder.addCase(sendTicket.fulfilled, (state) => {
      state.sendTicket.status = "succeeded"
    })
    builder.addCase(sendTicket.rejected, (state, action) => {
      state.sendTicket.status = "failed"
      if (action.payload) {
        state.sendTicket.error = action.payload as string
      } else {
        state.sendTicket.error = action.error?.message || null
      }
    })
    builder.addCase(closeContactSupportFlow, () => {
      return {
        sendTicket: { status: "idle", error: null },
      }
    })
  }
)
