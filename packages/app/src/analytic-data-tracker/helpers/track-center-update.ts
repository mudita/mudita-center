/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { trackRequest } from "App/analytic-data-tracker/requests"
import { TrackEvent } from "App/analytic-data-tracker/services"
import { TrackEventCategory } from "App/analytic-data-tracker/constants"

export enum TrackCenterUpdateState {
  Download = "download",
  Start = "start",
  Fail = "fail",
}

export interface TrackCenterUpdateOptions {
  fromCenterVersion: string
  toCenterVersion: string
  state: TrackCenterUpdateState
}

const getPureTrackEventCategoryByState = (
  state: TrackCenterUpdateState
): TrackEventCategory => {
  if (state === TrackCenterUpdateState.Download) {
    return TrackEventCategory.CenterUpdateDownload
  } else if (state === TrackCenterUpdateState.Start) {
    return TrackEventCategory.CenterUpdateStart
  } else {
    return TrackEventCategory.CenterUpdateFail
  }
}

export const trackCenterUpdate = async (
  options: TrackCenterUpdateOptions
): Promise<void> => {
  const { fromCenterVersion, toCenterVersion, state } = options
  const event: TrackEvent = {
    e_a: toCenterVersion,
    e_n: fromCenterVersion,
    e_c: getPureTrackEventCategoryByState(state),
  }

  await trackRequest(event)
}
