import React from "react"
import { useHistory } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import OnboardingConnecting from "Renderer/components/rest/onboarding/onboarding-connecting.component"

const Connecting = () => {
  const history = useHistory()

  const onCancel = () => {
    // TODO: do some logic to connect to the phone, add cancelling logic
    // This redirect is only for testing purposes
    history.push(URL_MAIN.onboardingTroubleshooting)
  }
  return <OnboardingConnecting onCancel={onCancel} />
}

export default Connecting
