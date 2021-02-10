const axios = require("axios")
const fs = require("fs-extra")
const path = require("path")

require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "../.env.production")
      : path.join(__dirname, "../.env.development"),
})

/**
 * Function that downloads "GT Pressura" font which is on a private repository.
 * It needs an access to proper repo defined in FONTS_DIRECTORY_URL env
 * and GitHub access token provided in GITHUB_ACCESS_TOKEN env.
 */
;(async () => {
  console.log("Downloading fonts...")
  const requiredFiles = [
    "GT-Pressura-Bold.otf",
    "GT-Pressura-Light.otf",
    "GT-Pressura-Regular.otf",
    "style.css",
  ]

  try {
    for (const fileName of requiredFiles) {
      const url = `${process.env.FONTS_DIRECTORY_URL}/${fileName}`
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      })
      await fs.writeFile(
        path.join(__dirname, "../src/renderer/fonts/main/", fileName),
        data
      )
      console.log(`Downloaded ${fileName}`)
    }

    console.log("Fonts downloading finished.")
  } catch (error) {
    console.log(
      "Error while downloading fonts. Fallback font will be used instead."
    )
  }
})()
