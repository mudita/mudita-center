/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { api } from "./api"

declare global {
  interface Window {
    api: typeof api
  }
}
