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
  (devices) =>
    devices
      .filter(({ deviceType }) => deviceType === "MuditaPure")
      .map(mapDevice)
)

export const selectDataMigrationTargetDevices = createSelector(
  (state: ReduxRootState) => state.genericViews.devicesConfiguration,
  (devices) => {
    return Object.values(devices)
      .map((device) => {
        if (!device.menuConfig || !device.apiConfig) return undefined
        return {
          name: device.menuConfig.title,
          image: kompaktImg, // TODO: Add variant support
          serialNumber: device.apiConfig.serialNumber,
        }
      })
      .filter(Boolean)
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
