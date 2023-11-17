/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { showModal } from "App/modals-manager/actions/base.action"
import { ModalStateKey } from "App/modals-manager/reducers"
import { isUserInSerialPortGroup } from "App/machine/requests/is-user-in-serial-port-group.request"
import { isLinux } from "App/machine/requests/is-linux.request"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { setSettings } from "App/settings/actions/set-settings.action"

export const checkAppRequiresSerialPortGroup = createAsyncThunk<
  void,
  undefined
>(
  ModalsManagerEvent.ShowAppRequiresSerialPortGroup,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { dispatch }) => {
    if (await isLinux()) {
      const userInGroup = await isUserInSerialPortGroup()

      if (!userInGroup) {
        dispatch(showModal(ModalStateKey.USBAccessFlowShow))
      } else {
        dispatch(setSettings({ usbAccessRestart: false }))
      }
    }
  }
)
