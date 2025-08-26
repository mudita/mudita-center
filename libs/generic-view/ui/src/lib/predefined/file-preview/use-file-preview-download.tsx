/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector, useStore } from "react-redux"
import {
  FileWithPath,
  selectEntityData,
  selectFilesSendingFailed,
  sendFiles,
  SendFilesAction,
} from "generic-view/store"
import { AppDispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { useCallback, useRef } from "react"
import { checkPath, removeDirectory } from "system-utils/feature"
import {
  isMtpPathInternal,
  sliceMtpPaths,
} from "../../buttons/button-base/file-transfer-paths-helper"
import path from "node:path"

export interface FilePreviewResponse {
  id: string
  path: string
  nativePath: string
  name: string
  type: string
}

export interface UseFilePreviewDownloadParams {
  tempDirectoryPath?: string
  actionId: string
  entitiesType: string
  fields: {
    idField: string
    pathField: string
    titleField: string
    mimeTypeField: string
    sizeField: string
  }
}

export const useFilePreviewDownload = ({
  tempDirectoryPath,
  actionId,
  entitiesType,
  fields,
}: UseFilePreviewDownloadParams) => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useStore<ReduxRootState>()
  const abortReferences = useRef<Record<string, VoidFunction>>({})
  const deviceId = useSelector(activeDeviceIdSelector)

  const getFilePath = useCallback(
    (entityFilePath: string) => {
      if (!tempDirectoryPath) {
        return undefined
      }
      const deviceFilePath = (entityFilePath as string).split("/")
      const fileName = deviceFilePath.pop() as string
      const nativeDir = path.join(tempDirectoryPath, ...deviceFilePath)
      const nativePath = path.join(nativeDir, fileName)
      return {
        nativeDir,
        nativePath,
        safePath:
          process.platform === "win32"
            ? nativePath
            : `safe-file://${nativePath}`,
      }
    },
    [tempDirectoryPath]
  )

  const getEntityData = useCallback(
    (id?: string) => {
      const entity =
        deviceId && id
          ? selectEntityData(store.getState(), {
              deviceId,
              entitiesType,
              entityId: id,
            })
          : undefined

      return {
        fileName: (entity?.[fields.titleField] as string) || "",
        fileType: (entity?.[fields.mimeTypeField] as string) || "",
        filePath: (entity?.[fields.pathField] as string) || "",
        fileSize: entity?.[fields.sizeField] as number | undefined,
        isInternal: entity?.["isInternal"] as boolean | undefined,
      }
    },
    [
      deviceId,
      store,
      entitiesType,
      fields.titleField,
      fields.mimeTypeField,
      fields.pathField,
      fields.sizeField,
    ]
  )

  const downloadFile = useCallback(
    async (
      entityId: string,
      onFileNameFound?: (name: string) => void
    ): Promise<FilePreviewResponse | undefined> => {
      if (!deviceId || !tempDirectoryPath) {
        return
      }
      const entity = getEntityData(entityId)

      if (!entity.fileName || !entity.filePath || !entity.fileType) {
        return
      }

      const fileName = entity.fileName
      onFileNameFound?.(fileName)
      const fileType = entity.fileType.split("/")[0].toLowerCase()
      const filePath = getFilePath(entity.filePath)
      if (!filePath) {
        return
      }

      if ((await checkPath(filePath.nativePath)).data) {
        return {
          id: entityId,
          path: filePath.safePath,
          nativePath: filePath.nativePath,
          name: fileName,
          type: fileType,
        }
      }
      await checkPath(filePath.nativeDir, true)

      const fileData: FileWithPath = {
        id: entityId,
        path: sliceMtpPaths(entity.filePath, entity.isInternal as boolean),
        name: String(entity.fileName),
        size: Number(entity.fileSize),
        groupId: actionId,
      }

      const promise = dispatch(
        sendFiles({
          files: [fileData],
          destinationPath: filePath.nativeDir,
          actionId,
          entitiesType,
          isMtpPathInternal: isMtpPathInternal(entity.filePath as string),
          actionType: SendFilesAction.ActionExport,
        })
      ) as unknown as ReturnType<ReturnType<typeof sendFiles>>

      abortReferences.current[entityId] = (
        promise as unknown as {
          abort: VoidFunction
        }
      ).abort

      const response = await promise

      const requestFailed =
        selectFilesSendingFailed(store.getState(), {
          filesIds: [entityId],
        }).length > 0

      if (response.meta.requestStatus === "rejected" || requestFailed) {
        throw new Error("Preview download failed")
      }

      delete abortReferences.current[entityId]
      return {
        id: entityId,
        path: filePath.safePath,
        nativePath: filePath.nativePath,
        name: fileName,
        type: fileType,
      }
    },
    [
      actionId,
      deviceId,
      dispatch,
      entitiesType,
      getEntityData,
      getFilePath,
      store,
      tempDirectoryPath,
    ]
  )

  const removeFile = useCallback(
    async (params: { entityId: string } | { path: string }) => {
      let filePath: string | undefined

      if ("path" in params) {
        filePath = params.path
      } else if ("entityId" in params) {
        if (!deviceId || !tempDirectoryPath) {
          return
        }
        const entity = getEntityData(params.entityId)
        if (!entity.filePath) {
          return
        }
        filePath = getFilePath(entity.filePath)?.nativePath
      }
      if (filePath) {
        await removeDirectory(filePath)
      }
    },
    [deviceId, getEntityData, getFilePath, tempDirectoryPath]
  )

  const cancelDownload = useCallback(
    async (entityId: string) => {
      if (abortReferences.current[entityId]) {
        abortReferences.current[entityId]()
        delete abortReferences.current[entityId]
      }
      await removeFile({ entityId })
    },
    [removeFile]
  )

  return {
    downloadFile,
    cancelDownload,
    removeFile,
  }
}
