/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import packageInfo from "../../../../apps/mudita-center/package.json"
import {
  setVisitorMetadataRequest,
  trackUniqueWithoutDeviceCheckRequest,
} from "Core/analytic-data-tracker/requests"
import { TrackEventCategory } from "Core/analytic-data-tracker/constants"

export const initAnalyticDataTracker = async (): Promise<void> => {
  await setVisitorMetadataRequest({
    ua: window.navigator.userAgent,
    lang: window.navigator.language,
    res: `${window.screen.width * window.devicePixelRatio}x${
      window.screen.height * window.devicePixelRatio
    }`,
  })

  await trackUniqueWithoutDeviceCheckRequest({
    e_c: TrackEventCategory.CenterVersion,
    e_a: packageInfo.version,
  })
}
