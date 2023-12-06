const axios = require("axios")
const fs = require("fs-extra")
const path = require("path")

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
})

/**
 * Function that downloads "GT Pressura" font which is on a private repository.
 * It needs an access to proper repo defined in FONTS_DIRECTORY_URL env
 * and GitHub Access Token provided in GITHUB_ACCESS_TOKEN env.
 */
;(async () => {
  console.log("downloadFonts.js __dirname", __dirname)
  const fontsDirectory = path.join(
    __dirname,
    "..",
    "apps",
    "mudita-center",
    "src",
    "fonts",
  )
  const mainFontsDirectory = path.join(fontsDirectory, "main")

  const requiredFiles = [
    "GT-Pressura-Bold.otf",
    "GT-Pressura-Light.otf",
    "GT-Pressura-Regular.otf",
    "style.css",
  ]

  try {
    console.log("Cleaning fonts directory...")
    // First, remove all files except a .gitkeep from the fonts/main directory
    const unnecessaryFiles = (await fs.readdir(mainFontsDirectory)).filter(file => ".gitkeep" !== file)
    for (const fileName of unnecessaryFiles) {
      await fs.remove(path.join(mainFontsDirectory, fileName))
    }

    // Then, download all required files inside the fonts/main directory
    console.log("Downloading fonts...")
    for (const [index, fileName] of requiredFiles.entries()) {
      const url = `${process.env.FONTS_DIRECTORY_URL}/${fileName}`
      console.log("Before axios.get")
      const { data } = await axios.get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      })
      console.log("After axios.get")
      await fs.writeFile(path.join(mainFontsDirectory, fileName), data)
      console.log(`Downloaded file (${index + 1}/${requiredFiles.length}): ${fileName}`)
    }
  } catch (error) {
    // In case of an error, copy content of fonts/fallback directory to fonts/main
    await fs.copy(path.join(fontsDirectory, "fallback"), mainFontsDirectory)
    console.warn(
      "Error while downloading fonts. Fallback font will be used instead.",
    )
  }
})()
