/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface SettingsReducer {
  updateAvailable: boolean
  checkingForUpdate: boolean
  checkingForUpdateFailed: boolean
  latestVersion?: string
  currentVersion?: string
}
