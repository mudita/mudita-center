/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { PayloadAction } from "@reduxjs/toolkit"
import { timeoutMs } from "@mudita/pure"
import { DeviceType } from "App/device/constants"
import {
  URL_MAIN,
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "App/__deprecated__/renderer/constants/urls"
import ConnectingContent from "App/connecting/components/connecting-content.component"
import ErrorConnectingModal from "App/connecting/components/error-connecting-modal"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import PasscodeModal from "App/__deprecated__/passcode-modal/passcode-modal.component"
import { togglePureSimulation } from "App/__deprecated__/dev-mode/store/dev-mode.helpers"
import registerFirstPhoneConnection from "App/connecting/requests/register-first-phone-connection"
import { SynchronizationState } from "App/data-sync/reducers"
import ErrorSyncModal from "App/connecting/components/error-sync-modal/error-sync-modal"
import { ConnectingError } from "App/connecting/components/connecting-error.enum"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

const Connecting: FunctionComponent<{
  loaded: boolean
  deviceType: DeviceType | null
  unlocked: boolean | null
  syncInitialized: boolean
  syncState: SynchronizationState
  unlockDevice: (
    code: number[]
  ) => Promise<PayloadAction<RequestResponseStatus>>
  getUnlockStatus: () => Promise<PayloadAction<RequestResponseStatus>>
  leftTime: number | undefined
  noModalsVisible: boolean
  updateAllIndexes: () => Promise<void>
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
}) => {
  const [error, setError] = useState<ConnectingError | null>(null)
  const [longerConnection, setLongerConnection] = useState(false)

  useEffect(() => {
    if (simulatePhoneConnectionEnabled) {
      togglePureSimulation()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulatePhoneConnectionEnabled])

  const [passcodeOpenModal, setPasscodeOpenModal] = useState(false)

  useEffect(() => {
    if (deviceType === DeviceType.MuditaHarmony) {
      return
    }
    const timeout = setTimeout(() => {
      setLongerConnection(true)
    }, 6000)
    return () => clearTimeout(timeout)
  }, [deviceType])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (unlocked && loaded && syncInitialized) {
        history.push(URL_OVERVIEW.root)
      }
    }, 500)

    // TODO: how to avoid window jumping by loading setting async action
    if (unlocked === false && noModalsVisible) {
      setPasscodeOpenModal(true)
    } else {
      setPasscodeOpenModal(false)
    }
    return () => clearTimeout(timeout)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, unlocked, syncInitialized, noModalsVisible])

  useEffect(() => {
    if (unlocked !== null) {
      return
    }

    let mounted = true
    const timeout = setTimeout(() => {
      if (mounted) {
        setError(ConnectingError.Connecting)
      }
      // the value is a little higher than API timeoutMs
    }, timeoutMs + 5000)

    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [unlocked])

  useEffect(() => {
    if (unlocked && syncState === SynchronizationState.Error) {
      setError(ConnectingError.Sync)
    }
  }, [syncInitialized, syncState, unlocked])

  useEffect(() => {
    registerFirstPhoneConnection()
  }, [])

  const history = useHistory()

  const onCancel = () => {
    // TODO: do some logic to connect to the phone, add cancelling logic
    // This redirect is only for testing purposes

    // TODO: on success call registerFirstPhoneConnection function
    history.push(URL_ONBOARDING.troubleshooting)
  }

  const close = () => {
    setPasscodeOpenModal(false)
    history.push(URL_MAIN.news)
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
        <ErrorConnectingModal open closeModal={close} />
      )}
      <PasscodeModal
        openModal={passcodeOpenModal}
        close={close}
        leftTime={leftTime}
        unlockDevice={unlockDevice}
        getUnlockStatus={getUnlockStatus}
      />
      <ConnectingContent
        onCancel={onCancel}
        longerConnection={longerConnection}
      />
    </>
  )
}

export default Connecting
