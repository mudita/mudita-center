/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { PureV1Formatter } from "./pure-v1.formatter"
import { Formatter } from "./formatter"

const formatterMap: { [key: number]: Formatter } = {
  1: new PureV1Formatter(),
}

export class FormatterFactory {
  static create(version = 1): Formatter {
    return formatterMap[version] ?? formatterMap[1]
  }
}

