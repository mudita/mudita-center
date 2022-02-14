/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { PayloadAction } from "@reduxjs/toolkit"
import { timeoutMs } from "@mudita/pure"
import { URL_MAIN, URL_ONBOARDING, URL_OVERVIEW } from "Renderer/constants/urls"
import ConnectingContent from "App/connecting/components/connecting-content.component"
import ErrorConnectingModal from "App/connecting/components/error-connecting-modal"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import PasscodeModal from "App/passcode-modal/passcode-modal.component"
import { togglePureSimulation } from "App/dev-mode/store/dev-mode.helpers"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import registerFirstPhoneConnection from "App/connecting/requests/register-first-phone-connection"
import { SynchronizationState } from "App/data-sync/reducers"
import ErrorSyncModal from "App/connecting/components/error-sync-modal/error-sync-modal"
import { ConnectingError } from "App/connecting/components/connecting-error.enum"

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

const Connecting: FunctionComponent<{
  loaded: boolean
  unlocked: boolean | null
  syncInitialized: boolean
  syncState: SynchronizationState
  unlockDevice: (code: number[]) => Promise<PayloadAction<DeviceResponseStatus>>
  getUnlockStatus: () => Promise<PayloadAction<DeviceResponseStatus>>
  phoneLockTime: number | undefined
  noModalsVisible: boolean
}> = ({
  loaded,
  unlocked,
  syncInitialized,
  syncState,
  unlockDevice,
  getUnlockStatus,
  phoneLockTime,
  noModalsVisible,
}) => {
  const [error, setError] = useState<ConnectingError | undefined>(undefined)
  const [longerConnection, setLongerConnection] = useState(false)

  useEffect(() => {
    if (simulatePhoneConnectionEnabled) {
      togglePureSimulation()
    }
  }, [simulatePhoneConnectionEnabled])

  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLongerConnection(true)
    }, 6000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (unlocked && loaded && syncInitialized) {
        history.push(URL_OVERVIEW.root)
      }
    }, 500)

    // TODO: how to avoid window jumping by loading setting async action
    if (unlocked === false && noModalsVisible) {
      setDialogOpen(true)
    } else {
      setDialogOpen(false)
    }
    return () => clearTimeout(timeout)
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
    setDialogOpen(false)
    history.push(URL_MAIN.news)
  }

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
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
        openModal={dialogOpen}
        close={close}
        openBlocked={phoneLockTime}
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
