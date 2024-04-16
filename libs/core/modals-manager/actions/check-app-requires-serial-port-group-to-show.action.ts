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
import { setUserHasSerialPortAccess } from "Core/settings/actions"
import { updateSettings } from "Core/settings/requests"

export const checkAppRequiresSerialPortGroup = createAsyncThunk<
  void,
  undefined
>(
  ModalsManagerEvent.ShowAppRequiresSerialPortGroup,
  async (_, { dispatch }) => {
    const runningOnLinux = await isLinux()
    const runningOnCI = process.env.CI === "true"

    if (!runningOnLinux || runningOnCI) {
      dispatch(setUserHasSerialPortAccess(true))
      return
    }

    const userHasSerialPortAccess = await hasUserSerialPortAccess()

    dispatch(setUserHasSerialPortAccess(userHasSerialPortAccess))

    if (!userHasSerialPortAccess) {
      dispatch(showModal(ModalStateKey.UsbAccessFlowShow))
    }

    await updateSettings({ key: "usbAccessRestartRequired", value: false })
  }
)
