/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { Feature, flags } from "App/feature-flags"

class OsReleasesManager {
  public static isProductionAvaible(): boolean {
    return flags.get(Feature.OsProductionReleaseAvaible)
  }
  public static isTestProductionAvaible(): boolean {
    return flags.get(Feature.OsTestProductionReleaseAvaible)
  }
  public static isProductionAlphaAvaible(): boolean {
    return flags.get(Feature.OsProductionAlphaReleaseAvaible)
  }
  public static isTestProductionAlphaAvaible(): boolean {
    return flags.get(Feature.OsTestProductionAlphaAvaible)
  }
}

export default OsReleasesManager
