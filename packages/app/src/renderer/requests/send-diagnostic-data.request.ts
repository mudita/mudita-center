/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const env = process.env.NODE_ENV
const url = `${process.env.MUDITA_CENTER_SERVER_URL}/diagnostic-data`

const response: AxiosResponse<unknown> = {
  config: {},
  data: undefined,
  headers: undefined,
  statusText: "",
  status: 200,
}

const mockSendDiagnosticDataRequest = (
  _data: File,
  _serialNumber: string
): Promise<AxiosResponse<unknown>> => {
  return Promise.resolve(response)
}

const sendDiagnosticDataRequest = async (
  file: File,
  serialNumber: string
): Promise<AxiosResponse<unknown>> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }

  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("serialNumber", serialNumber)
    return await axios.post(url, formData, config)
  } catch (error) {
    return error.response
  }
}

export default (() => {
  if (env === "production") {
    return sendDiagnosticDataRequest
  } else {
    return mockSendDiagnosticDataRequest
  }
})()
