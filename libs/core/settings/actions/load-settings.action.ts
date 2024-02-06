/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import isVersionGreater from "Core/utils/is-version-greater"
import { SettingsEvent } from "Core/settings/constants"
import { getSettings } from "Core/settings/requests"
import { setSettings } from "Core/settings/actions/set-settings.action"
import logger from "Core/__deprecated__/main/utils/logger"
import { getConfiguration } from "Core/settings/requests"
import packageInfo from "../../../../apps/mudita-center/package.json"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { checkAppRequiresSerialPortGroup } from "Core/modals-manager/actions"

export const loadSettings = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(SettingsEvent.LoadSettings, async (_, { dispatch }) => {
  let updateRequired = false
  const settings = await getSettings()
  const configuration = await getConfiguration()

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
      checkingForUpdate: false,
      checkingForUpdateFailed: false,
      lowestSupportedVersions: {
        lowestSupportedCenterVersion: configuration.centerVersion,
        lowestSupportedProductVersion: configuration.productVersions,
      },
    })
  )

  //console.log("loadSettings dispatch checkAppRequiresSerialPortGroup")
  void dispatch(checkAppRequiresSerialPortGroup())

  return
})
