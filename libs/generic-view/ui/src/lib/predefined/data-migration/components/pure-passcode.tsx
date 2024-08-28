/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { DeviceCommunicationError } from "core-device/models"
import {
  ErrorMessageMap,
  ErrorState,
} from "Core/device-initialization/components/passcode-modal/passcode-modal.component"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import PasscodeModalUI from "Core/device-initialization/components/passcode-modal/passcode-modal-ui.component"
import { deviceLockTimeRequest } from "Core/device/requests"
import { unlockDeviceById } from "Core/device"
import { PayloadAction } from "@reduxjs/toolkit"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { useHelpShortcut } from "help/store"

interface Props {
  deviceId: DeviceId
  onClose: VoidFunction
  onUnlock: VoidFunction
}

const initValue = ["", "", "", ""]

export const PurePasscode: FunctionComponent<Props> = ({
  deviceId,
  onClose,
  onUnlock,
}) => {
  const openHelpShortcut = useHelpShortcut()
  const dispatch = useDispatch<Dispatch>()
  const [errorState, setErrorState] = useState<ErrorState>(ErrorState.NoError)
  const [values, setValues] = useState<string[]>(initValue)
  const [leftTime, setLeftTime] = useState<number | undefined>(undefined)

  const notAllowedTimeout = useRef<NodeJS.Timeout>()
  const lockTimeMonitorInterval = useRef<NodeJS.Timeout>()
  const unlockMonitorInterval = useRef<NodeJS.Timeout>()

  const openHelpWindow = () => {
    openHelpShortcut("pure-password-forgotten")
  }

  const handleModalClose = () => {
    setValues(initValue)
    onClose()
  }

  const onNotAllowedKeyDown = (): void => {
    clearTimeout(notAllowedTimeout.current)
    setErrorState(ErrorState.TypingError)
    notAllowedTimeout.current = setTimeout(() => {
      setErrorState(ErrorState.NoError)
    }, 1500)
  }

  const monitorLockStatus = useCallback(async () => {
    const checkStatus = async () => {
      const response = await deviceLockTimeRequest(deviceId)
      if (response.ok) {
        const timeLeft = response.data?.timeLeftToNextAttempt
        setLeftTime(timeLeft)
        if (timeLeft && timeLeft <= 1) {
          setLeftTime(undefined)
          clearInterval(lockTimeMonitorInterval.current)
        }
      } else {
        setLeftTime(undefined)
        clearInterval(lockTimeMonitorInterval.current)
      }
    }
    await checkStatus()
    lockTimeMonitorInterval.current = setInterval(checkStatus, 5000)

    return () => {
      clearInterval(lockTimeMonitorInterval.current)
    }
  }, [deviceId])

  const unlockDevice = useCallback(
    async (code: number[]): Promise<void> => {
      const deviceUnlockResponse = (await dispatch(
        unlockDeviceById({
          code,
          deviceId,
        })
      )) as PayloadAction<"ok" | DeviceCommunicationError>

      switch (deviceUnlockResponse.payload) {
        case "ok":
          onUnlock()
          break
        case DeviceCommunicationError.DeviceLocked:
          setErrorState(ErrorState.BadPasscode)
          void monitorLockStatus()
          break
        default:
          setErrorState(ErrorState.InternalServerError)
      }
    },
    [deviceId, dispatch, monitorLockStatus, onUnlock]
  )

  useEffect(() => {
    if (values.every((value) => value !== "")) {
      void unlockDevice(values.map((value) => parseInt(value)))
    }
  }, [unlockDevice, values])

  useEffect(() => {
    unlockMonitorInterval.current = setInterval(async () => {
      const response = await getDeviceInfoRequest(deviceId)
      if (response.ok) {
        onUnlock()
      }
    }, 1000)

    return () => {
      clearInterval(unlockMonitorInterval.current)
    }
  }, [deviceId, onUnlock])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (
      errorState === ErrorState.BadPasscode ||
      errorState === ErrorState.InternalServerError
    ) {
      timeout = setTimeout(() => {
        setErrorState(ErrorState.NoError)
        setValues(initValue)
      }, 1500)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [errorState])

  return (
    <PasscodeModalUI
      openModal={true}
      close={handleModalClose}
      errorMessage={ErrorMessageMap[errorState]}
      values={values}
      updateValues={setValues}
      openHelpWindow={openHelpWindow}
      onNotAllowedKeyDown={onNotAllowedKeyDown}
      leftTime={leftTime}
      canBeClosed={true}
      layer={ModalLayers.Passcode}
      noOverlayBg={false}
    />
  )
}
