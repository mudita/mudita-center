/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { MenuItemConstructorOptions } from "electron"

export interface MenuItem extends MenuItemConstructorOptions {
  devModeOnly?: boolean
  labelCreator?: () => string
}
