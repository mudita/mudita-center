/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { FreshdeskTicketData } from "Core/__deprecated__/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket.types"

const url = process.env.FRESHDESK_API_URL
const token = process.env.FRESHDESK_API_TOKEN

const createFreshdeskTicket = async ({
  type,
  email = "no_email@mudita.com",
  subject,
  description: tmpDescription,
  serialNumber,
  deviceID,
  attachments,
  product,
}: FreshdeskTicketData): Promise<AxiosResponse<unknown>> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
  formData.append("custom_fields[cf_product]", product)
  if (serialNumber) {
    formData.append("custom_fields[cf_serial_number_imei]", serialNumber)
  }
  if (deviceID) {
    formData.append("custom_fields[cf_deviceid]", deviceID)
  }

  attachments.forEach((attachment) => {
    formData.append("attachments[]", attachment)
  })

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return axios.post(`${url}/api/v2/tickets`, formData, config)
}

export default (() => {
  return createFreshdeskTicket
})()
