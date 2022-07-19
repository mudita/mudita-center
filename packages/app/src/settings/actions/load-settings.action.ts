/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { createAsyncThunk } from "@reduxjs/toolkit"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import { SettingsEvent } from "App/settings/constants"
import { getSettings } from "App/settings/requests"
import { loadBackupData } from "App/backup/actions"
import {
  checkAppForcedUpdateFlowToShow,
  checkCollectingDataModalToShow,
  checkAppUpdateFlowToShow,
} from "App/modals-manager/actions"
import { setSettings } from "App/settings/actions/set-settings.action"
import logger from "App/__deprecated__/main/utils/logger"
import getApplicationConfiguration from "App/__deprecated__/renderer/requests/get-application-configuration.request"
import packageInfo from "../../../package.json"

export const loadSettings = createAsyncThunk<void, void>(
  SettingsEvent.LoadSettings,
  async (_, { dispatch }) => {
    let updateRequired = false
    const settings = await getSettings()
    const configuration = await getApplicationConfiguration()

    try {
      updateRequired = isVersionGreater(
        configuration.centerVersion,
        packageInfo.version
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
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
          lowestSupportedProductVersion: {
            [DeviceType.MuditaHarmony]: "1.5.0",
            [DeviceType.MuditaPure]: configuration.osVersion,
          },
        },
      })
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(loadBackupData())
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(checkAppUpdateFlowToShow())
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(checkAppForcedUpdateFlowToShow())
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(checkCollectingDataModalToShow())

    return
  }
)
