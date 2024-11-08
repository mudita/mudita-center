/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactSupportEvent } from "Core/contact-support/constants"

// TODO: handle circle dependencies between close-contact-support & device-manager
import { hideModals } from "../../modals-manager/actions/base.action"

export const closeContactSupportFlow = createAsyncThunk<void, undefined>(
  ContactSupportEvent.CloseContactSupportFlow,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { dispatch }) => {
    dispatch(hideModals())
  }
)
