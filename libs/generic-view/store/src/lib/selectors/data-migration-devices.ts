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
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  "0e8d.2006": {
    id: "devices.0e8d.2006.name",
  },
})

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
        if (!device.apiConfig) return undefined
        const name = intl.formatMessage(
          messages[
            `${device.apiConfig.vendorId}.${device.apiConfig.productId}` as keyof typeof messages
          ]
        )
        return {
          name,
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
      if (!device.apiConfig) return undefined
      const name = intl.formatMessage(
        messages[
          `${device.apiConfig.vendorId}.${device.apiConfig.productId}` as keyof typeof messages
        ]
      )
      return {
        name,
        image: kompaktImg, // TODO: Add variant support
        serialNumber: device.apiConfig.serialNumber!,
      }
    }
    return undefined
  }
)

export const selectCurrentDataMigrationDevices = createSelector(
  (state: ReduxRootState) => state.dataMigration,
  ({ sourceDevice, targetDevice }) => {
    return {
      sourceDevice,
      targetDevice,
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
