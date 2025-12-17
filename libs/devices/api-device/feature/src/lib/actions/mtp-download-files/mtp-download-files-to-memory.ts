/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ExecuteTransferResult, FailedTransferItem,
  TransferDownloadFilesToLocationEntry,
  TransferDownloadFilesToLocationParams, TransferDownloadFilesToMemoryEntry,
  TransferDownloadFilesToMemoryParams,
} from "devices/common/models"
import { AppFileSystemGuardOptions, AppResultFactory } from "app-utils/models"
import { AppFileSystem, AppPath } from "app-utils/renderer"
import { sliceSegments } from "app-utils/common"
import { mtpDownloadFilesToLocation } from "./mtp-download-files-to-location"

const getMtpTempLocation = (fileName?: string): AppFileSystemGuardOptions => {
  return {
    scopeRelativePath: fileName ? ["mtp-download", fileName] : ["mtp-download"],
    scope: "temp",
  }
}

const getFileName = (path: string): string => sliceSegments(path, -1)

const createLocationEntry = async (
  file: TransferDownloadFilesToMemoryEntry,
  absolutePathDir: string
): Promise<TransferDownloadFilesToLocationEntry> => {
  const fileName = getFileName(file.source.path)
  const joinedPath = await AppPath.join(absolutePathDir, fileName)

  return {
    ...file,
    target: {
      type: "path",
      path: joinedPath,
    },
  }
}

const mapToLocationParams = async (
  params: TransferDownloadFilesToMemoryParams,
  absolutePathDir: string
): Promise<TransferDownloadFilesToLocationParams> => {
  const files = await Promise.all(
    params.files.map((file) => createLocationEntry(file, absolutePathDir))
  )

  return { ...params, files }
}

const prepareTempDirectory = async () => {
  const mtpTempLocation = getMtpTempLocation()
  await AppFileSystem.mkdir(mtpTempLocation)
  return AppFileSystem.getPath(mtpTempLocation)
}

const readFileToMemory = async (fileName: string) => {
  return AppFileSystem.readFile({
    ...getMtpTempLocation(fileName),
    encoding: "base64",
  })
}

const processSuccessfulFiles = async (
  mappedParams: TransferDownloadFilesToLocationParams,
  failedIds: Set<string>
) => {
  const files: (string | Uint8Array)[] = []
  const additionalFailed: FailedTransferItem[] = []

  const filesToProcess = mappedParams.files.filter(
    (file) => !failedIds.has(file.id)
  )

  for (const file of filesToProcess) {
    const fileName = getFileName(file.source.path)
    const fileDataResponse = await readFileToMemory(fileName)

    if (!fileDataResponse.ok) {
      additionalFailed.push({ id: file.id, errorName: "Unknown" })
      continue
    }

    files.push(fileDataResponse.data)
  }

  return { files, additionalFailed }
}

export const mtpDownloadFilesToMemory = async (
  params: TransferDownloadFilesToMemoryParams
): Promise<ExecuteTransferResult> => {
  const absolutePathDirResult = await prepareTempDirectory()

  if (!absolutePathDirResult.ok) {
    return AppResultFactory.failed(absolutePathDirResult.error, {
      failed: params.files.map((file) => ({
        id: file.id,
        errorName: "Unknown",
      })),
    })
  }

  const mappedParams = await mapToLocationParams(
    params,
    absolutePathDirResult.data
  )

  const downloadResult = await mtpDownloadFilesToLocation(mappedParams)

  if (!downloadResult.ok) {
    return downloadResult
  }

  const initialFailed = downloadResult.data.failed || []
  const failedIds = new Set(initialFailed.map(({ id }) => id))

  const { files, additionalFailed } = await processSuccessfulFiles(
    mappedParams,
    failedIds
  )

  const allFailed = [...initialFailed, ...additionalFailed]

  return AppResultFactory.success({
    files,
    failed: allFailed.length ? allFailed : undefined,
  })
}
