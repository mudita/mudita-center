/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseLoader } from "App/device/loaders/base.loader"
import getDeviceInfo from "App/__deprecated__/renderer/requests/get-device-info.request"
import getStorageInfo from "App/__deprecated__/renderer/requests/get-storage-info.request"
import getBatteryInfo from "App/__deprecated__/renderer/requests/get-battery-info.request"
import { HarmonyDeviceData } from "App/device/reducers/device.interface"
import store from "App/__deprecated__/renderer/store/index"
import { setDataSyncInitialized } from "App/data-sync/actions/base-app.action"
import { DeviceError } from "App/device/constants"
import { AppError } from "App/core/errors"

type HarmonyData = Partial<HarmonyDeviceData>

export class HarmonyDataLoader extends BaseLoader {
  async load(): Promise<HarmonyData> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    store.dispatch(setDataSyncInitialized())

    const responses = await Promise.all([
      getDeviceInfo(),
      getStorageInfo(),
      getBatteryInfo(),
    ])

    const status = this.isResponsesSuccessWithData(responses)

    if (!status) {
      throw new AppError(
        DeviceError.Loading,
        "Device data loading error",
        responses
      )
    }

    const [info, storageInfo, batteryInfo] = responses

    return {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      osVersion: info.data!.osVersion,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      batteryLevel: batteryInfo.data!.level,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      serialNumber: info.data!.serialNumber,
      memorySpace: {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        usedUserSpace: storageInfo.data!.usedUserSpace,
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        reservedSpace: storageInfo.data!.reservedSpace,
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        total: storageInfo.data!.totalSpace,
      },
    }
  }
}
