/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { PayloadAction } from "@reduxjs/toolkit"
import { URL_MAIN, URL_ONBOARDING, URL_OVERVIEW } from "Renderer/constants/urls"
import ConnectingContent from "App/connecting/connecting.component"
import { updateAppSettings } from "Renderer/requests/app-settings.request"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { RootState, ReduxRootState, TmpDispatch, select } from "Renderer/store"
import { connect } from "react-redux"
import PasscodeModal from "App/passcode-modal/passcode-modal.component"
import { togglePureSimulation } from "App/dev-mode/store/dev-mode.helpers"
import { PureDeviceData, unlockDevice, getUnlockStatus } from "App/device"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

export const registerFirstPhoneConnection = (): void => {
  void updateAppSettings({ key: "pureNeverConnected", value: false })
}

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

const Connecting: FunctionComponent<{
  loaded: boolean
  locked: boolean
  unlockDevice: (code: number[]) => Promise<PayloadAction<DeviceResponseStatus>>
  getUnlockStatus: () => Promise<PayloadAction<DeviceResponseStatus>>
  phoneLockTime: number | undefined
  initialModalsShowed: boolean
}> = ({
  loaded,
  locked,
  unlockDevice,
  getUnlockStatus,
  phoneLockTime,
  initialModalsShowed,
}) => {
  useEffect(() => {
    if (simulatePhoneConnectionEnabled) {
      togglePureSimulation()
    }
  }, [simulatePhoneConnectionEnabled])

  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!locked && loaded) {
        history.push(URL_OVERVIEW.root)
      }
    }, 500)

    if (locked && initialModalsShowed) {
      setDialogOpen(true)
    }
    return () => clearTimeout(timeout)
  }, [loaded, locked, initialModalsShowed])

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
  return (
    <>
      <PasscodeModal
        openModal={dialogOpen}
        close={close}
        openBlocked={phoneLockTime}
        unlockDevice={unlockDevice}
        getUnlockStatus={getUnlockStatus}
      />
      <ConnectingContent onCancel={onCancel} />
    </>
  )
}

const selection = select((models: any) => ({
  initialModalsShowed: models.settings.initialModalsShowed,
}))

// TODO replace `TmpDispatch` with legit `Dispatch`
const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  unlockDevice: (code: number[]) => dispatch(unlockDevice(code)),
  getUnlockStatus: () => dispatch(getUnlockStatus()),
})

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  device: state.device,
  loaded: state.device.status.loaded,
  locked: state.device.status.locked,
  phoneLockTime:
    (state.device.data as PureDeviceData)?.phoneLockTime ?? undefined,
  ...selection(state, {}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Connecting)
