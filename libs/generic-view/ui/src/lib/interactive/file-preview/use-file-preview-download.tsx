/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector, useStore } from "react-redux"
import {
  FileWithPath,
  selectEntityData,
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
        nativePath: nativePath,
        safePath:
          process.platform === "win32"
            ? nativePath
            : `safe-file://${nativePath}`,
      }
    },
    [tempDirectoryPath]
  )

  const downloadFile = useCallback(
    async (
      entityId: string,
      onFileNameFound?: (name: string) => void
    ): Promise<FilePreviewResponse | undefined> => {
      if (!deviceId || !tempDirectoryPath) {
        return
      }
      const entity = selectEntityData(store.getState(), {
        deviceId,
        entitiesType,
        entityId,
      })

      if (!entity || !("filePath" in entity) || !("fileName" in entity)) {
        return
      }

      const fileName = entity[fields.titleField] as string
      onFileNameFound?.(fileName)
      const fileType = (entity[fields.mimeTypeField] as string)
        .split("/")[0]
        .toLowerCase()
      const filePath = getFilePath(entity[fields.pathField] as string)
      if (!filePath) {
        return
      }

      if ((await checkPath(filePath.nativePath)).data) {
        return {
          id: entityId,
          path: filePath.safePath,
          name: fileName,
          type: fileType,
        }
      }
      await checkPath(filePath.nativeDir, true)

      const fileData: FileWithPath = {
        id: entityId,
        path: sliceMtpPaths(
          entity[fields.pathField] as string,
          entity.isInternal as boolean
        ),
        name: String(entity[fields.titleField]),
        size: Number(entity[fields.sizeField]),
        groupId: actionId,
      }

      const promise = dispatch(
        sendFiles({
          files: [fileData],
          destinationPath: filePath.nativeDir,
          actionId,
          entitiesType,
          isMtpPathInternal: isMtpPathInternal(
            entity[fields.pathField] as string
          ),
          actionType: SendFilesAction.ActionExport,
        })
      ) as unknown as ReturnType<ReturnType<typeof sendFiles>>

      abortReferences.current[entityId] = (
        promise as unknown as {
          abort: VoidFunction
        }
      ).abort

      const response = await promise

      if (response.meta.requestStatus === "rejected") {
        return
      }

      return {
        id: entityId,
        path: filePath.safePath,
        name: fileName,
        type: fileType,
      }
    },
    [
      actionId,
      deviceId,
      dispatch,
      entitiesType,
      fields.mimeTypeField,
      fields.pathField,
      fields.sizeField,
      fields.titleField,
      getFilePath,
      store,
      tempDirectoryPath,
    ]
  )

  const removePreviewFile = useCallback(
    async (entityId: string) => {
      if (!deviceId || !tempDirectoryPath) {
        return
      }
      const entity = selectEntityData(store.getState(), {
        deviceId,
        entitiesType,
        entityId,
      })
      if (!entity) {
        return
      }
      const path = getFilePath(entity[fields.pathField] as string)?.nativePath
      if (path) {
        await removeDirectory(path)
      }
    },
    [
      deviceId,
      entitiesType,
      fields.pathField,
      getFilePath,
      store,
      tempDirectoryPath,
    ]
  )

  const cancelDownload = useCallback(
    async (entityId: string) => {
      if (abortReferences.current[entityId]) {
        abortReferences.current[entityId]()
        delete abortReferences.current[entityId]
      }
      await removePreviewFile(entityId)
    },
    [removePreviewFile]
  )

  return {
    downloadFile,
    cancelDownload,
  }
}
