/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const axios = require("axios")
const path = require("path")
const fs = require("fs-extra")

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
})
;(async () => {
  try {
    const directory = path.resolve(path.join("src", "help-v2"))
    await fs.ensureDir(directory)
    const jsonPath = path.join(directory, "default-help.json")

    const url = `${process.env.MUDITA_CENTER_SERVER_V2_URL}/help-v2`
    const { data } = await axios.get(url)

    await fs.writeJson(jsonPath, data)
    console.log("Help v2 downloaded successfully.")
  } catch (error) {
    console.error("Error while downloading Help v2.", error)
  }
})()
