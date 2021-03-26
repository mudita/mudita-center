const axios = require("axios")
const fs = require("fs-extra")
const path = require("path")

require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

/**
 * Function that downloads "GT Pressura" font which is on a private repository.
 * It needs an access to proper repo defined in FONTS_DIRECTORY_URL env
 * and GitHub Access Token provided in GITHUB_ACCESS_TOKEN env.
 */
;(async () => {
  const fontsDirectory = path.join(__dirname, "..", "src", "fonts", "main")
  const requiredFiles = [
    "GT-Pressura-Bold.otf",
    "GT-Pressura-Light.otf",
    "GT-Pressura-Regular.otf",
    "style.css",
  ]

  console.log("Downloading fonts...")
  try {
    for (const fileName of requiredFiles) {
      const fileExists = await fs.pathExists(
        path.join(fontsDirectory, fileName)
      )
      if (!fileExists) {
        const url = `${process.env.FONTS_DIRECTORY_URL}/${fileName}`
        const { data } = await axios.get(url, {
          responseType: "arraybuffer",
          headers: {
            Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
          },
        })
        await fs.writeFile(path.join(fontsDirectory, fileName), data)
        console.log(`Downloaded ${fileName}`)
      } else {
        console.log(`${fileName} already exists. Downloading aborted.`)
      }
    }

    console.log("Fonts downloading finished.")
  } catch (error) {
    console.log(error)
    console.log(
      "Error while downloading fonts. Fallback font will be used instead."
    )
  }
})()
