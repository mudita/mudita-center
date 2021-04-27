/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../../../../../.env"),
})

const localesUrl = `${process.env.PHRASE_API_URL}/locales`

const axiosConfig = {
  headers: {
    Authorization: `token ${process.env.PHRASE_API_KEY}`,
  },
}

module.exports = {
  localesUrl,
  axiosConfig,
}
