/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const axios = require("axios")
const path = require("path")
const fs = require("fs-extra")
require("dotenv").config({
  path: path.join(__dirname, "../../../.env"),
})
import { normalizeHelpData } from "../../app/src/__deprecated__/renderer/utils/contentful/normalize-help-data"
;(async () => {
  try {
    await fs.ensureDir(path.resolve(path.join("src", "main")))
    const jsonPath = path.join("src", "help", "default-help.json")

    const url = `${process.env.MUDITA_CENTER_SERVER_URL}/help`
    const { data } = await axios.get(url, {
      params: { limit: 6 },
    })
    const helpData = normalizeHelpData(data, "en-US")

    await fs.writeJson(path.resolve(jsonPath), helpData)
    console.log("Help downloading finished.")
  } catch (error) {
    console.log("Error while downloading Help.", error)
  }
})()
