import React from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"

const Troubleshooting = () => {
  const history = useHistory()

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
  }
  const onContact = () => {
    // TODO: Implement error modal (will be made in near future)
    alert("Support is suspended due to SARS-CoV-2 pandemic 🦠")
  }
  return <OnboardingTroubleshooting onRetry={onRetry} onContact={onContact} />
}

export default Troubleshooting
