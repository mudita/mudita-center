/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceType } from "Core/device/constants"
import { deviceTypeSelector } from "Core/device/selectors/device-type.selector"
import { SettingsState } from "Core/settings/reducers/settings.interface"
import { settingsStateSelector } from "Core/settings/selectors/get-settings-state.selector"

export const getDeviceLatestVersion = createSelector<
  ReduxRootState,
  SettingsState,
  DeviceType | null,
  string | undefined
>([settingsStateSelector, deviceTypeSelector], (settings, deviceType) => {
  if (!deviceType) {
    return
  }

  const productsVersion =
    settings.lowestSupportedVersions?.lowestSupportedProductVersion

  if (!productsVersion) {
    return
  }

  return productsVersion[deviceType]
})
