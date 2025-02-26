/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { WindowAPI } from "./index"

declare global {
  interface Window {
    api: WindowAPI
  }
}
