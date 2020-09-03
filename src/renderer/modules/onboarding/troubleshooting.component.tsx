import React from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"
import modalService from "Renderer/components/core/modal/modal.service"
import ContactModal, {
  SupportFormData,
} from "Renderer/components/rest/contact-modal/contact-modal.component"
import { getFullAppLogs } from "Renderer/requests/app-logs.request"
import axios from "axios"
import logger from "Renderer/utils/log"
import { ContactSupportSuccess } from "Renderer/components/rest/contact-modal/contact-modal-success.component"
import { ContactSupportFailed } from "Renderer/components/rest/contact-modal/contact-modal-failed.component"
import hmacSHA256 from "crypto-js/hmac-sha256"
import Base64 from "crypto-js/enc-base64"

const Troubleshooting = () => {
  const history = useHistory()

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
  }

  const contactSupport = async () => {
    const appLog = await getFullAppLogs()

    const sendForm = async (formData: SupportFormData) => {
      modalService.rerenderModal(
        <ContactModal log={appLog} onSend={sendForm} sending />
      )
      const attachments = []

      for (const attachment of formData.attachments || []) {
        attachments.push({
          filename: attachment.name,
          path: attachment.path,
        })
      }

      const data = JSON.stringify({
        ...formData,
        attachments,
        log: appLog,
      })

      const hmacDigest = Base64.stringify(
        hmacSHA256(data, process.env.CONTACT_SUPPORT_AUTH_KEY)
      )

      try {
        await axios.post(process.env.CONTACT_SUPPORT_API_URL || "", data, {
          headers: {
            "Content-Type": "application/json",
            "x-signature": hmacDigest,
          },
        })
        modalService.openModal(
          <ContactSupportSuccess withoutEmail={!formData.email} />,
          true
        )
      } catch (error) {
        const { log, ...errorBody } = JSON.parse(error.config.data)
        const simpleError = { ...error }
        simpleError.config.data = {
          ...errorBody,
          log: "Log is omitted due to its size",
        }

        logger.log(`Contact support error: ${JSON.stringify(simpleError)}`)

        modalService.openModal(<ContactSupportFailed />, true)
      }
    }

    modalService.openModal(<ContactModal log={appLog} onSend={sendForm} />)
  }
  return (
    <OnboardingTroubleshooting onRetry={onRetry} onContact={contactSupport} />
  )
}

export default Troubleshooting
