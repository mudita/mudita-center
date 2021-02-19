/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Client } from "App/api/mudita-center-server/client"

export const createClient = () =>
  new Client()
