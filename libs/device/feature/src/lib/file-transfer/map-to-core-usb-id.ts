/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export function mapToCoreUsbId(inputString: string, delimiter = "#"): string {
  const inputStringUp = inputString.toUpperCase()
  if (!inputStringUp.includes("VID_") || !inputStringUp.includes("PID_")) {
    return inputString
  }

  let [, deviceId = "", instanceId = ""] = inputStringUp.split(delimiter)

  const [vidSegment, pidSegment] = deviceId.split("&")

  deviceId = [vidSegment, pidSegment].filter(Boolean).join("&")

  const [usbPortNumber, uniqueDeviceIdentifier, deviceIndex] =
    instanceId.split("&")

  instanceId = [usbPortNumber, uniqueDeviceIdentifier, deviceIndex]
    .filter(Boolean)
    .join("&")

  return ["USB", deviceId, instanceId].filter(Boolean).join("\\")
}
