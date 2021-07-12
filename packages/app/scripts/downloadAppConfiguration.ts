import axios from "axios"
const path = require("path")
const fs = require("fs-extra")

require("dotenv").config({
  path: path.join(__dirname, "../../../.env"),
})

let defaultData = { osVersion: "0.72.1" }

;(async () => {
  const jsonPath = path.join("src", "main", "app-configuration.json")
  try {
    await fs.ensureDir(path.resolve(path.join("src", "main")))

    const url = `${process.env.MUDITA_CENTER_SERVER_URL}/app-configuration`
    const { status, data } = await axios.get<{ osVersion: string }>(url)
    if (status === 200 && data !== undefined) {
      await fs.writeJson(path.resolve(jsonPath), data)
    } else {
      await fs.writeJson(path.resolve(jsonPath), defaultData)
    }
  } catch (error) {
    await fs.writeJson(path.resolve(jsonPath), defaultData)
  }
})()
