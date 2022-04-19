/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { version } from "../../../package.json"
import {
  setVisitorMetadataRequest,
  trackUniqueRequest,
} from "App/analytic-data-tracker/requests"
import { TrackEventCategory } from "App/analytic-data-tracker/constants"

export const initAnalyticDataTracker = async (): Promise<void> => {
  await setVisitorMetadataRequest({
    ua: window.navigator.userAgent,
    lang: window.navigator.language,
    res: `${window.screen.width * window.devicePixelRatio}x${
      window.screen.height * window.devicePixelRatio
    }`,
  })

  await trackUniqueRequest({
    e_c: TrackEventCategory.CenterVersion,
    e_a: version,
  })
}
