import React from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"
import modalService from "Renderer/components/core/modal/modal.service"
import ContactModal, {
  SupportFormData,
} from "Renderer/components/rest/contact-modal/contact-modal.component"
import { getAppLogs } from "Renderer/requests/app-logs.request"
import axios from "axios"
import { ContactSupportSuccess } from "Renderer/components/rest/contact-modal/contact-modal-success.component"
import { ContactSupportFailed } from "Renderer/components/rest/contact-modal/contact-modal-failed.component"
import hmacSHA256 from "crypto-js/hmac-sha256"
import Base64 from "crypto-js/enc-base64"
import logger from "App/main/utils/logger"

const Troubleshooting = () => {
  const history = useHistory()

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
  }

  const contactSupport = async () => {
    const appLogs = await getAppLogs()

    const sendForm = async (formData: SupportFormData) => {
      modalService.rerenderModal(
        <ContactModal log={appLogs} onSend={sendForm} sending />
      )
      const attachments = []

      const bufferToBase64 = (buffer: ArrayBuffer) => {
        let binary = ""
        const bytes = (new Uint8Array(buffer) as unknown) as number[]
        for (const byte of bytes) {
          binary += String.fromCharCode(byte)
        }
        return window.btoa(binary)
      }

      for (const attachment of formData.attachments || []) {
        const content = bufferToBase64(await attachment.arrayBuffer())

        attachments.push({
          filename: attachment.name,
          content,
          type: attachment.type,
          encoding: "base64",
        })
      }

      const data = JSON.stringify({
        ...formData,
        attachments,
        log: appLogs,
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

        logger.error(`Contact support error: ${JSON.stringify(simpleError)}`)

        modalService.openModal(<ContactSupportFailed />, true)
      }
    }

    modalService.openModal(<ContactModal log={appLogs} onSend={sendForm} />)
  }
  return (
    <OnboardingTroubleshooting onRetry={onRetry} onContact={contactSupport} />
  )
}

export default Troubleshooting
