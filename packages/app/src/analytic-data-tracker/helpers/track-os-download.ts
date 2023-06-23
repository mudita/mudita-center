/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { trackRequest } from "App/analytic-data-tracker/requests"
import { TrackEvent } from "App/analytic-data-tracker/types"
import { TrackEventCategory } from "App/analytic-data-tracker/constants"
import { OsEnvironment } from "App/update/constants"
import { Product } from "App/__deprecated__/main/constants"

export interface TrackOsDownloadOptions {
  version: string
  product: Product
  environment: OsEnvironment
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

export const trackOsDownload = async (
  options: TrackOsDownloadOptions
): Promise<void> => {
  const { version, environment, product } = options

  const e_a = version
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
