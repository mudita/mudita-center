/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useHistory } from "react-router"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  URL_MAIN,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import OnboardingUI from "Core/onboarding/components/onboarding/onboarding-ui.component"

const Onboarding: FunctionComponent = () => {
  const history = useHistory()

  const onCancel = () => {
    // TODO: do some logic to start connecting to the phone, add error handling
    history.push(URL_MAIN.news)
  }

  const onTroubleshooting = () => {
    history.push(URL_ONBOARDING.troubleshooting)
  }

  return (
    <OnboardingUI
      onCancel={onCancel}
      onTroubleshooting={onTroubleshooting}
    />
  )
}

export default Onboarding
