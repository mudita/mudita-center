/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseLoader } from "App/device/loaders/base.loader"
import getDeviceInfo from "App/__deprecated__/renderer/requests/get-device-info.request"
import getNetworkInfo from "App/__deprecated__/renderer/requests/get-network-info.request"
import getStorageInfo from "App/__deprecated__/renderer/requests/get-storage-info.request"
import getBatteryInfo from "App/__deprecated__/renderer/requests/get-battery-info.request"
import { PureDeviceData } from "App/device/reducers/device.interface"
import { AppError } from "App/core/errors"
import { DeviceError } from "App/device/constants"

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
      throw new AppError(
        DeviceError.Loading,
        "Device data loading error",
        responses
      )
    }

    const [info, networkInfo, storageInfo, batteryInfo] = responses

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const networkName = this.getActiveNetworkFromSim(networkInfo.data!.simCards)
    const networkLevel = this.getActiveNetworkLevelFromSim(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      networkInfo.data!.simCards
    )

    return {
      networkName,
      networkLevel,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      osVersion: info.data!.osVersion,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      batteryLevel: batteryInfo.data!.level,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      simCards: networkInfo.data!.simCards,
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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      caseColour: info.data!.caseColour,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      backupLocation: info.data!.backupLocation,
    }
  }
}
