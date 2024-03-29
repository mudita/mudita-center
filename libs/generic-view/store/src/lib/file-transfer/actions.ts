/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { FileProgress } from "./reducer"
import { SendFileErrorPayload } from "./send-file.action"
import { GetFileErrorPayload } from "Libs/generic-view/store/src"

export const fileTransferSendPrepared = createAction<
  Pick<FileProgress, "chunksCount" | "transferId">
>(ActionName.PreFileTransferSend)
export const fileTransferChunkSent = createAction<
  Pick<FileProgress, "chunksTransferred" | "transferId">
>(ActionName.ChunkFileTransferSend)
export const fileTransferGetPrepared = createAction<
  Pick<FileProgress, "chunksCount" | "transferId" | "filePath">
>(ActionName.PreFileTransferGet)
export const fileTransferChunkGet = createAction<
  Pick<FileProgress, "chunksTransferred" | "transferId">
>(ActionName.ChunkFileTransferGet)
export const clearSendErrors = createAction<SendFileErrorPayload>(
  ActionName.ClearFileTransferSendError
)
export const clearGetErrors = createAction<GetFileErrorPayload>(
  ActionName.ClearFileTransferGetError
)
