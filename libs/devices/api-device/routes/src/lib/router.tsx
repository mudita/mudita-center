/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route, useParams } from "react-router"
import { useAppNavigate } from "app-routing/utils"
import { FunctionComponent, useCallback, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { apiDevicePaths } from "./paths"
import {
  DeviceStatus,
  DeviceMetadata,
  DevicesPaths,
} from "devices/common/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  Device,
  useActiveDevice,
  useDeviceConfig,
  useDeviceMenu,
  useDeviceMetadata,
  useDeviceStatus,
} from "devices/common/feature"
import { ApiDeviceErrorType } from "devices/api-device/models"
import { Modal, Typography } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { useRoutingHistory } from "app-routing/feature"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  passcodeModalTitle: {
    id: "apiDevice.passcodeModal.title",
  },
  passcodeModalDescription: {
    id: "apiDevice.passcodeModal.description",
  },
})

export const useApiDeviceRouter = (device?: Device) => {
  const queryClient = useQueryClient()

  const activeApiDevice = ApiDeviceSerialPort.isCompatible(device)
    ? device
    : undefined

  const {
    isLoading: isConfigLoading,
    isError: isConfigError,
    isSuccess: isConfigSuccess,
  } = useDeviceConfig(activeApiDevice)
  const {
    data: menu,
    isLoading: isMenuLoading,
    isError: isMenuError,
    failureReason: menuFailureReason,
    failureCount: menuFailureCount,
  } = useDeviceMenu<ApiDeviceErrorType>(activeApiDevice)

  const isDeviceLocked = menuFailureReason === ApiDeviceErrorType.DeviceLocked

  // Define the device status
  useEffect(() => {
    if (!activeApiDevice) {
      return
    }

    if (isConfigLoading || (isMenuLoading && menuFailureCount < 3)) {
      queryClient.setQueryData(
        useDeviceStatus.queryKey(activeApiDevice.path),
        DeviceStatus.Initializing
      )
      return
    }
    if (
      isConfigError ||
      (isMenuError && menuFailureReason !== ApiDeviceErrorType.DeviceLocked)
    ) {
      queryClient.setQueryData(
        useDeviceStatus.queryKey(activeApiDevice.path),
        DeviceStatus.CriticalError
      )
      return
    }
    if (isConfigSuccess) {
      queryClient.setQueryData(
        useDeviceStatus.queryKey(activeApiDevice.path),
        DeviceStatus.Initialized
      )

      queryClient.setQueryData(
        useDeviceMetadata.queryKey(activeApiDevice.path),
        (currentData: DeviceMetadata) => {
          if (currentData) {
            return {
              ...currentData,
              locked: isDeviceLocked,
            }
          }
          return null
        }
      )
    }
  }, [
    activeApiDevice,
    isConfigError,
    isConfigLoading,
    isConfigSuccess,
    isDeviceLocked,
    isMenuError,
    isMenuLoading,
    menuFailureCount,
    menuFailureReason,
    queryClient,
  ])

  if (!activeApiDevice) {
    return null
  }

  return {
    initialization: isDeviceLocked ? (
      <Route index element={<DeviceLockedPage />} />
    ) : (
      <Route index element={<Navigate to={apiDevicePaths.index} replace />} />
    ),
    dashboard: (
      <Route path={apiDevicePaths.index}>
        <Route
          index
          element={<Navigate to={menu?.items?.[0]?.path as string} replace />}
        />
        {menu?.items?.map((item) => {
          if (item.items?.length) {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<Navigate to={item.items[0].path} />}
              />
            )
          }
          return null
        })}
        <Route path={apiDevicePaths.view} element={<GenericView />} />
      </Route>
    ),
  }
}

const DeviceLockedPage: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const navigate = useAppNavigate()
  const { getPreviousPath } = useRoutingHistory()

  const onPasscodeAbort = useCallback(() => {
    const previousPath = getPreviousPath((path) => {
      return !path.startsWith(DevicesPaths.Index)
    })
    queryClient.removeQueries({ queryKey: useActiveDevice.queryKey })
    navigate({ pathname: previousPath })
  }, [getPreviousPath, navigate, queryClient])

  return (
    <Modal opened>
      <Modal.CloseButton onClick={onPasscodeAbort} />
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title>{formatMessage(messages.passcodeModalTitle)}</Modal.Title>
      <Typography.P1>
        {formatMessage(messages.passcodeModalDescription)}
      </Typography.P1>
    </Modal>
  )
}

// Demo generic view component
const GenericView: FunctionComponent = () => {
  const { viewKey, subviewKey } = useParams()

  return (
    <div>
      <h1>View: {viewKey}</h1>
      {subviewKey ? <h2>Subview: {subviewKey}</h2> : <h2>No subview</h2>}
    </div>
  )
}
