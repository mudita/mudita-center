/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { FileProgress } from "./reducer"

export const fileTransferPrepared = createAction<
  Pick<FileProgress, "chunksCount" | "transferId">
>(ActionName.PreFileTransferSend)
export const fileTransferChunkSent = createAction<
  Pick<FileProgress, "chunksTransferred" | "transferId">
>(ActionName.ChunkFileTransferSend)
