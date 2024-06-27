/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ExecException, exec } from "child_process"

const parseOutput = (output: string): Array<Record<string, string>> => {
  const devices: Array<Record<string, string>> = []
  const lines = output.trim().split("\n")
  let currentDevice: Record<string, string> = {}
  let currentKey = ""

  lines.forEach((line) => {
    if (line.trim() && !line.trim().endsWith(":")) {
      const [keyParts, ...valueParts] = line.trim().split(":")
      const key = keyParts.replaceAll(" ", "")
      const value = valueParts.join(":").trim()
      currentDevice[key] = value
    } else if (line.trim().endsWith(":")) {
      if (Object.keys(currentDevice).length) {
        devices.push({ name: currentKey, ...currentDevice })
        currentDevice = {}
      }
      currentKey = line.trim().slice(0, -1)
    }
  })

  if (Object.keys(currentDevice).length) {
    devices.push({ name: currentKey, ...currentDevice })
  }

  console.log("Devices: ", devices)
  return devices
}

export const getUsbDevicesMacOS = (): Promise<
  ExecException | string | null | Array<Record<string, string>>
> => {
  return new Promise<
    ExecException | string | null | Array<Record<string, string>>
  >((resolve, reject) => {
    exec("system_profiler SPUSBDataType", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(error)
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        resolve(error)
      }
      resolve(parseOutput(stdout))
    })
  })
}
