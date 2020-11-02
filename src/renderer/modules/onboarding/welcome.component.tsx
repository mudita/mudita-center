import React, { useEffect, useState } from "react"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import {
  getAppSettings,
  updateAppSettings,
} from "Renderer/requests/app-settings.request"
import { AppSettings } from "App/main/store/settings.interface"

const Welcome = () => {
  const history = useHistory()
  const [autostartStatus, setAutostartStatus] = useState<
    AppSettings["appAutostart"] | undefined
  >()

  const onContinue = () => {
    // TODO: do some logic to start connecting to the phone, add error handling
    history.push(URL_ONBOARDING.connecting)
  }
  const onAutostartChange = async (enabled?: boolean) => {
    updateAppSettings({ key: "appAutostart", value: Boolean(enabled) })
  }

  useEffect(() => {
    ;(async () => {
      setAutostartStatus((await getAppSettings()).appAutostart)
    })()
  }, [])

  return (
    <OnboardingWelcome
      onContinue={onContinue}
      onAutostartChange={onAutostartChange}
      autostartEnabled={autostartStatus}
    />
  )
}

export default Welcome
