import { getAppLogs } from "Renderer/requests/app-logs.request"
import ContactModal, {
  SupportFormData,
} from "App/contacts/components/contact-modal/contact-modal.component"
import modalService from "Renderer/components/core/modal/modal.service"
import Base64 from "crypto-js/enc-base64"
import hmacSHA256 from "crypto-js/hmac-sha256"
import axios from "axios"
import { ContactSupportSuccess } from "App/contacts/components/contact-modal/contact-modal-success.component"
import logger from "App/main/utils/logger"
import { ContactSupportFailed } from "App/contacts/components/contact-modal/contact-modal-failed.component"
import React from "react"

export const contactSupport = async () => {
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
      hmacSHA256(data, process.env.CONTACT_SUPPORT_AUTH_KEY as string)
    )

    try {
      await axios.post(process.env.CONTACT_SUPPORT_API_URL || "", data, {
        headers: {
          "Content-Type": "application/json",
          "x-signature": hmacDigest,
        },
      })
      modalService.openModal(<ContactSupportSuccess />, true)
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
