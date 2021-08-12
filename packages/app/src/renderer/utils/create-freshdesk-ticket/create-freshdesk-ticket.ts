/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import mockCreateFreshdeskTicket from "Renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"

export enum FreshdeskTicketDataType {
  Problem = "Problem",
}

export interface FreshdeskTicketData {
  type: FreshdeskTicketDataType.Problem
  email: string
  subject: string
  description: string
  serialNumber?: string
  attachments: File[]
}

const url = process.env.FRESHDESK_API_URL
const token = process.env.FRESHDESK_API_TOKEN
const env = process.env.NODE_ENV

const createFreshdeskTicket = ({
  type,
  email,
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
  if (description === "") {
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
