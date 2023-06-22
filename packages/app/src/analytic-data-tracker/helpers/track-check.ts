/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tryTrack = <T extends (...args: any) => any>(
  track: T,
  trackParams: Parameters<T>,
  state: ReduxRootState
): ReturnType<T> | undefined => {
  if (state.device.externalUsageDevice) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return track(...trackParams)
  }
  return undefined
}
