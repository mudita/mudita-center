/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum Product {
  Harmony = "MuditaHarmony",
  HarmonyMsc = "MuditaHarmonyMsc",
  Pure = "MuditaPure",
  Kompakt = "MuditaKompakt",
}

/**
 * Legacy product IDs kept for compatibility with external services and S3.
 *
 * @deprecated Replace with `Product` once S3 uses updated identifiers.
 */
export enum LegacyProduct {
  PurePhone = "PurePhone",
  BellHybrid = "BellHybrid",
}
