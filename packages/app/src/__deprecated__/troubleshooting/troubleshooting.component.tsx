/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "App/__deprecated__/renderer/constants/urls"
import OnboardingTroubleshooting from "App/__deprecated__/troubleshooting/components/onboarding-troubleshooting.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"

interface Props {
  openContactSupportFlow: () => void
}

const Troubleshooting: FunctionComponent<Props> = ({
  openContactSupportFlow,
}) => {
  const history = useHistory()

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
  }

  return (
    <OnboardingTroubleshooting
      onRetry={onRetry}
      onContact={openContactSupportFlow}
    />
  )
}

export default Troubleshooting
