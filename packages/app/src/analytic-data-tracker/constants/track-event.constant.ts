/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum TrackEventCategory {
  CenterVersion = "Center Version",
  HarmonyVersion = "Harmony Version",
  PureVersion = "Pure Version",
  PureUpdateStart = "Pure Update - start",
  PureUpdateSuccess = "Pure Update - success",
  PureUpdateFail = "Pure Update - fail",
  HarmonyUpdateStart = "Harmony Update - start",
  HarmonyUpdateSuccess = "Harmony Update - success",
  HarmonyUpdateFail = "Harmony Update - fail",
  CenterUpdateDownload = "Center Update - download",
  CenterUpdateStart = "Center Update - start",
  CenterUpdateFail = "Center Update - fail",
}

export enum TrackEventDimension {
  HarmonyVersion = "dimension8",
  PureVersion = "dimension9",
}
