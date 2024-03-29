/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { getReceiversSelector } from "Core/messages/selectors/get-receivers.selector"
import { Receiver } from "Core/messages/reducers"
import { removeDecoratorsFromPhoneNumber } from "Core/__deprecated__/renderer/models/utils/remove-decorators-from-phone-number"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getReceiverSelector = (phoneNumber: string) => {
  return createSelector(getReceiversSelector, (receivers) => {
    return receivers.find(
      (receiver) =>
        removeDecoratorsFromPhoneNumber(receiver.phoneNumber) ===
        removeDecoratorsFromPhoneNumber(phoneNumber)
    ) as Receiver
  })
}
