/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

<<<<<<<< HEAD:libs/device/models/src/lib/outbox/outbox.ts
export interface Outbox {
  features: string[]
  configuration: string[]
========
export enum DiscoveryDeviceEvent {
  SetDiscoveryStatus = "DISCOVERY_DEVICE_SET_DISCOVERY_STATUS",
>>>>>>>> develop:libs/core/discovery-device/constants/event.constant.ts
}
