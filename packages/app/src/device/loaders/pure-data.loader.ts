/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseLoader } from "App/device/loaders/base.loader"
import getDeviceInfo from "App/__deprecated__/renderer/requests/get-device-info.request"
import getNetworkInfo from "App/__deprecated__/renderer/requests/get-network-info.request"
import getStorageInfo from "App/__deprecated__/renderer/requests/get-storage-info.request"
import getBatteryInfo from "App/__deprecated__/renderer/requests/get-battery-info.request"
import { DeviceLoadingError } from "App/device/errors"
import { PureDeviceData } from "App/device/reducers/device.interface"

type PureData = Partial<PureDeviceData>

export class PureDataLoader extends BaseLoader {
  async load(): Promise<PureData> {
    const responses = await Promise.all([
      getDeviceInfo(),
      getNetworkInfo(),
      getStorageInfo(),
      getBatteryInfo(),
    ])

    const status = this.isResponsesSuccessWithData(responses)

    if (!status) {
      throw new DeviceLoadingError("Device data loading error", responses)
    }

    const [info, networkInfo, storageInfo, batteryInfo] = responses

    const networkName = this.getActiveNetworkFromSim(networkInfo.data!.simCards)
    const networkLevel = this.getActiveNetworkLevelFromSim(
      networkInfo.data!.simCards
    )

    return {
      networkName,
      networkLevel,
      osVersion: info.data!.osVersion,
      batteryLevel: batteryInfo.data!.level,
      simCards: networkInfo.data!.simCards,
      serialNumber: info.data!.serialNumber,
      memorySpace: {
        full: storageInfo.data!.capacity,
        free: storageInfo.data!.available,
        total: storageInfo.data!.totalSpace,
      },
      caseColour: info.data!.caseColour,
      backupLocation: info.data!.backupLocation,
    }
  }
}
