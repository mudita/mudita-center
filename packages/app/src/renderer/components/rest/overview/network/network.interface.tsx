/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

export interface NetworkProps {
  simCards?: SimCard[]
  onSimChange?: (sim: SimCard) => void
}
