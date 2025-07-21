/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { merge, uniqueId } from "lodash"
import * as fs from "fs-extra"
import * as path from "node:path"
import { AppSettings } from "app-settings/models"
import { NestedPartial } from "app-utils/models"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version } from "../../../../package.json"

const INITIAL_MOCK_APP_SETTINGS: AppSettings = {
  version,
  user: {
    privacyPolicyAccepted: false,
    backupLocation: "WILL_BE_SET_IN_TESTS",
  },
  system: {
    analyticsId: uniqueId(),
    restartRequiredForSerialPortAccess: false,
  },
}

const getUserDataPath = async () => {
  return await browser.electron.execute((electron) => {
    return electron.app.getPath("userData")
  })
}

export const mockAppSettings = async (
  settings: NestedPartial<AppSettings> = {}
) => {
  const userDataPath = await getUserDataPath()
  const appSettingsPath = path.join(userDataPath, "app-settings.json")
  const backupLocation = path.join(userDataPath, "backups")
  const mockedAppSettings: AppSettings = merge(
    {},
    INITIAL_MOCK_APP_SETTINGS,
    { user: { backupLocation } },
    settings
  )
  await fs.writeFile(appSettingsPath, JSON.stringify(mockedAppSettings))
}
