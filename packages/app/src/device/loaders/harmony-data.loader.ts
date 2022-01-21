/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseLoader } from "App/device/loaders/base.loader"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import { DeviceLoadingError } from "App/device/errors"
import { HarmonyDeviceData } from "App/device/reducers/device.interface"
import store from "Renderer/store/index"
import { setDataSyncInitialized } from "App/data-sync/actions/base-app.action"

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
      throw new DeviceLoadingError("Device data loading error", responses)
    }

    const [info, storageInfo, batteryInfo] = responses

    return {
      osUpdateDate: info.data!.osUpdateDate,
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
