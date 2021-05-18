const axios = require("axios")
const path = require("path")
const fs = require("fs-extra")
require("dotenv").config({
  path: path.join(__dirname, "../../../.env"),
})
import { NewsEntry } from "../src/renderer/models/mudita-news/mudita-news.interface"
import { EntryCollection } from "contentful"
import { normalizeContentfulData } from "../src/renderer/models/mudita-news/normalize-contentful-data"
;(async () => {
  try {
    await fs.ensureDir(path.resolve(path.join("src", "main")))
    const jsonPath = path.join("src", "main", "default-news.json")

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
