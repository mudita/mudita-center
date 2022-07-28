/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import { SettingsEvent } from "App/settings/constants"
import { getSettings } from "App/settings/requests"
import { loadBackupData } from "App/backup/actions/load-backup-data.action"
import {
  checkAppForcedUpdateFlowToShow,
  checkCollectingDataModalToShow,
  checkAppUpdateFlowToShow,
} from "App/modals-manager/actions"
import { setSettings } from "App/settings/actions/set-settings.action"
import logger from "App/__deprecated__/main/utils/logger"
import { getConfiguration } from "App/settings/requests"
import packageInfo from "../../../package.json"

export const loadSettings = createAsyncThunk<void, void>(
  SettingsEvent.LoadSettings,
  async (_, { dispatch }) => {
    let updateRequired = false
    const settings = await getSettings()
    const configuration = await getConfiguration()

    try {
      updateRequired = isVersionGreater(
        configuration.centerVersion,
        packageInfo.version
      )
    } catch (error: any) {
      logger.error(
        `Settings -> LoadSettings: Check that app update required fails: ${error.message}`
      )
    }

    settings.collectingData ? logger.enableRollbar() : logger.disableRollbar()

    dispatch(
      setSettings({
        ...settings,
        updateRequired,
        currentVersion: packageInfo.version,
        lowestSupportedVersions: {
          lowestSupportedCenterVersion: configuration.centerVersion,
          lowestSupportedProductVersion: configuration.productVersions,
        },
      })
    )
    dispatch(loadBackupData())
    dispatch(checkAppUpdateFlowToShow())
    dispatch(checkAppForcedUpdateFlowToShow())
    dispatch(checkCollectingDataModalToShow())

    return
  }
)
