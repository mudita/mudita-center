/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"
import { Settings } from "Core/settings/dto"

export interface DeviceVersion {
  lowestSupportedCenterVersion: string
  lowestSupportedProductVersion: Record<DeviceType, string>
}

export interface SettingsState extends Settings {
  lowestSupportedVersions: DeviceVersion | undefined
  currentVersion: string | undefined
  latestVersion: string | undefined
  loaded: boolean
  loading: boolean
  updateRequired: boolean
  updateAvailable: boolean | undefined
  updateAvailableSkipped: boolean | undefined
  checkingForUpdate: boolean
  checkingForUpdateFailed: boolean
  userHasSerialPortAccess?: boolean
}
