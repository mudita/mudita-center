/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { session } from "electron"

const githubToken = process.env.OS_UPDATE_SERVER_ACCESS_TOKEN ?? ""
const osUpdateServerUrl = process.env.OS_UPDATE_SERVER ?? ""

const registerPureOsDownloadProxy = () => {
  // Modify the headers for all requests to the following urls.
  // https://github.com/electron/electron/blob/master/docs/api/web-request.md#class-webrequest
  const filter = {
    urls: [`${osUpdateServerUrl}/assets/*`],
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      details.requestHeaders["Authorization"] = `token ${githubToken}`
      details.requestHeaders["Accept"] = `application/octet-stream`
      callback({ requestHeaders: details.requestHeaders })
    }
  )
}

export default registerPureOsDownloadProxy
