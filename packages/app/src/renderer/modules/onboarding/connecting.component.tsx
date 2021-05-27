/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { URL_MAIN, URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingConnecting from "Renderer/components/rest/onboarding/onboarding-connecting.component"
import { updateAppSettings } from "Renderer/requests/app-settings.request"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { RootState, select } from "Renderer/store"
import { connect } from "react-redux"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export const registerFirstPhoneConnection = (): void => {
  void updateAppSettings({ key: "pureNeverConnected", value: false })
}

const Connecting: FunctionComponent<{
  deviceUnlocked: boolean | undefined
  initialModalsShowed: boolean
}> = ({ deviceUnlocked, initialModalsShowed }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (deviceUnlocked) {
        history.push(URL_MAIN.overview)
      }
    }, 500)

    if (deviceUnlocked === false && initialModalsShowed) {
      setDialogOpen(true)
    }

    return () => clearTimeout(timeout)
  }, [deviceUnlocked, initialModalsShowed])

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

  const onActionButtonClick = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <ModalDialog
        open={dialogOpen}
        closeButton={false}
        onActionButtonClick={onActionButtonClick}
        actionButtonLabel={"ok"}
        title={"Pure is locked"}
        size={ModalSize.VerySmall}
      >
        <Text displayStyle={TextDisplayStyle.LargeText}>
          Unlock your Pure to successfully connection
        </Text>
      </ModalDialog>
      <OnboardingConnecting onCancel={onCancel} />
    </>
  )
}

const selection = select((models: any) => ({
  deviceUnlocked: models.basicInfo.deviceUnlocked,
  initialModalsShowed: models.settings.initialModalsShowed,
}))

const mapStateToProps = (state: RootState) => {
  return {
    ...(selection(state, null) as { deviceUnlocked: boolean | undefined }),
  }
}

export default connect(mapStateToProps)(Connecting)
