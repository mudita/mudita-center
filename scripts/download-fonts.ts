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

  // Replaces the fonts/main directory in one go, so that a download that fails
  // half way does not leave the build with a partial set of fonts.
  const replaceMainFonts = (files: { fileName: string; content: Buffer }[]) => {
    fs.rmSync(mainFontsDirectory, { recursive: true, force: true })
    fs.mkdirSync(mainFontsDirectory, { recursive: true })
    for (const { fileName, content } of files) {
      fs.writeFileSync(path.join(mainFontsDirectory, fileName), content)
    }
  }

  try {
    // Download every required file before touching fonts/main
    console.log("Downloading fonts...")
    const downloadedFiles: { fileName: string; content: Buffer }[] = []

    for (const [index, fileName] of Object.entries(requiredFiles)) {
      const url = `${process.env.FONTS_DIRECTORY_URL}/${fileName}`
      const { data } = await axios.get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `token ${process.env.GH_BUILD_TOKEN}`,
        },
      })
      downloadedFiles.push({ fileName, content: data })
      console.log(
        `Downloaded file (${Number(index) + 1}/${requiredFiles.length}): ${fileName}`
      )
    }

    console.log("Cleaning fonts directory...")
    replaceMainFonts(downloadedFiles)
  } catch (error) {
    // Reported first, so that the reason the download failed is not lost if
    // falling back fails as well.
    console.warn(
      "Error while downloading fonts. Fallback font will be used instead.",
      error
    )

    // fs.cpSync copies a whole directory; fs.copyFileSync only takes a single
    // file and fails with EISDIR when handed one.
    fs.rmSync(mainFontsDirectory, { recursive: true, force: true })
    fs.cpSync(fallbackFontsDirectory, mainFontsDirectory, { recursive: true })

    // Falling back is fine on a workstation without access to the private
    // repository, but a build that ships is not allowed to swap GT Pressura
    // for Roboto without anyone noticing. The workflows put CI in the .env.
    if (process.env.CI === "true") {
      console.error(
        "::error title=Fonts::GT Pressura could not be downloaded, so the " +
          "build would ship the fallback font. Check that GH_BUILD_TOKEN is " +
          "valid and still has access to the fonts repository."
      )
      process.exitCode = 1
    }
  }
})()
