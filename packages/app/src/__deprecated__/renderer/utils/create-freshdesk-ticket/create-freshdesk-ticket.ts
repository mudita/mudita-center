/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import mockCreateFreshdeskTicket from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import { FreshdeskTicketData } from "App/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"

const url = process.env.FRESHDESK_API_URL
const token = process.env.FRESHDESK_API_TOKEN
const env = process.env.NODE_ENV

const createFreshdeskTicket = async ({
  type,
  email = "no_email@mudita.com",
  subject,
  description: tmpDescription,
  serialNumber,
  attachments,
}: FreshdeskTicketData): Promise<AxiosResponse<unknown>> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Basic ${token}`,
    },
  }

  let description = tmpDescription

  // Freshdesk not allow create ticket with empty description
  if (description === undefined || description === "") {
    description = "no text"
  }

  const formData = new FormData()
  formData.append("type", type)
  formData.append("email", email)
  formData.append("subject", subject)
  formData.append("description", description)
  formData.append("status", "2")
  formData.append("source", "100")
  formData.append("priority", "1")
  formData.append("custom_fields[cf_product]", "Mudita Pure")
  if (serialNumber) {
    formData.append("custom_fields[cf_serial_number_imei]", serialNumber)
  }

  attachments.forEach((attachment) => {
    formData.append("attachments[]", attachment)
  })

  return axios.post(`${url}/api/v2/tickets`, formData, config)
}

export default (() => {
  if (env === "production") {
    return createFreshdeskTicket
  } else {
    return mockCreateFreshdeskTicket
  }
})()
