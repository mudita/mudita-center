/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PropsWithChildren } from "react"
import { Messages } from "app-localize/utils"

export type Translation =
  | {
      message: Messages["id"]
      values?: Record<string, string | number | boolean>
      children?: undefined
    }
  | {
      message?: undefined
      values?: undefined
      children?: PropsWithChildren["children"]
    }
