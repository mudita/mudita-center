/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ApplicationUpdateError {
  UnableReadOSVersion = "UnableReadOSVersion",
  FetchReleaseFromGithub = "FetchReleaseFromGithub",
  DownloadOS = "DownloadOS",
}

export const ApplicationUpdateErrorCodeMap: Record<
  ApplicationUpdateError,
  number
> = {
  [ApplicationUpdateError.UnableReadOSVersion]: 9800,
  [ApplicationUpdateError.FetchReleaseFromGithub]: 9801,
  [ApplicationUpdateError.DownloadOS]: 9802,
}
