/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"

export const getBase64 = async (url: string): Promise<string> => {
  try {
    return await axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then(
        (response) =>
          "data:image;base64," +
          Buffer.from(response.data, "binary").toString("base64")
      )
  } catch {
    // TODO: https://appnroll.atlassian.net/browse/CP-3937 - Add image placeholder fallback to News view
    return ""
  }
}
