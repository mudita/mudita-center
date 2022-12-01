/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
const path = require("path")
const fs = require("fs-extra")
import { Configuration } from "../src/settings/dto"

require("dotenv").config({
  path: path.join(__dirname, "../../../.env"),
})

let defaultData = require("../src/settings/static/default-app-configuration.json")

;(async () => {
  const jsonPath = path.join(
    "src",
    "settings",
    "static",
    "app-configuration.json"
  )
  try {
    await fs.ensureDir(path.resolve(path.join("src", "main")))

    const url = `${process.env.MUDITA_CENTER_SERVER_URL}/v2-app-configuration`
    const { status, data } = await axios.get<Configuration>(url)

    if (status === 200 && data !== undefined) {
      await fs.writeJson(path.resolve(jsonPath), data)
    } else {
      await fs.writeJson(path.resolve(jsonPath), defaultData)
    }
  } catch (error: any) {
    await fs.writeJson(path.resolve(jsonPath), defaultData)
  }
})()
