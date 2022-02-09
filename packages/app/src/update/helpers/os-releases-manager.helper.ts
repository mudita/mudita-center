/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Feature, flags } from "App/feature-flags"

export class OsReleasesManager {
  public static isProductionAvailable(): boolean {
    return flags.get(Feature.OsProductionReleaseAvailable)
  }
  public static isTestProductionAvailable(): boolean {
    return flags.get(Feature.OsTestProductionReleaseAvailable)
  }
  public static isProductionAlphaAvailable(): boolean {
    return flags.get(Feature.OsProductionAlphaReleaseAvailable)
  }
  public static isTestProductionAlphaAvailable(): boolean {
    return flags.get(Feature.OsTestProductionAlphaReleaseAvailable)
  }
}
