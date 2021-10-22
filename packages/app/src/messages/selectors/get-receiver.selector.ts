/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { getReceiversSelector } from "App/messages/selectors/get-receivers.selector"
import { Receiver } from "App/messages/reducers"

export const getReceiverSelector = (contactId: string, phoneNumber: string) => {
  return createSelector(getReceiversSelector, (receivers) => {
    return receivers.find(
      (receiver) =>
        receiver.contactId === contactId && receiver.phoneNumber === phoneNumber
    ) as Receiver
  })
}
