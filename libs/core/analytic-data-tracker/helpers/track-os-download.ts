/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { trackRequest } from "Core/analytic-data-tracker/requests"
import { TrackEvent } from "Core/analytic-data-tracker/types"
import { TrackEventCategory } from "Core/analytic-data-tracker/constants"
import { OsEnvironment } from "Core/update/constants"
import { Product } from "Core/__deprecated__/main/constants"

export interface TrackOsDownloadOptions {
  version: string
  product: Product
  environment: OsEnvironment
  latest: boolean
}

const getTrackEventCategory = (
  environment: OsEnvironment,
  product: Product
): string | undefined => {
  const productionPrefix =
    environment === OsEnvironment.Production ? "" : `${environment} `
  if (product === Product.BellHybrid) {
    return `${productionPrefix}${TrackEventCategory.HarmonyUpdateDownload}`
  } else if (product === Product.PurePhone) {
    return `${productionPrefix}${TrackEventCategory.PureUpdateDownload}`
  }

  return
}

const getTrackEventAction = (version: string, latest: boolean): string => {
  if (latest) {
    return `latest - ${version}`
  } else {
    return version
  }
}

export const trackOsDownload = async (
  options: TrackOsDownloadOptions
): Promise<void> => {
  const { version, environment, product, latest } = options

  const e_a = getTrackEventAction(version, latest)
  const e_c = getTrackEventCategory(environment, product)

  if (e_c === undefined) {
    return
  }

  const event: TrackEvent = {
    e_a,
    e_c,
  }

  await trackRequest(event)
}
