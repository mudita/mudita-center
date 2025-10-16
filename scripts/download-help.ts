/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import * as fs from "fs-extra"
import * as path from "path"
import * as dotenv from "dotenv"

dotenv.config({
  path: path.join(__dirname, "../.env"),
})
;(async () => {
  try {
    const jsonPath = path.join(
      __dirname,
      "..",
      "libs",
      "help",
      "main",
      "src",
      "lib",
      "default-help.json"
    )
    const previewToken = process.env.DEV_HELP_PREVIEW_TOKEN

    const params = new URLSearchParams()
    if (previewToken) {
      params.append("previewToken", previewToken)
    }
    const url = `${process.env.VITE_MUDITA_CENTER_SERVER_URL}/help-v2`

    const { data } = await axios.get(url)

    await fs.writeJson(jsonPath, data)
    console.log("Help v2 downloaded successfully.")
  } catch (error) {
    console.error("Error while downloading Help v2.", error)
  }
})()
