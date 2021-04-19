/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getAppLogs } from "Renderer/requests/app-logs.request"
import { SupportFormData } from "App/contacts/components/contact-modal/contact-modal.component"
import Base64 from "crypto-js/enc-base64"
import hmacSHA256 from "crypto-js/hmac-sha256"
import axios from "axios"
import logger from "App/main/utils/logger"
import { useEffect, useState } from "react"

export const useContactSupport = () => {
  const [openModal, setOpenModal] = useState({
    contactModal: false,
    successModal: false,
    failModal: false,
  })
  const [sending, setSending] = useState(false)
  const [log, setLog] = useState("")
  const openContactSupportModal = () => {
    setOpenModal((prevState) => ({
      ...prevState,
      contactModal: true,
    }))
  }
  useEffect(() => {
    ;(async () => {
      setLog(await getAppLogs())
    })()
  }, [])
  const sendForm = async (formData: SupportFormData) => {
    setSending(true)
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
      log,
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
      setOpenModal((prevState) => ({
        ...prevState,
        contactModal: false,
        successModal: true,
      }))
    } catch (error) {
      const { log, ...errorBody } = JSON.parse(error.config.data)
      const simpleError = { ...error }
      simpleError.config.data = {
        ...errorBody,
        log: "Log is omitted due to its size",
      }

      logger.error(`Contact support error: ${JSON.stringify(simpleError)}`)
      setOpenModal((prevState) => ({
        ...prevState,
        contactModal: false,
        failModal: true,
      }))
    }
  }

  return {
    openModal,
    openContactSupportModal,
    sendForm,
    sending,
    log,
    closeModal: (payload: {}) =>
      setOpenModal((prevState) => ({
        ...prevState,
        ...payload,
      })),
  }
}
