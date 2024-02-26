/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "Core/modals-manager/constants"
import { showModal } from "Core/modals-manager/actions/base.action"
import { ModalStateKey } from "Core/modals-manager/reducers"
import { hasUserSerialPortAccess } from "Core/desktop/requests/is-user-in-serial-port-group.request"
import { isLinux } from "Core/desktop/requests/is-linux.request"
import { setUSBAccessRestartRequired } from "Core/settings/actions/set-usb-access-restart-needed.action"

export const checkAppRequiresSerialPortGroup = createAsyncThunk<
  void,
  undefined
>(
  ModalsManagerEvent.ShowAppRequiresSerialPortGroup,
  async (_, { dispatch }) => {
    if (await isLinux()) {
      const userHasSerialPortAccess = await hasUserSerialPortAccess()

      if (!userHasSerialPortAccess) {
        dispatch(showModal(ModalStateKey.UsbAccessFlowShow))
      } else {
        await dispatch(setUSBAccessRestartRequired(false))
      }
    }
  }
)
