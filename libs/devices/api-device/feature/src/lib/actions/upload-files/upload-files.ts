/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  uploadFilesFromPaths,
  UploadFilesFromPathsParams,
} from "./upload-files-from-paths"
import {
  uploadFilesFromData,
  UploadFilesFromDataParams,
} from "./upload-files-from-data"

type UploadFilesParams = UploadFilesFromPathsParams | UploadFilesFromDataParams
export const uploadFiles = ({
  device,
  targetFilePaths,
  onProgress,
  abortController,
  ...sourceFiles
}: UploadFilesParams) => {
  if ("sourceData" in sourceFiles) {
    return uploadFilesFromData({
      device,
      targetFilePaths,
      sourceData: sourceFiles.sourceData,
      onProgress,
      abortController,
    })
  } else {
    return uploadFilesFromPaths({
      device,
      targetFilePaths,
      sourceFilePaths: sourceFiles.sourceFilePaths,
      onProgress,
      abortController,
    })
  }
}
