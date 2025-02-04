/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaCenterServerRoutes } from "../libs/shared/utils/src/lib/mudita-center-server-routes"

const axios = require("axios")
const path = require("path")
const fs = require("fs-extra")

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
})
;(async () => {
  try {
    const directory = path.resolve(
      path.join("..", "..", "libs", "help", "feature", "src", "lib")
    )
    const jsonPath = path.join(directory, "default-help.json")
    const previewToken = process.env.DEV_HELP_PREVIEW_TOKEN

    const params = new URLSearchParams()
    if (previewToken) {
      params.append("previewToken", previewToken)
    }
    const url = `${process.env.MUDITA_CENTER_SERVER_URL}/${
      MuditaCenterServerRoutes.HelpV2
    }?${params.toString()}`

    const { data } = await axios.get(url)

    await fs.writeJson(jsonPath, data)
    console.log("Help v2 downloaded successfully.")
  } catch (error) {
    console.error("Error while downloading Help v2.", error)
  }
})()
