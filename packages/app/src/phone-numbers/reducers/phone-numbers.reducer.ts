/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// TODO: CP-1494, CP-1495

import { createReducer } from "@reduxjs/toolkit"
import { PhoneNumbersState } from "App/phone-numbers/reducers/phone-numbers.interface"
import { addNewPhoneNumbersToState } from "App/phone-numbers/actions/add-new-phone-numbers-to-state.action"
import { readAllIndexes } from "App/data-sync/actions"

export const initialNumbersState: PhoneNumbersState = {
  numbers: {},
}

export const phoneNumbersReducer = createReducer<PhoneNumbersState>(
  initialNumbersState,
  (builder) => {
    builder
      .addCase(readAllIndexes.fulfilled, (state, action) => {
        state.numbers = action.payload.phoneNumbers
      })
      .addCase(addNewPhoneNumbersToState.fulfilled, (state, action) => {
        const numbers = action.payload.reduce(
          (numbers, phoneNumber) => {
            numbers[phoneNumber.id] = phoneNumber
            return numbers
          },
          { ...state.numbers }
        )
        state.numbers = numbers
      })
  }
)
