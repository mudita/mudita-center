/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "App/main/utils/logger"
logger.info(
  `ENV: outlook.constants clientId  -> process.env.LOGIN_MICROSOFT_ONLINE_CLIENT_ID: ${process.env.LOGIN_MICROSOFT_ONLINE_CLIENT_ID}`
)
export const redirectUrl =
  "https://login.microsoftonline.com/common/oauth2/nativeclient"
export const apiBaseUrl = "https://login.microsoftonline.com/common/oauth2/v2.0"
export const clientId = process.env.LOGIN_MICROSOFT_ONLINE_CLIENT_ID || ""
export const baseGraphUrl = "https://graph.microsoft.com/v1.0"
