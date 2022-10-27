/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { HarmonyDataLoader } from "App/device/loaders/harmony-data.loader"
import { PureDataLoader } from "App/device/loaders/pure-data.loader"

export class DeviceDataLoader {
  static loadersMapper = {
    [DeviceType.MuditaPure]: PureDataLoader,
    [DeviceType.MuditaHarmony]: HarmonyDataLoader,
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async loadDeviceData(deviceType: DeviceType) {
    return new DeviceDataLoader.loadersMapper[deviceType]().load()
  }
}
