/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import logger from "App/__deprecated__/main/utils/logger"
import { isToday } from "App/__deprecated__/renderer/utils/is-today"
import { SettingsEvent } from "App/settings/constants"
import { setDiagnosticTimestamp } from "App/settings/actions/set-diagnostic-timestamp.action"

export const sendDiagnosticData = createAsyncThunk<void, void>(
  SettingsEvent.SendDiagnosticData,
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

    dispatch(setDiagnosticTimestamp(nowTimestamp))

    return
  }
)
