/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface DiscoveryDeviceState {
  discoveryStatus: DiscoveryStatus
}

export enum DiscoveryStatus {
  Idle = "IDLE",
  Discovering = "DISCOVERING",
  Discovered = "DISCOVERED",
  Aborted = "ABORTED",
}
