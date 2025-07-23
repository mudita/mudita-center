/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiFileTransferError } from "device/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { AppError } from "Core/core/errors"
import { ActionName } from "../action-names"
import { FileBase, FileWithPath } from "./reducer"
import { addFileTransferErrors } from "./actions"
import { SendFilesAction } from "./files-transfer.type"
import { selectFilesSendingFailed } from "../selectors/file-transfer-sending"
import { selectEntitiesByIds } from "../selectors"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import {
  isMtpPathInternal,
  sliceMtpPaths,
} from "../../../../ui/src/lib/buttons/button-base/file-transfer-paths-helper"
import { validateFilesToExport } from "Libs/generic-view/ui/src/lib/shared/validate-files-to-export"
import { sendFiles } from "generic-view/store"

export interface ExportFilesPayload {
  ids: string[]
  entitiesType: string
  actionId: string
  files: FileBase[]
  destinationPath: string
  customDeviceId?: DeviceId
  actionType: SendFilesAction
}

export const exportFiles = createAsyncThunk<
  void,
  ExportFilesPayload,
  { state: ReduxRootState }
>(
  ActionName.ExportFiles,
  async (
    {
      ids,
      entitiesType,
      actionId,
      files,
      destinationPath,
      customDeviceId,
      actionType,
    },
    { dispatch, signal, abort, rejectWithValue, getState }
  ) => {
    const deviceId = activeDeviceIdSelector(getState())

    if (!deviceId) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, "Device not found")
      )
    }

    const entities = selectEntitiesByIds(getState(), {
      deviceId,
      entitiesType: entitiesType,
      ids,
    })
    const exportFilesData: FileWithPath[] = entities.map((entity) => ({
      id: String(entity.id),
      path: sliceMtpPaths(
        entity.filePath as string,
        entity.isInternal as boolean
      ),
      name: String(entity.fileName),
      size: Number(entity.fileSize),
      groupId: actionId,
    }))

    const validationError = await validateFilesToExport(
      exportFilesData,
      destinationPath
    )

    if (validationError !== undefined) {
      dispatch(
        addFileTransferErrors({
          actionId,
          errors: [validationError],
        })
      )
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, validationError.type)
      )
      return
    }

    const sourcePath = entities[0].filePath as string

    const response = (await dispatch(
      sendFiles({
        files: exportFilesData,
        destinationPath,
        actionId,
        entitiesType,
        isMtpPathInternal: isMtpPathInternal(sourcePath),
        actionType: SendFilesAction.ActionExport,
      })
    )) as Awaited<ReturnType<ReturnType<typeof sendFiles>>>

    const failedFiles = selectFilesSendingFailed(getState(), {
      groupId: actionId,
    })

    return
  }
)
