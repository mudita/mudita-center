/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { kompaktImg } from "Root/demo-data/kompakt-img"
import { getCoreDevicesSelector } from "core-device/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectConfiguredDevices } from "./select-configured-devices"
import { selectActiveApiDeviceId } from "./select-active-api-device-id"
import { getBaseDeviceInfo } from "generic-view/utils"
import { BaseDevice } from "generic-view/models"
import { DataMigrationStatus } from "../data-migration/reducer"
import { selectDataMigrationStatus } from "./data-migration-status"

// FIXME: The device name should be moved to the API config response of API device
const messages = {
  "0e8d.2006": "Kompakt",
}

export const selectDataMigrationSourceDevices = createSelector(
  getCoreDevicesSelector,
  selectDataMigrationStatus,
  (state: ReduxRootState) => state.dataMigration.sourceDevice,
  (devices, dataMigrationStatus, sourceDevice) => {
    const availableDevices = devices
      .filter(({ deviceType }) => deviceType === "MuditaPure")
      .map(getBaseDeviceInfo)

    const sourceDeviceDisconnected =
      [
        DataMigrationStatus.PureDatabaseIndexing,
        DataMigrationStatus.PureDatabaseCreating,
      ].includes(dataMigrationStatus) &&
      sourceDevice &&
      !availableDevices.find(
        (device) => device.serialNumber === sourceDevice.serialNumber
      )
    return [
      ...(sourceDeviceDisconnected
        ? [{ ...sourceDevice, disconnected: true }]
        : []),
      ...availableDevices,
    ] as BaseDevice[]
  }
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
        } as BaseDevice
      })
      .filter(Boolean)
  }
)

export const selectDataMigrationSourceDevice = createSelector(
  selectDataMigrationSourceDevices,
  (state: ReduxRootState) => state.dataMigration.sourceDevice,
  (devices, sourceDevice) => {
    return devices.find(
      (device) => device?.serialNumber === sourceDevice?.serialNumber
    )
  }
)

export const selectDataMigrationTargetDevice = createSelector(
  selectDataMigrationTargetDevices,
  selectActiveApiDeviceId,
  (devices, activeDeviceId) => {
    return devices.find((device) => device?.serialNumber === activeDeviceId)
  }
)
