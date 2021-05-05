const path = require("path")
const fs = require("fs-extra")

;(async () => {
  try {
    await fs.ensureDir(path.resolve(path.join("src", "main")))
    const jsonPath = path.join("src", "main", "default-news.json")
    const data = { key: "value" }
    await fs.writeJson(path.resolve(jsonPath), data)
    console.log("news file")
  } catch (error) {
    console.log("Error while downloading news.")
  }
})()
