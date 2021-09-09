/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import path from "path"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"
import { DeviceLogFilesOption } from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import { formatDate } from "Renderer/utils/format-date"

export const createPartNumberSuffix = (name: string, index: number): string => {
  const base = path.parse(name).name
  const ext = path.parse(name).ext
  return `${base}-part${index + 1}${ext}`
}

export const chunk = (s: string, maxBytes = 500000): string[] => {
  const size = Math.ceil(s.length / maxBytes)
  const r = Array(size)
  let offset = 0

  for (let i = 0; i < size; i++) {
    r[i] = s.substr(offset, maxBytes)
    offset += maxBytes
  }

  return r
}

export const chunkDeviceFile = (
  deviceFile: DeviceFile,
  maxBytes: number,
): DeviceFile[] => {
  const dataList = chunk(deviceFile.data, maxBytes)
  return dataList.map((data, index) => ({
    data,
    name: createPartNumberSuffix(deviceFile.name, index),
  }))
}

export const transformDeviceFilesByOption = (
  deviceFiles: DeviceFile[],
  { datePrefix, maxBytes }: DeviceLogFilesOption
): DeviceFile[] => {
  let files: DeviceFile[] = []
  if (maxBytes === undefined || maxBytes === 0) {
    files = deviceFiles
  } else {
    deviceFiles.forEach((deviceFile) => {
      chunkDeviceFile(deviceFile, maxBytes).forEach((chunkedDeviceFile) =>
        files.push(chunkedDeviceFile)
      )
    })
  }

  if (datePrefix) {
    const todayFormatDate = formatDate(new Date())
    return files.map((file) => ({
      ...file,
      name: `${todayFormatDate}-${file.name}`,
    }))
  } else {
    return files
  }
}
