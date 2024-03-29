/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import logger from "Core/__deprecated__/main/utils/logger"
import { isToday } from "Core/__deprecated__/renderer/utils/is-today"
import { SettingsEvent } from "Core/settings/constants"
import { setDiagnosticTimestamp } from "Core/settings/actions/set-diagnostic-timestamp.action"

export const sendDiagnosticData = createAsyncThunk<void, void>(
  SettingsEvent.SendDiagnosticData,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { dispatch, getState }) => {
    const state = getState() as ReduxRootState

    const { collectingData, diagnosticSentTimestamp } = state.settings
    const serialNumber = state.device.data?.serialNumber

    if (serialNumber === undefined) {
      logger.error(
        `Send Diagnostic Data: device logs fail. SerialNumber is undefined.`
      )
      return
    }
    if (!collectingData) {
      logger.info("Send Diagnostic Data: user no allowed sent data")
      return
    }

    if (isToday(new Date(diagnosticSentTimestamp))) {
      logger.info(
        `Send Diagnostic Data: data was sent at ${diagnosticSentTimestamp}`
      )
      return
    }

    logger.info(
      `Send Diagnostic Data: skipped until the diagnostic data and storage system will be refined`
    )

    const nowTimestamp = Date.now()

    void dispatch(setDiagnosticTimestamp(nowTimestamp))

    return
  }
)
