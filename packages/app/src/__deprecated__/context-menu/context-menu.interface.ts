/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MenuItemConstructorOptions } from "electron"

export interface ContextMenuItem extends MenuItemConstructorOptions {
  devModeOnly?: boolean
  labelCreator?: () => string
}
