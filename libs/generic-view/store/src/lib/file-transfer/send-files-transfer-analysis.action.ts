/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectFilesSendingGroup } from "../selectors"
import { ApiFileTransferError } from "device/models"
import { trackWithoutDeviceCheckRequest } from "Core/analytic-data-tracker/requests"
import { TrackEventCategory } from "Core/analytic-data-tracker/constants"

export const sendFilesTransferAnalysis = createAsyncThunk<
  void,
  { groupId?: string },
  { state: ReduxRootState }
>(ActionName.SendFilesTransferAnalysis, async ({ groupId }, { getState }) => {
  const { trackingInfo } = getState().genericFileTransfer

  const files = selectFilesSendingGroup(
    getState(),
    groupId ? { groupId } : undefined
  )
  const succeededFiles = files.filter(
    (file) => file.status === "finished" && !("error" in file)
  )
  const failedFiles = files.filter((file) => {
    return succeededFiles.findIndex(({ id }) => id === file.id) === -1
  })

  const isAborted = failedFiles.some((file) => {
    return (
      (file.status === "finished" &&
        "error" in file &&
        file.error?.type === ApiFileTransferError.Aborted) ||
      file.status === "in-progress"
    )
  })
  const succeededLength = succeededFiles.length
  const failedLength = failedFiles.length

  const status =
    failedLength === 0 ? "succeeded" : isAborted ? "aborted" : "failed"

  const modes = Object.values(trackingInfo || {})
    .map(({ modes }) =>
      modes.map((mode) => (mode === "mtp" ? "m" : "s")).join("")
    )
    .join(",")

  void trackWithoutDeviceCheckRequest({
    e_c: TrackEventCategory.FileTransferSend,
    e_a: `${status}/${succeededLength},${failedLength}/${modes}`,
  })
})
