/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AxiosResponse } from "axios"
// import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
// import { formatDate } from "Renderer/utils/format-date"
// import logger from "App/main/utils/logger"

const env = process.env.NODE_ENV
// const url = `${process.env.MUDITA_CENTER_SERVER_URL}/diagnostic-data`
// const todayFormatDate = formatDate(new Date())

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

// const chunk = (s: string, maxBytes = 500000): string[] => {
//   let buf = Buffer.from(s)
//   const result = []
//   while (buf.length) {
//     let i = buf.lastIndexOf(32, maxBytes + 1)
//     // If no space found, try forward search
//     if (i < 0) {
//       i = buf.indexOf(32, maxBytes)
//     }
//     // If there's no space at all, take the whole string
//     if (i < 0) {
//       i = buf.length
//     }
//     // This is a safe cut-off point; never half-way a multi-byte
//     result.push(buf.slice(0, i).toString())
//     buf = buf.slice(i + 1) // Skip space (if any)
//   }
//   return result
// }

const sendDiagnosticDataRequest = async (
  files: DeviceFile[],
  serialNumber: string
): Promise<AxiosResponse<unknown>> => {
  console.log("sendDiagnosticDataRequest", { data, serialNumber })
  // const config: AxiosRequestConfig = {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // }
  // const dataParts = chunk(data)
  //
  // try {
  //   let lastResponse = response
  //   for (let i = 0; i < dataParts.length; i++) {
  //     const file = new File(
  //       [new Blob([dataParts[i]])],
  //       `pure-${todayFormatDate}-${i}.txt`
  //     )
  //     const formData = new FormData()
  //     formData.append("file", file)
  //     formData.append("serialNumber", serialNumber)
  //     lastResponse = await axios.post(url, formData, config)
  //     logger.info(
  //       `Send Diagnostic Data: ${i} part of ${dataParts.length} was sent successfully. Size: ${file.size}`
  //     )
  //   }
  //
  //   return lastResponse
  // } catch (error) {
  //   return error.response
  // }
  return response
}

export default (() => {
  if (env === "production") {
    return sendDiagnosticDataRequest
  } else {
    return mockSendDiagnosticDataRequest
  }
})()
