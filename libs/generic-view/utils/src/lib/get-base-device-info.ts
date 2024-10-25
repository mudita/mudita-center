/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProperties } from "device-manager/models"
import { getDeviceTypeName } from "Core/discovery-device/utils/get-device-type-name"
import pureBlackImage from "Core/__deprecated__/renderer/images/pure-black-render.png"
import pureGreyImage from "Core/__deprecated__/renderer/images/pure-gray-render.png"
import { BaseDevice } from "generic-view/models"

export const getBaseDeviceInfo = (device: DeviceProperties): BaseDevice => {
  return {
    name: getDeviceTypeName(device.deviceType!),
    image: device.caseColour === "black" ? pureBlackImage : pureGreyImage,
    serialNumber: device.serialNumber!,
  }
}
