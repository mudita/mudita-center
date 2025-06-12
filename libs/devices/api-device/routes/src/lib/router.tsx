/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Navigate, Route, useNavigate, useParams } from "react-router"
import { FunctionComponent, useCallback, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { DevicesPaths, DeviceStatus } from "devices/common/models"
import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  Device,
  useActiveDevice,
  useDeviceConfig,
  useDeviceMenu,
  useDevices,
  useDeviceStatus,
} from "devices/common/feature"
import { ApiDeviceErrorType, ApiDevicePaths } from "devices/api-device/models"
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

  const { isLoading: isConfigLoading, isError: isConfigError } =
    useDeviceConfig(activeApiDevice)
  const {
    data: menu,
    isLoading: isMenuLoading,
    isError: isMenuError,
    isSuccess: isMenuSuccess,
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
    if (menuFailureReason === ApiDeviceErrorType.DeviceLocked) {
      queryClient.setQueryData(
        useDeviceStatus.queryKey(activeApiDevice.path),
        DeviceStatus.Locked
      )
      return
    }
    queryClient.setQueryData(
      useDeviceStatus.queryKey(activeApiDevice.path),
      DeviceStatus.Initialized
    )
  }, [
    activeApiDevice,
    isConfigError,
    isConfigLoading,
    isMenuError,
    isMenuLoading,
    menuFailureCount,
    menuFailureReason,
    queryClient,
  ])

  return {
    initialization:
      activeApiDevice &&
      (isDeviceLocked ? (
        <Route index element={<DeviceLockedPage />} />
      ) : (
        isMenuSuccess && (
          <Route
            index
            element={<Navigate to={ApiDevicePaths.Index} replace />}
          />
        )
      )),
    dashboard: (
      <Route path={ApiDevicePaths.Index}>
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
        <Route path={ApiDevicePaths.View} element={<GenericView />} />
      </Route>
    ),
  }
}

const DeviceLockedPage: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { getPreviousPath } = useRoutingHistory()
  const { data: devices = [] } = useDevices()

  const onPasscodeAbort = useCallback(() => {
    const previousPath = getPreviousPath((path) => {
      return !path.startsWith(DevicesPaths.Index)
    })
    if (devices.length > 1) {
      queryClient.removeQueries({ queryKey: useActiveDevice.queryKey })
    }
    navigate({ pathname: previousPath })
  }, [devices.length, getPreviousPath, navigate, queryClient])

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
