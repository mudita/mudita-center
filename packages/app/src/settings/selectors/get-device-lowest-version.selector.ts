/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { DeviceType } from "@mudita/pure"
import { deviceTypeSelector } from "App/device/selectors"
import { SettingsState } from "App/settings/reducers"
import { settingsStateSelector } from "App/settings/selectors/get-settings-state.selector"

export const getDeviceLatestVersion = createSelector<
  ReduxRootState,
  SettingsState,
  DeviceType | null,
  string | undefined
>([settingsStateSelector, deviceTypeSelector], (settings, deviceType) => {
  if (!deviceType) {
    return
  }
  return settings.lowestSupportedVersions?.lowestSupportedProductVersion[
    deviceType
  ]
})
