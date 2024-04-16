/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { blockBox } from "./lib/block-box"
import { blockPlain } from "./lib/block-plain"
import { blockHeading } from "./lib/block-heading"
import { buttonText } from "./lib/button-text"

export * from "./lib/block-box"
export * from "./lib/block-plain"
export * from "./lib/block-heading"
export * from "./lib/button-text"

export default {
  [blockBox.key]: blockBox,
  [blockPlain.key]: blockPlain,
  [blockHeading.key]: blockHeading,
  [buttonText.key]: buttonText,
}
