/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { License } from "settings/ui"
import { licenses } from "./licenses.json"

export const LicensePage: FunctionComponent = () => {
  return <License licenses={licenses} />
}
