/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { google, sheets_v4 } from "googleapis"

const KEYFILEPATH = process.env.MATOMO_TO_GSHEET_KEYFILEPATH!

class GoogleSheetFactory {
  static makeGoogleSheet(): sheets_v4.Sheets{
    // @ts-ignore
    return google.sheets({
      version: "v4",
      auth: new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      }),
    })
  }
}

export default GoogleSheetFactory
