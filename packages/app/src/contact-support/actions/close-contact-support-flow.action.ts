/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactSupportEvent } from "App/contact-support/constants"
import { hideModals } from "App/modals-manager"

export const closeContactSupportFlow = createAsyncThunk<void, undefined>(
  ContactSupportEvent.CloseContactSupportFlow,
  async (_, { dispatch }) => {
    dispatch(hideModals())
  }
)
