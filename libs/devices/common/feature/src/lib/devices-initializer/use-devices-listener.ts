/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPort } from "app-serialport/renderer"
import { useCallback, useEffect } from "react"
import {
  getActiveDevice,
  useActiveDeviceQuery,
  useDevicesQuery,
} from "../hooks"
import { useAppDispatch } from "app-store/utils"
import { useQueryClient } from "@tanstack/react-query"
import { SerialPortDeviceId, SerialPortDeviceInfo } from "app-serialport/models"
import { devicesQueryKeys } from "../hooks/devices-query-keys"
import { NewsPaths } from "news/models"
import { DevicesPaths } from "devices/common/models"
import { getCurrentPath, useAppNavigate } from "app-routing/utils"
import { setDevicesDrawerVisibility } from "../store/devices.actions"

export const useDevicesListener = () => {
  const dispatch = useAppDispatch()
  const navigate = useAppNavigate()
  const queryClient = useQueryClient()

  const refetchDevicesQuery = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: useDevicesQuery.queryKey,
      exact: true,
    })
  }, [queryClient])

  const removeDeviceQueries = useCallback(
    (id: SerialPortDeviceId) => {
      queryClient.removeQueries({
        queryKey: devicesQueryKeys._device(id),
      })
    },
    [queryClient]
  )

  const invalidateActiveDeviceQuery = useCallback(() => {
    void queryClient.invalidateQueries({
      queryKey: devicesQueryKeys.activeDevice(),
    })
  }, [queryClient])

  const activateDevice = useCallback(
    (device: SerialPortDeviceInfo) => {
      queryClient.setQueryData(useActiveDeviceQuery.queryKey, {
        id: device.id,
        path: device.path,
        deviceType: device.deviceType,
        serialNumber: device.serialNumber,
        productId: device.productId,
        vendorId: device.vendorId,
        otherProductIds: device.otherProductIds,
        otherVendorIds: device.otherVendorIds,
        deviceSubtype: device.deviceSubtype,
      })
    },
    [queryClient]
  )

  useEffect(() => {
    AppSerialPort.onDevicesChanged(async ({ added, removed, all }) => {
      const pathname = getCurrentPath()
      const activeDevice = getActiveDevice(queryClient)

      for (const { id } of removed) {
        removeDeviceQueries(id)

        if (activeDevice?.id === id) {
          invalidateActiveDeviceQuery()
        }
      }

      await refetchDevicesQuery()

      // If user is on one of the active device pages and the active device was removed,
      // navigate the user to a proper page
      if (
        pathname.startsWith("/device/") &&
        removed.some(({ id }) => id === activeDevice?.id)
      ) {
        // If there are no devices left, navigate to the news page
        if (all.length === 0) {
          navigate({ pathname: NewsPaths.Index })
        }
        // or if there is one device left, navigate to the connecting page
        else if (all.length === 1) {
          navigate({ pathname: DevicesPaths.Connecting })
        }
        // or if there are multiple devices left, navigate to the selecting page
        else {
          navigate({ pathname: DevicesPaths.Selecting })
        }
      }

      // If there are one or no devices left after removal,
      // close the drawer
      if (removed.length > 0 && all.length <= 1) {
        dispatch(setDevicesDrawerVisibility(false))
      }

      // If there are new devices added and the user is not on one of the devices init pages,
      // open the drawer
      if (
        added.length > 0 &&
        !(pathname.startsWith(DevicesPaths.Index) || pathname === "/")
      ) {
        dispatch(setDevicesDrawerVisibility(true))
      }

      // If there is only one device available,
      // activate it by default
      if (all.length === 1) {
        activateDevice(all[0])
      }
    })
  }, [
    activateDevice,
    dispatch,
    invalidateActiveDeviceQuery,
    navigate,
    queryClient,
    refetchDevicesQuery,
    removeDeviceQueries,
  ])
}
