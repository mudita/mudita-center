/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { phoneNumbersStateSelector } from "App/messages/selectors/phone-numbers-state.selector"

export const getPhoneNumberById = (phoneNumberId: string) => {
  return createSelector(phoneNumbersStateSelector, ({ numbers }) => {
    const found = Object.keys(numbers).find((key) => {
      return numbers[key].id === phoneNumberId
    })

    return found && numbers[found] ? numbers[found].number : ""
  })
}

//to remove, probably has no usage in final version
export const getAllPhoneNumbers = () => {
  return createSelector(phoneNumbersStateSelector, ({ numbers }) => {
    return numbers
  })
}
