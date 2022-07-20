/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"

export default interface NetworkInfo {
  // List of SIM cards used on the device.
  readonly simCards: SimCard[]
}
