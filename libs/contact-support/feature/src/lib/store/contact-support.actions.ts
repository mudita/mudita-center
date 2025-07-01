/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"

export enum ContactSupportEvent {
  SetCreateTicketModalVisible = "contactSupport/setCreateTicketModalVisible",
}

export const setCreateTicketModalVisible = createAction<boolean>(
  ContactSupportEvent.SetCreateTicketModalVisible
)
