/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum FileTransferStatuses {
  WholeFileTransferred = 200,
  FileChunkTransferred = 206,
  PostTransferProcessing = 206,
  PostTransferFinished = 200,
}
