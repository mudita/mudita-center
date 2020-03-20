import React from "react"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"

const Welcome = () => {
  const history = useHistory()

  const onContinue = () => {
    // TODO: do some logic to start connecting to the phone, add error handling
    history.push(URL_ONBOARDING.connecting)
  }
  const setAutostartOption = (enabled?: boolean) => {
    // TODO: implement toggling auto-start setting
    setTimeout(() => {
      alert(`Auto-start is now ${enabled ? "enabled" : "disabled"}`)
    }, 250)
  }
  return (
    <OnboardingWelcome
      onContinue={onContinue}
      setAutostartOption={setAutostartOption}
    />
  )
}

export default Welcome
