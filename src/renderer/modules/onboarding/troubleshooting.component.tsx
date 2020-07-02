import React from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"
import modalService from "Renderer/components/core/modal/modal.service"
import ContactModal from "Renderer/components/rest/contact-modal/contact-modal.component"
import { getFullAppLogs } from "Renderer/requests/app-logs.request"

const Troubleshooting = () => {
  const history = useHistory()

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
  }
  const contactSupport = async () => {
    const log = await getFullAppLogs()
    modalService.openModal(<ContactModal log={log} />)
  }
  return (
    <OnboardingTroubleshooting onRetry={onRetry} onContact={contactSupport} />
  )
}

export default Troubleshooting
