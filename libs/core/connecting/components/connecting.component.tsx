/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { PayloadAction } from "@reduxjs/toolkit"
import { DeviceType, CONNECTION_TIME_OUT_MS } from "Core/device/constants"
import {
  URL_MAIN,
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import ConnectingContent from "Core/connecting/components/connecting-content.component"
import ErrorConnectingModal from "Core/connecting/components/error-connecting-modal"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import PasscodeModal from "Core/__deprecated__/passcode-modal/components/passcode-modal.component"
import { SynchronizationState } from "Core/data-sync/reducers"
import ErrorSyncModal from "Core/connecting/components/error-sync-modal/error-sync-modal"
import { ConnectingError } from "Core/connecting/components/connecting-error.enum"
import { AppError } from "Core/core/errors"
import CriticalBatteryLevelModal from "Core/connecting/components/critical-battery-level-modal/critical-battery-level-modal"
import ErrorUpdateModal from "Core/connecting/components/error-update-modal/error-update-modal"
import { offCurrentDeviceChangedListener } from "Core/device-manager/listeners"

const Connecting: FunctionComponent<{
  loaded: boolean
  deviceType: DeviceType | null
  unlocked: boolean | null
  syncInitialized: boolean
  syncState: SynchronizationState
  unlockDevice: (code: number[]) => Promise<PayloadAction<boolean>>
  getUnlockStatus: () => Promise<PayloadAction<boolean | AppError>>
  leftTime: number | undefined
  noModalsVisible: boolean
  forceOsUpdateFailed: boolean
  checkingForOsForceUpdate: boolean
  updateAllIndexes: () => Promise<void>
  passcodeModalCloseable: boolean
  criticalBatteryLevel: boolean
  onboardingFinished: boolean
}> = ({
  loaded,
  deviceType,
  unlocked,
  syncInitialized,
  syncState,
  unlockDevice,
  getUnlockStatus,
  leftTime,
  noModalsVisible,
  updateAllIndexes,
  forceOsUpdateFailed,
  checkingForOsForceUpdate,
  passcodeModalCloseable,
  criticalBatteryLevel,
  onboardingFinished,
}) => {
  const [error, setError] = useState<ConnectingError | null>(null)
  const [longerConnection, setLongerConnection] = useState(false)
  const [passcodeOpenModal, setPasscodeOpenModal] = useState(false)
  const [criticalBatteryLevelOpenModal, setCriticalBatteryLevelOpenModal] =
    useState(false)

  const history = useHistory()

  useEffect(() => {
    if (deviceType === DeviceType.MuditaHarmony) {
      return
    }
    if (!onboardingFinished) {
      return
    }

    const timeout = setTimeout(() => {
      setLongerConnection(true)
    }, 6000)
    return () => clearTimeout(timeout)
  }, [deviceType, onboardingFinished])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        unlocked &&
        loaded &&
        syncInitialized &&
        !checkingForOsForceUpdate &&
        !forceOsUpdateFailed
      ) {
        history.push(URL_OVERVIEW.root)
      }
    }, 500)

    // TODO: how to avoid window jumping by loading setting async action
    if (!onboardingFinished) {
      setPasscodeOpenModal(false)
    } else if (unlocked === false && noModalsVisible && criticalBatteryLevel) {
      setPasscodeOpenModal(false)
      setCriticalBatteryLevelOpenModal(true)
    } else if (unlocked === false && noModalsVisible && !criticalBatteryLevel) {
      setPasscodeOpenModal(true)
      setCriticalBatteryLevelOpenModal(false)
    } else {
      setPasscodeOpenModal(false)
      setCriticalBatteryLevelOpenModal(false)
    }

    return () => clearTimeout(timeout)
  }, [
    loaded,
    unlocked,
    syncInitialized,
    noModalsVisible,
    checkingForOsForceUpdate,
    forceOsUpdateFailed,
    criticalBatteryLevel,
    onboardingFinished,
    history,
  ])

  useEffect(() => {
    if (unlocked !== null || !onboardingFinished) {
      return
    }

    const timeout = setTimeout(() => {
      setError(ConnectingError.Connecting)
      // the value is a little higher than API timeoutMs
    }, CONNECTION_TIME_OUT_MS + 5000)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [unlocked, onboardingFinished])

  useEffect(() => {
    if (unlocked && syncState === SynchronizationState.Error) {
      setError(ConnectingError.Sync)
    }
  }, [syncInitialized, syncState, unlocked])

  useEffect(() => {
    if (unlocked && forceOsUpdateFailed) {
      setError(ConnectingError.ForceUpdateCheckFailed)
    }
  }, [unlocked, forceOsUpdateFailed])

  const onCancel = () => {
    // TODO: do some logic to connect to the phone, add cancelling logic
    // This redirect is only for testing purposes

    // TODO: on success call registerFirstPhoneConnection function
    history.push(URL_ONBOARDING.troubleshooting)
  }

  const close = () => {
    setPasscodeOpenModal(false)
    setCriticalBatteryLevelOpenModal(false)
    history.push(URL_MAIN.news)
  }
  const onCloseErrorConnectingModal = () => {
    offCurrentDeviceChangedListener()
    close()
  }

  const onRetry = () => {
    setError(null)
    void updateAllIndexes()
  }

  return (
    <>
      {error === ConnectingError.Sync && (
        <ErrorSyncModal open onRetry={onRetry} closeModal={close} />
      )}
      {error === ConnectingError.Connecting && (
        <ErrorConnectingModal open closeModal={onCloseErrorConnectingModal} />
      )}
      {error === ConnectingError.ForceUpdateCheckFailed && (
        <ErrorUpdateModal open closeModal={close} />
      )}
      <CriticalBatteryLevelModal
        open={criticalBatteryLevelOpenModal}
        closeModal={close}
      />
      <PasscodeModal
        openModal={passcodeOpenModal}
        close={close}
        leftTime={leftTime}
        unlockDevice={unlockDevice}
        getUnlockStatus={getUnlockStatus}
        canBeClosed={passcodeModalCloseable}
      />
      <ConnectingContent
        onCancel={onCancel}
        longerConnection={longerConnection}
      />
    </>
  )
}

export default Connecting
