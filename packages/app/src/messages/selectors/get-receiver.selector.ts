/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { getReceiversSelector } from "App/messages/selectors/get-receivers.selector"
import { Receiver } from "App/messages/reducers"
import { removeDecoratorsFromPhoneNumber } from "App/__deprecated__/renderer/models/utils/remove-decorators-from-phone-number"

export const getReceiverSelector = (phoneNumber: string) => {
  return createSelector(getReceiversSelector, (receivers) => {
    return receivers.find(
      (receiver) =>
        removeDecoratorsFromPhoneNumber(receiver.phoneNumber) ===
        removeDecoratorsFromPhoneNumber(phoneNumber)
    ) as Receiver
  })
}
