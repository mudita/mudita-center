/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import {
  ExecuteTransferParams,
  ExecuteTransferResult,
  FailedTransferErrorName,
  FailedTransferItem,
  TransferFileFromPathEntry,
  TransferFilesActionType,
} from "devices/common/models"
import { sliceSegments } from "app-utils/common"
import { readFileTransferMetadataList } from "app-utils/renderer"
import {
  buildFailedResult,
  isMtpPathInternal,
  sliceMtpPaths,
} from "../mtp-shared/mtp-helpers"
import { mtpTransferFiles } from "../mtp-shared/mtp-transfer-files"

export interface MtpUploadFilesFromPathParams
  extends ExecuteTransferParams<ApiDevice> {
  files: TransferFileFromPathEntry[]
}

export const mtpUploadFilesFromPath = async (
  params: MtpUploadFilesFromPathParams
): Promise<ExecuteTransferResult> => {
  const { files, abortController } = params
  const failed: FailedTransferItem[] = []
  const {
    files: fileEntryWithMetadata,
    failed: readFileTransferMetadataListFailed,
  } = await readFileTransferMetadataList(files, abortController)

  if (abortController.signal.aborted) {
    return buildFailedResult(files, FailedTransferErrorName.Aborted)
  }

  failed.push(...readFileTransferMetadataListFailed)

  return mtpTransferFiles({
    ...params,
    failed,
    files: fileEntryWithMetadata.map(({ id, source, target, fileSize }) => {
      const isInternal = isMtpPathInternal(target.path)

      return {
        id,
        isInternal,
        fileSize: fileSize,
        fileName: target.path.split("/").pop() || "",
        sourcePath: getSourcePath(source),
        destinationPath: sliceSegments(
          sliceMtpPaths(target.path, isInternal),
          0,
          -1
        ),
        action: TransferFilesActionType.Upload,
      }
    }),
  })
}

const getSourcePath = (source: TransferFileFromPathEntry["source"]): string => {
  const value = source.fileLocation.fileAbsolutePath

  if (typeof value === "string") {
    return value
  }

  if (Array.isArray(value)) {
    return value.join("/")
  }

  return ""
}
