/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface TrackOsVersionCache {
  osVersion: string
  serialNumber: string
}

const trackOsVersionCache: TrackOsVersionCache = {
  osVersion: "",
  serialNumber: "",
}

export const getTrackOsVersionCache = (): TrackOsVersionCache => trackOsVersionCache
