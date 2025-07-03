/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { ContactSupportReducer } from "contact-support/models"
import { setCreateTicketModalVisible } from "./contact-support.actions"

const initialState: ContactSupportReducer = {
  createTicketModalVisible: false,
}

export const contactSupportReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCreateTicketModalVisible, (state, action) => {
    state.createTicketModalVisible = action.payload
  })
})
