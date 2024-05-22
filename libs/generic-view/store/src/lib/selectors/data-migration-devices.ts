/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "@reduxjs/toolkit"
import pureBlackImage from "Core/__deprecated__/renderer/images/pure-black-render.png"
import pureGreyImage from "Core/__deprecated__/renderer/images/pure-gray-render.png"
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
      .map((device) => ({
        name: device.deviceType!,
        image: device.caseColour === "black" ? pureBlackImage : pureGreyImage,
        serialNumber: device.serialNumber!,
      }))
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
  (state: ReduxRootState) => state.genericViews.activeDevice,
  (devices, activeDeviceId) => {
    return devices.find((device) => device?.serialNumber === activeDeviceId)
  }
)
