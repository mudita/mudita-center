/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import { settingsSchema } from "App/settings/store/schemas"
import project from "../../../package.json"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"

import {
  privacyPolicyAcceptedMigration,
  removeUnusedFields,
} from "App/settings/store/migrations"

export const settingsStore = new Store({
  name: "settings",
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  projectVersion: project.version,
  cwd: getAppPath(),
  schema: settingsSchema,
  clearInvalidConfig: process.env.NODE_ENV === "production",
  migrations: {
    ">=1.4.1": removeUnusedFields,
    ">=2.0.2": privacyPolicyAcceptedMigration,
  },
})
