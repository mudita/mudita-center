/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "@reduxjs/toolkit"
import pureBlackImage from "Core/__deprecated__/renderer/images/pure-black-render.png"
import pureGreyImage from "Core/__deprecated__/renderer/images/pure-gray-render.png"
import { Device } from "Core/device-manager/reducers/device-manager.interface"
import { kompaktImg } from "Root/demo-data/kompakt-img"

export const selectDataMigrationSourceDevices = createSelector(
  (state: ReduxRootState) => state.deviceManager.devices,
  // TODO: Update to use Pure devices from the store
  (devices) => [
    {
      name: "Pure",
      image: pureBlackImage,
      serialNumber: "2077502072",
    },
    // {
    //   name: "Pure",
    //   image: pureGreyImage,
    //   serialNumber: "1234567890",
    // },
    // {
    //   name: "Pure",
    //   image: pureGreyImage,
    //   serialNumber: "0987654321",
    // },
  ]
)

export const selectDataMigrationTargetDevices = createSelector(
  (state: ReduxRootState) => state.genericViews.devicesConfiguration,
  (devices) => {
    return Object.values(devices).map((device) => {
      return {
        name: device.menuConfig!.title!,
        image: kompaktImg, // TODO: Add variant support
        serialNumber: device.apiConfig.serialNumber!,
      }
    })
  }
)

export const selectDataMigrationTargetDevice = createSelector(
  (state: ReduxRootState) => state.genericViews.devicesConfiguration,
  (state: ReduxRootState) => state.genericViews.activeDevice,
  (devicesConfiguration, activeDevice) => {
    const device = activeDevice ? devicesConfiguration[activeDevice] : undefined
    if (device) {
      return {
        name: device.menuConfig!.title!,
        image: kompaktImg, // TODO: Add variant support
        serialNumber: device.apiConfig.serialNumber!,
      }
    }
    return undefined
  }
)

export const selectCurrentDataMigrationDevices = createSelector(
  selectDataMigrationSourceDevices,
  selectDataMigrationTargetDevice,
  (state: ReduxRootState) => state.dataMigration.sourceDevice,
  (devices, targetDevice, sourceDevice) => {
    return {
      sourceDevice: devices.find(
        (device) => device.serialNumber === sourceDevice
      ),
      targetDevice: targetDevice,
    }
  }
)

const mapDevice = (device: Device) => {
  return {
    name: device.deviceType!,
    image: device.caseColour === "black" ? pureBlackImage : pureGreyImage,
    serialNumber: device.serialNumber!,
  }
}
