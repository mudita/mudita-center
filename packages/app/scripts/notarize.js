const fs = require('fs');
const path = require('path');
const electronNotarize = require('electron-notarize');

require("dotenv").config({
  path: path.join(__dirname, "../.electron-builder.env"),
})

module.exports = async function (context) {
  const { electronPlatformName, appOutDir } = context;

  if(electronPlatformName !== 'darwin'){
    return;
  }

  console.log("after sign hook triggered", context, context.packager.appInfo)

  const appBundleId = "com.mudita.center"
  const appPath = path.join(appOutDir, `${context.packager.appInfo.productFilename}.app`)

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

