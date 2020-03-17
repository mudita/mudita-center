import React from "react"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { useHistory } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"

const Welcome = () => {
  const history = useHistory()

  const onContinue = () => {
    // TODO: do some logic to start connecting to the phone, add error handling
    history.push(URL_MAIN.onboardingConnecting)
  }
  return <OnboardingWelcome onContinue={onContinue} />
}

export default Welcome
