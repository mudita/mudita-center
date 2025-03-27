/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as readline from "readline"
import { Readable } from "stream"

export function createReadlineInterface(input: Readable): readline.Interface {
  return readline.createInterface({
    input,
    crlfDelay: Infinity,
  })
}
