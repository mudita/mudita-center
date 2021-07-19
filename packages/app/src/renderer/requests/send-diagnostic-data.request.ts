/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { formatDate } from "Renderer/modules/overview/format-date"

const env = process.env.NODE_ENV
const url = `${process.env.MUDITA_CENTER_SERVER_URL}/diagnostic-data`
const todayFormatDate = formatDate(new Date())

const response: AxiosResponse<unknown> = {
  config: {},
  data: undefined,
  headers: undefined,
  statusText: "",
  status: 200,
}

const mockSendDiagnosticDataRequest = (
  _data: string,
  _serialNumber: string
): Promise<AxiosResponse<unknown>> => {
  return Promise.resolve(response)
}

const sendDiagnosticDataRequest = async (
  data: string,
  serialNumber: string
): Promise<AxiosResponse<unknown>> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  const formData = new FormData()
  formData.append(
    "file",
    new File([new Blob([data])], `pure-${todayFormatDate}.txt`)
  )
  formData.append("serialNumber", serialNumber)
  return axios.post(url, formData, config)
}

export default (() => {
  if (env === "production") {
    return sendDiagnosticDataRequest
  } else {
    return mockSendDiagnosticDataRequest
  }
})()
