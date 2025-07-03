/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const { Publisher } = require("electron-publish")
const path = require("path")
const axios = require("axios")
const fs = require("node:fs")

// Example of custom publisher for Mudita Center (local Nexus)
const nexusUrl = "http://localhost:8081"
const repository = "mudita-center"
const uploadUrl = `${nexusUrl}/repository/${repository}/latest/`
const username = "" // Nexus username
const password = "" // Nexus password

module.exports = class CustomPublisher extends Publisher {
  async upload(task) {
    const basename = path.basename(task.file)
    const absolutePath = path.resolve(__dirname, "..", "release", task.file)
    const fileStream = fs.createReadStream(absolutePath)
    const { size } = fs.statSync(absolutePath)

    axios
      .put(`${uploadUrl}${basename}`, fileStream, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
          "Content-Type": "application/octet-stream",
          "Content-Length": size,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then((response) => {
        console.log(`Upload finished: ${response.statusText}`)
      })
      .catch((error) => {
        console.error(
          `Upload failed with status ${error.response?.status || "unknown"}:`,
          error.message
        )
      })
  }
}
