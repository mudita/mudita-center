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
import { getUnlockStatus, unlockDeviceById } from "Core/device"
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
    onClose()
    setValues(initValue)
  }

  const onNotAllowedKeyDown = (): void => {
    clearTimeout(timeoutId3)
    setErrorState(ErrorState.TypingError)
    timeoutId3 = setTimeout(() => {
      setErrorState(ErrorState.NoError)
    }, 1500)
  }

  const unlockDevice = useCallback(
    async (code: number[]): Promise<void> => {
      const deviceUnlockResponse = await dispatch(
        unlockDeviceById({
          code,
          deviceId,
        })
      )

      console.log({ deviceUnlockResponse })
      // await delay(500)
      //
      // const unlockStatus = await unlockDeviceStatusRequest(deviceId)
      //
      // console.log({ unlockStatus })
      // if (!unlockStatus.ok) {
      //   setErrorState(ErrorState.BadPasscode)
      //   monitorLockStatus()
      //   return
      // }
      // if (!unlockStatus.data) {
      //   setErrorState(ErrorState.InternalServerError)
      //   return
      // }
      //
      // onUnlock()
    },
    [deviceId, dispatch]
  )

  const monitorLockStatus = useCallback(() => {
    lockTimeMonitorInterval.current = setInterval(async () => {
      const response = await deviceLockTimeRequest(deviceId)
      if (response.ok) {
        const timeLeft = response.data?.timeLeftToNextAttempt
        setLeftTime(timeLeft)
        if (!timeLeft) {
          clearInterval(lockTimeMonitorInterval.current)
        }
      }
    }, 500)

    return () => clearInterval(lockTimeMonitorInterval.current)
  }, [deviceId])

  useEffect(() => {
    void (async () => {
      const lockTimeResponse = await deviceLockTimeRequest(deviceId)
      const lockStatusResponse = await unlockDeviceStatusRequest(deviceId)

      console.log(lockTimeResponse, lockStatusResponse)

      if (!lockStatusResponse.ok && lockTimeResponse.ok) {
        setErrorState(ErrorState.BadPasscode)
        monitorLockStatus()
      }
    })()
  }, [deviceId, dispatch, monitorLockStatus])

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

  useEffect(() => {
    if (values[values.length - 1] !== "") {
      const code = values.map((value) => parseInt(value))

      if (leftTime === undefined) {
        void unlockDevice(code)
      }
    } else {
      setErrorState(ErrorState.NoError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (
      errorState === ErrorState.BadPasscode ||
      errorState === ErrorState.InternalServerError
    ) {
      timeoutId = setTimeout(() => {
        setErrorState(ErrorState.NoError)
        setValues(initValue)
      }, 1500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [errorState])

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
