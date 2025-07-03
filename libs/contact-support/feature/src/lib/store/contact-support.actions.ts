/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"

export enum ContactSupportEvent {
  SetContactSupportModalVisible = "contactSupport/setContactSupportModalVisible",
}

export const setContactSupportModalVisible = createAction<boolean>(
  ContactSupportEvent.SetContactSupportModalVisible
)
