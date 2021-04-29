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

export enum ContactSupportModalKind {
  Contact = "contact",
  Success = "success",
  Fail = "fail",
}

interface ContactSupportOutput {
  log: string
  openModal: Record<ContactSupportModalKind, boolean>
  sendForm: (formData: SupportFormData) => Promise<void>
  sending: boolean
  closeContactModal: () => void
  closeSuccessModal: () => void
  closeFailModal: () => void
  openContactSupportModal: () => void
}

export const useContactSupport = (): ContactSupportOutput => {
  const [openModal, setOpenModal] = useState({
    [ContactSupportModalKind.Contact]: false,
    [ContactSupportModalKind.Success]: false,
    [ContactSupportModalKind.Fail]: false,
  })
  const [sending, setSending] = useState(false)
  const [log, setLog] = useState("")
  const openContactSupportModal = () => {
    setOpenModal((prevState) => ({
      ...prevState,
      [ContactSupportModalKind.Contact]: true,
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
        [ContactSupportModalKind.Contact]: false,
        [ContactSupportModalKind.Success]: true,
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
        [ContactSupportModalKind.Contact]: false,
        [ContactSupportModalKind.Fail]: true,
      }))
    }
  }

  return {
    openModal,
    openContactSupportModal,
    sendForm,
    sending,
    log,
    closeContactModal: () =>
      setOpenModal((prevState) => ({
        ...prevState,
        [ContactSupportModalKind.Contact]: false,
      })),
    closeSuccessModal: () =>
      setOpenModal((prevState) => ({
        ...prevState,
        [ContactSupportModalKind.Success]: false,
      })),
    closeFailModal: () =>
      setOpenModal((prevState) => ({
        ...prevState,
        [ContactSupportModalKind.Fail]: false,
      })),
  }
}
