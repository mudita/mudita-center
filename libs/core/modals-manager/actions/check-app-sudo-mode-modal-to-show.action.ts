/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "Core/modals-manager/constants"
import { showModal } from "Core/modals-manager/actions/base.action"
import { ModalStateKey } from "Core/modals-manager/reducers"
import { isSudoMode } from "Core/desktop/requests/is-sudo-mode.request"

export const checkAppInSudoModeModalToShow = createAsyncThunk<void, undefined>(
  ModalsManagerEvent.ShowAppInSudoMode,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { dispatch }) => {
    const sudoMode = await isSudoMode()
    if (sudoMode) {
      dispatch(showModal(ModalStateKey.AppRunWithSudo))
    }
  }
)
