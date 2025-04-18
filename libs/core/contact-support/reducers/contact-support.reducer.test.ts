/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactSupportEvent, SendTicketState } from "Core/contact-support"
import { ContactSupportError } from "Core/contact-support/constants/errors.enum"
import {
  contactSupportReducer,
  initialState,
} from "Core/contact-support/reducers/contact-support.reducer"
import { AppError } from "Core/core/errors"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Core/__deprecated__/renderer/store/helpers"

jest.mock("device/feature/src/lib/file-manager/mtp-file-manager.service")

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(contactSupportReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Start Backup Device functionality", () => {
  test("Event: `SendTicket/pending` change `state` to Sending", () => {
    expect(
      contactSupportReducer(undefined, {
        type: pendingAction(ContactSupportEvent.SendTicket),
      })
    ).toEqual({
      ...initialState,
      state: SendTicketState.Sending,
    })
  })

  test("Event: `SendTicket/fulfilled` change `state` to Success", () => {
    expect(
      contactSupportReducer(undefined, {
        type: fulfilledAction(ContactSupportEvent.SendTicket),
      })
    ).toEqual({
      ...initialState,
      state: SendTicketState.Success,
    })
  })

  test("Event: `SendTicket/rejected` change `state` to Error", () => {
    const error = new AppError(ContactSupportError.SendTicket, "I'm error")

    expect(
      contactSupportReducer(undefined, {
        type: rejectedAction(ContactSupportEvent.SendTicket),
        payload: error,
      })
    ).toEqual({
      ...initialState,
      state: SendTicketState.Error,
      error: error,
    })
  })
})

describe("`CloseContactSupportFlow` data functionality", () => {
  const error = new AppError(ContactSupportError.SendTicket, "I'm error")

  test("Event: `CloseContactSupportFlow/fulfilled` set error property and state to null", () => {
    expect(
      contactSupportReducer(
        {
          ...initialState,
          error: error,
        },
        {
          type: fulfilledAction(ContactSupportEvent.CloseContactSupportFlow),
        }
      )
    ).toEqual({
      ...initialState,
      state: null,
      error: null,
    })
  })
})
