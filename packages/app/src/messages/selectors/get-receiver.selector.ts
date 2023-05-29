/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { getReceiversSelector } from "App/messages/selectors/get-receivers.selector"
import { Receiver } from "App/messages/reducers"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getReceiverSelector = (phoneNumberId: string) => {
  return createSelector(getReceiversSelector, (receivers) => {
    return receivers.find(
      (receiver) => receiver.phoneNumberId === phoneNumberId
    ) as Receiver
  })
}
