/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { AppSettings } from "app-settings/renderer"
import {
  UsbAccessGrantedModal,
  UsbAccessPromptFailureModal,
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
  PromptFailure = "prompt-failure",
  RestartRequired = "restart-required",
}

const AUTHORIZATION_PROMPT_UNAVAILABLE_ERROR =
  "AuthorizationPromptUnavailable"

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const UsbAccessFlow: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  const {
    isLoading,
    isError,
    hasAccess,
    restartRequired,
    promptFailureSuppressed,
  } = useUsbAccessStatus()
  const { mutateAsync: grantAccessToSerialPort } = useGrantAccessToSerialPort()
  const [usbAccessFlowState, setUsbAccessFlowState] = useState(
    UsbAccessFlowState.Unknown
  )

  useEffect(() => {
    if (
      !opened ||
      isLoading ||
      isError ||
      hasAccess ||
      promptFailureSuppressed
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsbAccessFlowState(UsbAccessFlowState.Unknown)
    } else if (restartRequired) {
      setUsbAccessFlowState(UsbAccessFlowState.RestartRequired)
    } else if (!hasAccess) {
      setUsbAccessFlowState(UsbAccessFlowState.RequestAccess)
    } else {
      setUsbAccessFlowState(UsbAccessFlowState.AccessGranted)
    }
  }, [
    isLoading,
    isError,
    hasAccess,
    restartRequired,
    opened,
    promptFailureSuppressed,
  ])

  const handleRequestModalAction = useCallback(async () => {
    setUsbAccessFlowState(UsbAccessFlowState.Processing)
    const result = await grantAccessToSerialPort()

    if (result.ok) {
      await AppSettings.set({
        system: { restartRequiredForSerialPortAccess: true },
      })
      setUsbAccessFlowState(UsbAccessFlowState.AccessGranted)
    } else if (isAuthorizationPromptUnavailableError(result.error?.name)) {
      if (promptFailureSuppressed) {
        onClose()
      } else {
        setUsbAccessFlowState(UsbAccessFlowState.PromptFailure)
      }
    } else {
      setUsbAccessFlowState(UsbAccessFlowState.AccessCancelled)
    }
  }, [grantAccessToSerialPort, onClose, promptFailureSuppressed])

  const handleRequestModalClose = useCallback(async () => {
    setUsbAccessFlowState(UsbAccessFlowState.AccessCancelled)
  }, [])

  const handleRestartRequiredModalClose = useCallback(async () => {
    await AppSettings.set({
      system: { restartRequiredForSerialPortAccess: false },
    })
    onClose()
  }, [onClose])

  const handlePromptFailureModalAction = useCallback(
    async (suppressPromptFailureModal: boolean) => {
      if (suppressPromptFailureModal) {
        await AppSettings.set({
          system: { suppressUsbAccessPromptFailureModal: true },
        })
      }

      onClose()
    },
    [onClose]
  )

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
      <UsbAccessPromptFailureModal
        opened={usbAccessFlowState === UsbAccessFlowState.PromptFailure}
        onClose={onClose}
        onAction={handlePromptFailureModalAction}
      />
      <UsbAccessRestartRequiredModal
        opened={usbAccessFlowState === UsbAccessFlowState.RestartRequired}
        onClose={handleRestartRequiredModalClose}
        onAction={handleRestartRequiredModalClose}
      />
    </>
  )
}

const isAuthorizationPromptUnavailableError = (errorName?: string): boolean => {
  return errorName === AUTHORIZATION_PROMPT_UNAVAILABLE_ERROR
}
