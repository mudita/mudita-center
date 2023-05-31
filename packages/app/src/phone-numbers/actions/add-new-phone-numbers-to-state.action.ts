/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { PhoneNumbersEvent } from "App/phone-numbers/constants/event.enum"
import { getPhoneNumberRequest } from "App/phone-numbers/requests/get-phone-number.request"
import { PhoneNumber } from "App/phone-numbers/dto"

export const addNewPhoneNumbersToState = createAsyncThunk<
  PhoneNumber[],
  string[]
>(PhoneNumbersEvent.AddNewPhoneNumbersToState, async (phoneNumberIds) => {
  const phoneNumbers: PhoneNumber[] = []

  for (const id of phoneNumberIds) {
    const { ok, data } = await getPhoneNumberRequest(id)

    if (ok) {
      phoneNumbers.push(data)
    }
  }

  // TODO: CP-1873 handle error

  return phoneNumbers
})
