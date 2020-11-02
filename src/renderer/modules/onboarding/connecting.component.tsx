import React from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingConnecting from "Renderer/components/rest/onboarding/onboarding-connecting.component"
import { updateAppSettings } from "Renderer/requests/app-settings.request"

export const finishOnboarding = async () => {
  updateAppSettings({ key: "pureNeverConnected", value: false })
}

const Connecting = () => {
  const history = useHistory()

  const onCancel = () => {
    // TODO: do some logic to connect to the phone, add cancelling logic
    // This redirect is only for testing purposes

    // TODO: on success call finishOnboarding function
    history.push(URL_ONBOARDING.troubleshooting)
  }
  return <OnboardingConnecting onCancel={onCancel} />
}

export default Connecting
