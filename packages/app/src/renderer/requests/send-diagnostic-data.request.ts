/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import logger from "App/main/utils/logger"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"

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
  _data: DeviceFile[],
  _serialNumber: string
): Promise<AxiosResponse<unknown>> => {
  return Promise.resolve(response)
}

const sendDiagnosticDataRequest = async (
  files: DeviceFile[],
  serialNumber: string
): Promise<AxiosResponse<unknown>> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }

  try {
    let lastResponse = response
    for (let i = 0; i < files.length; i++) {
      const file = new File([new Blob([files[i].data])], files[i].name)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("serialNumber", serialNumber)
      lastResponse = await axios.post(url, formData, config)
      logger.info(
        `Send Diagnostic Data: ${i} file of ${files.length} was sent successfully. Size: ${file.size}`
      )
    }

    return lastResponse
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
