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
import {
  ErrorMessageMap,
  ErrorState,
} from "Core/device-initialization/components/passcode-modal/passcode-modal.component"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import PasscodeModalUI from "Core/device-initialization/components/passcode-modal/passcode-modal-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"
import {
  deviceLockTimeRequest,
  unlockDeviceRequest,
  unlockDeviceStatusRequest,
} from "Core/device/requests"
import {
  DeviceCommunicationError,
  getUnlockStatus,
  unlockDeviceById,
} from "Core/device"
import { PayloadAction } from "@reduxjs/toolkit"
import { delay } from "shared/utils"

interface Props {
  deviceId: DeviceId
  opened: boolean
  onClose: VoidFunction
  onUnlock: VoidFunction
}

const initValue = ["", "", "", ""]

export const PurePasscode: FunctionComponent<Props> = ({
  deviceId,
  opened,
  onClose,
  onUnlock,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const [errorState, setErrorState] = useState<ErrorState>(ErrorState.NoError)
  const [values, setValues] = useState<string[]>(initValue)
  const [leftTime, setLeftTime] = useState<number | undefined>(undefined)
  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  let timeoutId3: NodeJS.Timeout
  const lockTimeMonitorInterval = useRef<NodeJS.Timeout>()

  const handleModalClose = () => {
    setValues(initValue)
    onClose()
  }

  const onNotAllowedKeyDown = (): void => {
    clearTimeout(timeoutId3)
    setErrorState(ErrorState.TypingError)
    timeoutId3 = setTimeout(() => {
      setErrorState(ErrorState.NoError)
    }, 1500)
  }

  const monitorLockStatus = useCallback(() => {
    console.log("start monitoring lock status")
    lockTimeMonitorInterval.current = setInterval(async () => {
      const response = await deviceLockTimeRequest(deviceId)
      console.log({ response })
      if (response.ok) {
        const timeLeft = response.data?.timeLeftToNextAttempt
        setLeftTime(timeLeft)
        if (timeLeft && timeLeft <= 1) {
          clearInterval(lockTimeMonitorInterval.current)
        }
      } else {
        setLeftTime(undefined)
        clearInterval(lockTimeMonitorInterval.current)
      }
    }, 500)

    return () => clearInterval(lockTimeMonitorInterval.current)
  }, [deviceId])

  const unlockDevice = useCallback(
    async (code: number[]): Promise<void> => {
      const deviceUnlockResponse = (await dispatch(
        unlockDeviceById({
          code,
          deviceId,
        })
      )) as PayloadAction<"ok" | DeviceCommunicationError>

      console.log({ deviceUnlockResponse })

      switch (deviceUnlockResponse.payload) {
        case "ok":
          onUnlock()
          break
        case DeviceCommunicationError.DeviceLocked:
          setErrorState(ErrorState.BadPasscode)
          monitorLockStatus()
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

  // useEffect(() => {
  //   void (async () => {
  //     const lockTimeResponse = await deviceLockTimeRequest(deviceId)
  //     const lockStatusResponse = await unlockDeviceStatusRequest(deviceId)
  //
  //     console.log(lockTimeResponse, lockStatusResponse)
  //
  //     if (!lockStatusResponse.ok && lockTimeResponse.ok) {
  //       setErrorState(ErrorState.BadPasscode)
  //       monitorLockStatus()
  //     }
  //   })()
  // }, [deviceId, dispatch, monitorLockStatus])

  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     const result = await unlockDeviceStatusRequest(deviceId)
  //
  //     console.log({ result })
  //     if (!result.ok) {
  //       const response = await dispatch(deviceLockTimeRequest(deviceId))
  //       console.log({ response })
  //     }
  //   }, 15000)
  //
  //   return () => clearInterval(intervalId)
  // }, [deviceId, dispatch])

  // useEffect(() => {
  //   if (values[values.length - 1] !== "") {
  //     const code = values.map((value) => parseInt(value))
  //
  //     if (leftTime === undefined) {
  //       void unlockDevice(code)
  //     }
  //   } else {
  //     setErrorState(ErrorState.NoError)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [values])

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

  // useEffect(() => {
  //   let timeoutId: NodeJS.Timeout
  //
  //   if (
  //     errorState === ErrorState.BadPasscode ||
  //     errorState === ErrorState.InternalServerError
  //   ) {
  //     timeoutId = setTimeout(() => {
  //       setErrorState(ErrorState.NoError)
  //       setValues(initValue)
  //     }, 1500)
  //   }
  //
  //   return () => {
  //     clearTimeout(timeoutId)
  //   }
  // }, [errorState])

  return (
    <PasscodeModalUI
      openModal={opened}
      close={handleModalClose}
      errorMessage={ErrorMessageMap[errorState]}
      values={values}
      updateValues={setValues}
      openHelpWindow={openHelpWindow}
      onNotAllowedKeyDown={onNotAllowedKeyDown}
      leftTime={leftTime}
      canBeClosed={true}
      layer={ModalLayers.Passcode}
    />
  )
}
