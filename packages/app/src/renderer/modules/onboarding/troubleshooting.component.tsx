/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"
import { contactSupport } from "Renderer/utils/contact-support/contact-support"

const Troubleshooting = () => {
  const history = useHistory()

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
  }

  return (
    <OnboardingTroubleshooting onRetry={onRetry} onContact={contactSupport} />
  )
}

export default Troubleshooting
