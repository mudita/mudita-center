/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceBaseProperties, DeviceType } from "device-protocol/models"

type GroupedEvents = {
  [key in DeviceType]: DeviceBaseProperties[]
}

export const groupEventsByDeviceType = (
  events: DeviceBaseProperties[]
): GroupedEvents => {
  return events.reduce(
    (acc, event) => {
      acc[event.deviceType].push(event)
      return acc
    },
    {
      [DeviceType.MuditaPure]: [],
      [DeviceType.MuditaHarmony]: [],
      [DeviceType.MuditaHarmonyMsc]: [],
      [DeviceType.APIDevice]: [],
    } as GroupedEvents
  )
}
