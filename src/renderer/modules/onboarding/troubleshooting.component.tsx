import React from "react"
import { useHistory } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"

const Troubleshooting = () => {
  const history = useHistory()

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_MAIN.onboardingConnecting)
  }
  return <OnboardingTroubleshooting onRetry={onRetry} />
}

export default Troubleshooting
