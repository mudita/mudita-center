const fs = require('fs');
const path = require('path');
const electronNotarize = require('electron-notarize');
console.log("path.join: ", path.join(__dirname, "../.electron-builder.env"))

require("dotenv").config({
  path: path.join(__dirname, "../.electron-builder.env"),
})

module.exports = async function (params) {
  if(process.platform != "darwin"){
    return
  }

  console.log("after sign hook triggered", params, params.packager.appInfo)

  const appBundleId = "com.mudita.center"
  const appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`)

  if(!fs.existsSync(appPath)){
    console.log("skip")
    return;
  }

  console.log(`Notarizing ${appBundleId} found at ${appPath}`);

  try {
    await electronNotarize.notarize({
      appBundleId,
      appPath,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
    });
  } catch (error) {
    console.error(error)
  }

  console.log(`Done notarizing ${appBundleId}`)
}

