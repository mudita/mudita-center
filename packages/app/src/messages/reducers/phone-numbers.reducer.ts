/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// TODO: CP-1494, CP-1495

import { createReducer } from "@reduxjs/toolkit"
import { fulfilledAction } from "App/__deprecated__/renderer/store/helpers"
import { PhoneNumbersState } from "App/messages/reducers/phone-numbers.interface"
import { DataSyncEvent } from "App/data-sync/constants"
import { ReadAllIndexesAction } from "App/data-sync/reducers"
export const initialNumbersState: PhoneNumbersState = {
  numbers: {},
}

export const phoneNumbersReducer = createReducer<PhoneNumbersState>(
  initialNumbersState,
  (builder) => {
    builder.addCase(
      fulfilledAction(DataSyncEvent.ReadAllIndexes),
      (state, action: ReadAllIndexesAction) => {
        return {
          ...state,
          numbers: action.payload.phoneNumbers,
        }
      }
    )
  }
)
