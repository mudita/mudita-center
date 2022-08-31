/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Response } from "../../pure/types"
import { AddEntityResult } from "./add-entity-result"

export interface SeedDataResult {
  contactsResult?: Response<AddEntityResult>[]
}
