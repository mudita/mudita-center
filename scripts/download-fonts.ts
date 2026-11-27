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
 * and GitHub Access Token provided in GH_BUILD_TOKEN env.
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
  const fallbackFontsDirectory = path.join(fontsDirectory, "fallback")

  const requiredFiles = [
    "GT-Pressura-Bold.otf",
    "GT-Pressura-Light.otf",
    "GT-Pressura-Regular.otf",
    "style.css",
  ]

  try {
    // Ensure that the fonts main directory exists and is empty
    console.log("Cleaning fonts directory...")
    fs.rmSync(mainFontsDirectory, { recursive: true, force: true })
    fs.mkdirSync(mainFontsDirectory, { recursive: true })

    // Then, download all required files inside the fonts/main directory
    console.log("Downloading fonts...")
    for (const [index, fileName] of Object.entries(requiredFiles)) {
      const url = `${process.env.FONTS_DIRECTORY_URL}/${fileName}`
      const { data } = await axios.get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `token ${process.env.GH_BUILD_TOKEN}`,
        },
      })
      fs.writeFileSync(path.join(mainFontsDirectory, fileName), data)
      console.log(
        `Downloaded file (${Number(index) + 1}/${requiredFiles.length}): ${fileName}`
      )
    }
  } catch (error) {
    // Report the original failure first, so it is never masked by the fallback
    console.warn(
      "Error while downloading fonts. Fallback font will be used instead.",
      error instanceof Error ? error.message : error
    )

    try {
      // In case of an error, copy content of fonts/fallback directory to fonts/main
      fs.rmSync(mainFontsDirectory, { recursive: true, force: true })
      fs.cpSync(fallbackFontsDirectory, mainFontsDirectory, {
        recursive: true,
      })
      console.log("Fallback fonts copied to the fonts/main directory.")
      if (process.env.GITHUB_ACTIONS === "true") {
        console.error(
          "::error title=Fonts::GT Pressura could not be downloaded. Check GH_BUILD_TOKEN."
        )
        process.exitCode = 1
      }
    } catch (fallbackError) {
      console.error(
        "Error while copying fallback fonts. The fonts/main directory is unusable.",
        fallbackError
      )
      process.exitCode = 1
    }
  }
})()
