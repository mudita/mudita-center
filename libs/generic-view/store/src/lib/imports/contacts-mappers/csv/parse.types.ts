/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OutlookColumn } from "./outlook.types"
import { GoogleColumn } from "./google.types"

export type Field = OutlookColumn | GoogleColumn
export type ContactRow = Record<Field, string>
