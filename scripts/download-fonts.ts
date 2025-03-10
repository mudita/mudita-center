/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import * as fs from "fs"
import * as path from "path"
import * as dotenv from "dotenv"

dotenv.config({
  path: path.join(__dirname, "../.env"),
})

/**
 * Function that downloads "GT Pressura" font which is on a private repository.
 * It needs access to proper repo defined in FONTS_DIRECTORY_URL env
 * and GitHub Access Token provided in GITHUB_ACCESS_TOKEN env.
 */
;(async () => {
  const fontsDirectory = path.join(
    __dirname,
    "..",
    "apps",
    "app",
    "resources",
    "fonts"
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
    const unnecessaryFiles = fs
      .readdirSync(mainFontsDirectory)
      .filter((file) => ".gitkeep" !== file)

    for (const fileName of unnecessaryFiles) {
      fs.rmSync(path.join(mainFontsDirectory, fileName))
    }

    // Then, download all required files inside the fonts/main directory
    console.log("Downloading fonts...")
    for (const [index, fileName] of Object.entries(requiredFiles)) {
      const url = `${process.env.FONTS_DIRECTORY_URL}/${fileName}`
      const { data } = await axios.get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      })
      fs.writeFileSync(path.join(mainFontsDirectory, fileName), data)
      console.log(
        `Downloaded file (${Number(index) + 1}/${requiredFiles.length}): ${fileName}`
      )
    }
  } catch (error) {
    // In case of an error, copy content of fonts/fallback directory to fonts/main
    fs.copyFileSync(path.join(fontsDirectory, "fallback"), mainFontsDirectory)
    console.warn(
      "Error while downloading fonts. Fallback font will be used instead.",
      error
    )
  }
})()
