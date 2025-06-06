/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock-client"

export const useDevConsoleMock = () => {
  if (
    process.env.DEV_TOOLS_SHORTCUT_ENABLED !== "1" ||
    typeof global === "undefined"
  ) {
    return
  }
  if (process.env.MOCK_SERVICE_ENABLED === "1") {
    E2EMockClient.connect()
  }
  Object.assign(global, {
    _mock: E2EMockClient,
  })
}
