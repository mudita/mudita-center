/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  SendTicketState,
  ContactSupportState,
  SendTicketRejectAction,
} from "App/contact-support/reducers/contact-support.interface"
import { ContactSupportEvent } from "App/contact-support/constants"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"

export const initialState: ContactSupportState = {
  state: null,
  error: null,
}

export const contactSupportReducer = createReducer<ContactSupportState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(ContactSupportEvent.SendTicket), (state) => {
        return {
          ...state,
          state: SendTicketState.Sending,
        }
      })
      .addCase(fulfilledAction(ContactSupportEvent.SendTicket), (state) => {
        return {
          ...state,
          state: SendTicketState.Success,
          error: null,
        }
      })
      .addCase(
        rejectedAction(ContactSupportEvent.SendTicket),
        (state, action: SendTicketRejectAction) => {
          return {
            ...state,
            state: SendTicketState.Error,
            error: action.payload,
          }
        }
      )

      .addCase(
        fulfilledAction(ContactSupportEvent.CloseContactSupportFlow),
        (state) => {
          return {
            ...state,
            state: null,
            error: null,
          }
        }
      )
  }
)
