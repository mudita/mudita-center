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
import { setSetting } from "Core/settings/actions/set-setting.action"

export const checkAppRequiresSerialPortGroup = createAsyncThunk<
  void,
  undefined
>(
  ModalsManagerEvent.ShowAppRequiresSerialPortGroup,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { dispatch }) => {
    //if (await isLinux()) {
    const userInGroup = await isUserInSerialPortGroup()
    console.log("userInGroup", userInGroup)

    if (!userInGroup) {
      dispatch(showModal(ModalStateKey.UsbAccessFlowShow))
    } else {
      dispatch(setSetting({ key: "usbAccessRestart", value: false }))
    }
    //}
  }
)
