/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { URL_MAIN, URL_ONBOARDING, URL_OVERVIEW } from "Renderer/constants/urls"
import ConnectingContent from "App/connecting/connecting.component"
import { updateAppSettings } from "Renderer/requests/app-settings.request"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { RootState, select } from "Renderer/store"
import { connect } from "react-redux"
import PasscodeModal from "App/passcode-modal/passcode-modal.component"
import { togglePhoneSimulation } from "App/dev-mode/store/dev-mode.helpers"
import { StoreValues as BasicInfoValues } from "Renderer/models/basic-info/basic-info.typings"

export const registerFirstPhoneConnection = (): void => {
  void updateAppSettings({ key: "pureNeverConnected", value: false })
}

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

const mapDispatchToProps = (dispatch: any) => ({
  updateBasicInfo: (updateInfo: Partial<BasicInfoValues>) =>
    dispatch.basicInfo.update(updateInfo),
})

const Connecting: FunctionComponent<{
  initialDataLoaded: boolean
  deviceUnlocked: boolean | undefined
  initialModalsShowed: boolean
  phoneLockTime: number | undefined
  updateBasicInfo?: (updateInfo: Partial<BasicInfoValues>) => void
}> = ({
  initialDataLoaded,
  deviceUnlocked,
  initialModalsShowed,
  phoneLockTime,
}) => {
  useEffect(() => {
    if (simulatePhoneConnectionEnabled) {
      togglePhoneSimulation()
    }
  }, [simulatePhoneConnectionEnabled])

  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (deviceUnlocked && initialDataLoaded) {
        history.push(URL_OVERVIEW.root)
      }
    }, 500)

    if (deviceUnlocked === false && initialModalsShowed) {
      setDialogOpen(true)
    }
    return () => clearTimeout(timeout)
  }, [deviceUnlocked, initialModalsShowed, initialDataLoaded])

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
      />
      <ConnectingContent onCancel={onCancel} />
    </>
  )
}

const selection = select((models: any) => ({
  deviceUnlocked: models.basicInfo.deviceUnlocked,
  initialDataLoaded: models.basicInfo.initialDataLoaded,
  initialModalsShowed: models.settings.initialModalsShowed,
  phoneLockTime: models.basicInfo.phoneLockTime,
}))

const mapStateToProps = (state: RootState) => {
  return {
    ...(selection(state, null) as { deviceUnlocked: boolean | undefined }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connecting)
