/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import * as fs from "fs-extra"
import * as path from "path"
import * as dotenv from "dotenv"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { normalizeContentfulData } from "../libs/news/utils/src"

dotenv.config({
  path: path.join(__dirname, "../.env"),
})
;(async () => {
  try {
    const jsonPath = path.resolve(
      __dirname,
      "../libs/news/feature/src/lib/default-news.json"
    )
    const url = `${process.env.MUDITA_CENTER_SERVER_URL}/news`
    const { data } = await axios.get(url, {
      params: { limit: 6 },
    })
    const newsData = await normalizeContentfulData(data)
    fs.writeJsonSync(path.resolve(jsonPath), newsData)
    console.log("News downloading finished.")
  } catch (error) {
    console.log("Error while downloading news.", error)
  }
})()
