/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "Core/modals-manager/constants"
import { showModal } from "Core/modals-manager/actions/base.action"
import { ModalStateKey } from "Core/modals-manager/reducers"
import { isUserInSerialPortGroup } from "Core/desktop/requests/is-user-in-serial-port-group.request"
import { isLinux } from "Core/desktop/requests/is-linux.request"

export const checkAppRequiresSerialPortGroup = createAsyncThunk<
  void,
  undefined
>(
  ModalsManagerEvent.ShowAppRequiresSerialPortGroup,
  async (_, { dispatch }) => {
    const linux = await isLinux()
    console.log("checkAppRequiresSerialPortGroup linux", linux)
    if (linux) {
      const userInGroup = await isUserInSerialPortGroup()
      console.log("checkAppRequiresSerialPortGroup userInGroup", userInGroup)

      if (!userInGroup) {
        dispatch(showModal(ModalStateKey.UsbAccessFlowShow))
      }
    }
  }
)
