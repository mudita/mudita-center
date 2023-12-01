/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useHistory } from "react-router"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  URL_MAIN,
  URL_ONBOARDING,
} from "App/__deprecated__/renderer/constants/urls"
import OnboardingWelcome from "App/onboarding/components/onboarding-welcome.component"

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
    <OnboardingWelcome
      onCancel={onCancel}
      onTroubleshooting={onTroubleshooting}
    />
  )
}

export default Onboarding
