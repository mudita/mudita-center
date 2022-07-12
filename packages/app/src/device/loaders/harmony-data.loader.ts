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
      osVersion: info.data!.osVersion,
      batteryLevel: batteryInfo.data!.level,
      serialNumber: info.data!.serialNumber,
      memorySpace: {
        full: storageInfo.data!.capacity,
        free: storageInfo.data!.available,
      },
    }
  }
}
