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
import { EntryCollection } from "contentful"
import { NewsEntry } from "../src/__deprecated__/news/store/mudita-news.interface"
import { normalizeContentfulData } from "../src/__deprecated__/news/helpers/normalize-contentful-data.helpers"
;(async () => {
  try {
    await fs.ensureDir(path.resolve(path.join("src", "main")))
    const jsonPath = path.join(
      "src",
      "__deprecated__",
      "main",
      "default-news.json"
    )

    const url = `${process.env.MUDITA_CENTER_SERVER_URL}/news`
    const { data } = await axios.get(url, {
      params: { limit: 6 },
    })
    const newsData = await normalizeContentfulData(
      data as EntryCollection<NewsEntry>
    )
    await fs.writeJson(path.resolve(jsonPath), newsData)
    console.log("News downloading finished.")
  } catch (error) {
    console.log("Error while downloading news.", error)
  }
})()
