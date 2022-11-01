/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PureV1Formatter } from "./pure-v1.formatter.js"
import { Formatter } from "./formatter.js"

const formatterMap: { [key: number]: Formatter } = {
  1: new PureV1Formatter(),
}

export class FormatterFactory {
  static create(version = 1): Formatter {
    return formatterMap[version] ?? formatterMap[1]
  }
}
