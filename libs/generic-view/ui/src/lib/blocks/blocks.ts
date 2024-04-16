/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BlockBox } from "./block-box"
import { BlockPlain } from "./block-plain"
import BlockHeading from "./block-heading"
import { blockBox, blockHeading, blockPlain } from "generic-view/models"

export const blocks = {
  [blockPlain.key]: BlockPlain,
  [blockBox.key]: BlockBox,
  [blockHeading.key]: BlockHeading,
}
