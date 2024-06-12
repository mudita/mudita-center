/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "@reduxjs/toolkit"
// TODO: fix imports
// import pureBlackImage from "Core/__deprecated__/renderer/images/pure-black-render.png"
// import pureGreyImage from "Core/__deprecated__/renderer/images/pure-gray-render.png"
import { kompaktImg } from "Root/demo-data/kompakt-img"
import { selectConfiguredDevices } from "./select-configured-devices"
import { selectActiveApiDeviceId } from "./select-active-api-device-id"
import { getDeviceTypeName } from "Core/discovery-device/utils/get-device-type-name"

// FIXME: The device name should be moved to the API config response of API device
const messages = {
  "0e8d.2006": "Kompakt",
}

export const selectDataMigrationSourceDevices = createSelector(
  (state: ReduxRootState) => state.coreDevice.devices,
  (devices) =>
    devices
      .filter(({ deviceType }) => deviceType === "MuditaPure")
      .map((device) => ({
        name: getDeviceTypeName(device.deviceType!),
        // image: device.caseColour === "black" ? pureBlackImage : pureGreyImage,
        image: kompaktImg,
        serialNumber: device.serialNumber!,
      }))
)

export const selectDataMigrationTargetDevices = createSelector(
  selectConfiguredDevices,
  (devices) => {
    return Object.values(devices)
      .map((device) => {
        if (!device.apiConfig) return undefined
        const name =
          messages[
            `${device.apiConfig.vendorId}.${device.apiConfig.productId}` as keyof typeof messages
          ]
        return {
          name,
          image: kompaktImg, // TODO: Add variant support
          serialNumber: device.apiConfig.serialNumber!,
        }
      })
      .filter(Boolean)
  }
)

export const selectDataMigrationSourceDevice = createSelector(
  selectDataMigrationSourceDevices,
  (state: ReduxRootState) => state.dataMigration.sourceDevice,
  (devices, sourceDeviceId) =>
    devices.find((device) => device?.serialNumber === sourceDeviceId)
)

export const selectDataMigrationTargetDevice = createSelector(
  selectDataMigrationTargetDevices,
  selectActiveApiDeviceId,
  (devices, activeDeviceId) => {
    return devices.find((device) => device?.serialNumber === activeDeviceId)
  }
)
