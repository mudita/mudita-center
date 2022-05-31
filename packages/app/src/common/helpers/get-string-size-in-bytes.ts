/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"

export const getStringSizeInBytes = (content: string) => {
  return new TextEncoder().encode(content).length
}
