/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { AppSettings } from "app-settings/renderer"
import {
  UsbAccessGrantedModal,
  UsbAccessProcessingModal,
  UsbAccessRequestCancelledModal,
  UsbAccessRequestModal,
  UsbAccessRestartRequiredModal,
} from "app-init/ui"
import { useUsbAccessStatus } from "./use-usb-access-status"
import { useGrantAccessToSerialPort } from "./use-usb-access"

enum UsbAccessFlowState {
  Unknown = "unknown",
  RequestAccess = "request-access",
  AccessGranted = "access-granted",
  Processing = "processing",
  AccessCancelled = "access-cancelled",
  RestartRequired = "restart-required",
}

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const UsbAccessFlow: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  const { isLoading, isError, hasAccess, restartRequired } =
    useUsbAccessStatus()
  const { mutateAsync: grantAccessToSerialPort } = useGrantAccessToSerialPort()
  const [usbAccessFlowState, setUsbAccessFlowState] = useState(
    UsbAccessFlowState.Unknown
  )

  useEffect(() => {
    if (!opened || isLoading || isError || hasAccess) {
      setUsbAccessFlowState(UsbAccessFlowState.Unknown)
    } else if (restartRequired) {
      setUsbAccessFlowState(UsbAccessFlowState.RestartRequired)
    } else if (!hasAccess) {
      setUsbAccessFlowState(UsbAccessFlowState.RequestAccess)
    } else {
      setUsbAccessFlowState(UsbAccessFlowState.AccessGranted)
    }
  }, [isLoading, isError, hasAccess, restartRequired, opened])

  const handleRequestModalAction = useCallback(async () => {
    setUsbAccessFlowState(UsbAccessFlowState.Processing)
    const result = await grantAccessToSerialPort()

    if (result.ok) {
      await AppSettings.set({
        system: { restartRequiredForSerialPortAccess: true },
      })
      setUsbAccessFlowState(UsbAccessFlowState.AccessGranted)
    } else {
      setUsbAccessFlowState(UsbAccessFlowState.AccessCancelled)
    }
  }, [grantAccessToSerialPort])

  const handleRequestModalClose = useCallback(async () => {
    setUsbAccessFlowState(UsbAccessFlowState.AccessCancelled)
  }, [])

  const handleRestartRequiredModalClose = useCallback(async () => {
    await AppSettings.set({
      system: { restartRequiredForSerialPortAccess: false },
    })
    onClose()
  }, [onClose])

  return (
    <>
      <UsbAccessRequestModal
        opened={usbAccessFlowState === UsbAccessFlowState.RequestAccess}
        onClose={handleRequestModalClose}
        onAction={handleRequestModalAction}
      />
      <UsbAccessGrantedModal
        opened={usbAccessFlowState === UsbAccessFlowState.AccessGranted}
        onClose={onClose}
        onAction={onClose}
      />
      <UsbAccessProcessingModal
        opened={usbAccessFlowState === UsbAccessFlowState.Processing}
      />
      <UsbAccessRequestCancelledModal
        opened={usbAccessFlowState === UsbAccessFlowState.AccessCancelled}
        onClose={onClose}
        onAction={onClose}
      />
      <UsbAccessRestartRequiredModal
        opened={usbAccessFlowState === UsbAccessFlowState.RestartRequired}
        onClose={handleRestartRequiredModalClose}
        onAction={handleRestartRequiredModalClose}
      />
    </>
  )
}
