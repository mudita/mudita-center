/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import { Configuration } from "../libs/core/settings/dto"
import { MuditaCenterServerRoutes } from "../libs/shared/utils/src/lib/mudita-center-server-routes"

const path = require("path")
const fs = require("fs-extra")

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
})

let defaultData = require("../libs/core/settings/static/default-app-configuration.json")

;(async () => {
  const jsonPath = path.join(
    __dirname,
    "..",
    "libs",
    "core",
    "settings",
    "static",
    "app-configuration.json"
  )

  try {
    await fs.ensureDir(path.resolve(jsonPath))

    // Downloading configuration from Mudita Center Server is disabled because of CP-3943
    // const url = `${process.env.MUDITA_CENTER_SERVER_URL}/${MuditaCenterServerRoutes.AppConfigurationV2}?version=v2-app-configuration`
    // const { status, data } = await axios.get<Configuration>(url)

    // if (status === 200 && data !== undefined) {
    //   await fs.writeJson(path.resolve(jsonPath), data)
    // } else {
      await fs.writeJson(path.resolve(jsonPath), defaultData)
    // }
  } catch (error: any) {
    await fs.writeJson(path.resolve(jsonPath), defaultData)
  }
})()
