/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

export interface NetworkProps {
  simCards?: SimCard[]
  batteryLevel: number
  network?: string
  networkLevel?: number
}
