/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getActiveDevice } from "../selectors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getActiveMtpDeviceId = (
  state: ReduxRootState
): string | undefined => {
  const device = getActiveDevice(state)

  if (!device) {
    throw new Error(`Device not exist`)
  }

  switch (process.platform) {
    case "darwin":
    case "linux":
      return device.serialNumber
    case "win32":
      return device.pnpId
    default:
      throw new Error(`Unsupported platform: ${process.platform}`)
  }
}
