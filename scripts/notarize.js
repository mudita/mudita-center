/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const fs = require("fs")
const path = require("path")
const { notarize } = require("@electron/notarize")

require("dotenv").config({
  path: path.join(__dirname, "../apps/app/electron-builder.env"),
})

module.exports = async function (context) {
  const { electronPlatformName, appOutDir } = context

  if (electronPlatformName !== "darwin") {
    return
  }

  if (
    process.env.APPLE_ID === undefined ||
    process.env.APPLE_ID_PASSWORD === undefined
  ) {
    console.log("The username and app-specific password aren't set")
    return
  }

  const appBundleId = "com.mudita.center"
  const appPath = path.join(
    appOutDir,
    `${context.packager.appInfo.productFilename}.app`
  )

  if (!fs.existsSync(appPath)) {
    console.log(`Notarizing ${appBundleId} not found at ${appPath}`)
    return
  }

  console.log(`Notarizing ${appBundleId} found at ${appPath}`)

  try {
    await notarize({
      appBundleId,
      appPath,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
      teamId: process.env.APPLE_ASC_PROVIDER,
    })
    console.log(`Done notarizing ${appBundleId}`)
  } catch (error) {
    console.error(error)
  }
}
