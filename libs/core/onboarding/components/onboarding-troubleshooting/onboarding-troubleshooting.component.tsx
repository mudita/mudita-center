/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import OnboardingTroubleshootingUI from "Core/onboarding/components/onboarding-troubleshooting/onboarding-troubleshooting-ui.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"
import { ModalStateKey, showModal } from "Core/modals-manager"

const OnboardingTroubleshooting: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch<TmpDispatch>()

  const handleRetry = useCallback(() => {
    // TODO: do some logic to retry connection
    history.push(URL_DISCOVERY_DEVICE.root)
  }, [history])

  const handleContact = useCallback(() => {
    dispatch(showModal(ModalStateKey.ContactSupportFlow))
  }, [dispatch])

  return (
    <OnboardingTroubleshootingUI
      onRetry={handleRetry}
      onContact={handleContact}
    />
  )
}

export default OnboardingTroubleshooting
