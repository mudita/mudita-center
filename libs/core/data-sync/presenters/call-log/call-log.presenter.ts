/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CallLogObject, CallLogInput } from "Core/data-sync/types"

export class CallLogPresenter {
  public serializeToObject(_input: CallLogInput): CallLogObject[] {
    return []
  }
}
