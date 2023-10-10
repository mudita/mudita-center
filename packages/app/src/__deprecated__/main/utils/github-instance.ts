/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"

// It's required only for development when API rate limits may exceed
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
const githubToken = process.env.OS_UPDATE_SERVER_ACCESS_TOKEN

export const githubInstance = axios.create({
  headers: {
    ...(githubToken ? { Authorization: `token ${githubToken}` } : {}),
  },
})
