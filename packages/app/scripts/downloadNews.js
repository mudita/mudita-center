const axios = require("axios")
const path = require("path")
const fs = require("fs-extra")

;(async () => {
  MUDITA_CENTER_SERVER_URL = "https://api.center.mudita.com/.netlify/functions"
  try {
    await fs.ensureDir(path.resolve(path.join("src", "main")))
    const jsonPath = path.join("src", "main", "default-news.json")

    const url = `${MUDITA_CENTER_SERVER_URL}/news`
    const { data } = await axios.get(url, {
      params: { limit: 6 },
    })
    await fs.writeJson(path.resolve(jsonPath), data)
    console.log("News downloading finished.")
  } catch (error) {
    console.log("Error while downloading news.", error)
  }
})()
