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
  sendFilesClear,
} from "generic-view/store"
import { AppDispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { useCallback, useEffect, useRef, useState } from "react"
import { checkPath, getAppPath, removeDirectory } from "system-utils/feature"
import {
  isMtpPathInternal,
  sliceMtpPaths,
} from "../buttons/button-base/file-transfer-paths-helper"
import { validateFilesToExport } from "../shared/validate-files-to-export"
import path from "node:path"
import { difference } from "lodash"

interface FilePreviewResponse {
  path: string
  name: string
  type: string
}

interface Params {
  pathField: string
  tempDirectoryPath?: string
  actionId: string
  entitiesType: string
}

const useFilePreviewDownload = ({
  pathField,
  tempDirectoryPath,
  actionId,
  entitiesType,
}: Params) => {
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
        safePath: `safe-file://${nativePath}`,
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

      const fileName = entity.fileName as string
      onFileNameFound?.(fileName)
      const fileType = (entity.mimeType as string).split("/")[0].toLowerCase()
      const filePath = getFilePath(entity[pathField] as string)
      if (!filePath) {
        return
      }

      if ((await checkPath(filePath.nativePath)).data) {
        return {
          path: filePath.safePath,
          name: fileName,
          type: fileType,
        }
      }
      await checkPath(filePath.nativeDir, true)

      const fileData: FileWithPath = {
        id: String(entityId),
        path: sliceMtpPaths(
          entity.filePath as string,
          entity.isInternal as boolean
        ),
        name: String(entity.fileName),
        size: Number(entity.fileSize),
        groupId: actionId,
      }

      const validationError = await validateFilesToExport(
        [fileData],
        tempDirectoryPath
      )
      if (validationError) {
        return
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

      if (response.meta.requestStatus === "rejected") {
        return
      }

      return {
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
      getFilePath,
      pathField,
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
      const path = getFilePath(entity[pathField] as string)?.nativePath
      if (path) {
        await removeDirectory(path)
      }
    },
    [deviceId, entitiesType, getFilePath, pathField, store, tempDirectoryPath]
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

interface UseFilesPreviewParams {
  items: string[]
  activeItem?: string
  entitiesConfig: {
    type: string
    idField: string
    pathField: string
  }
}

export const useFilesPreview = ({
  items,
  activeItem,
  entitiesConfig,
}: UseFilesPreviewParams) => {
  const actionId = entitiesConfig.type + "Preview"
  const dispatch = useDispatch<AppDispatch>()

  const previousFile = useRef<string>()
  const nextFile = useRef<string>()
  const currentFile = useRef<string>()

  const [tempDirectoryPath, setTempDirectoryPath] = useState<string>()
  const [currentFileInfo, setCurrentFileInfo] =
    useState<Partial<FilePreviewResponse>>()
  const [isLoading, setIsLoading] = useState(false)

  const { downloadFile, cancelDownload } = useFilePreviewDownload({
    actionId,
    pathField: entitiesConfig.pathField,
    tempDirectoryPath,
    entitiesType: entitiesConfig.type,
  })

  const refreshFiles = useCallback(
    async (oldFiles: string[], newFiles: string[]) => {
      setIsLoading(true)

      const filesToRemove = difference(oldFiles, newFiles)
      for (const fileId of filesToRemove) {
        await cancelDownload(fileId)
      }

      for (const fileId of newFiles) {
        if (fileId === currentFile.current) {
          const fileInfo = await downloadFile(fileId, (name) => {
            setCurrentFileInfo({
              name,
            })
          })
          setCurrentFileInfo(fileInfo)
          setIsLoading(false)
        } else {
          await downloadFile(fileId)
        }
      }
    },
    [cancelDownload, downloadFile]
  )

  useEffect(() => {
    if (!activeItem) return
    const currentIndex = items.indexOf(activeItem)
    const previousIndex = (currentIndex - 1 + items.length) % items.length
    const nextIndex = (currentIndex + 1) % items.length

    const currentFileId = items[currentIndex]
    const previousFileId = items[previousIndex]
    const nextFileId = items[nextIndex]

    const oldFiles = [
      currentFile.current,
      nextFile.current,
      previousFile.current,
    ].filter(Boolean) as string[]
    const newFiles = [currentFileId, nextFileId, previousFileId].filter(
      Boolean
    ) as string[]

    currentFile.current = currentFileId
    nextFile.current = nextFileId
    previousFile.current = previousFileId

    void refreshFiles(oldFiles, newFiles)
  }, [activeItem, cancelDownload, downloadFile, items, refreshFiles])

  const ensureTempDirectory = useCallback(async () => {
    const destinationPath = await getAppPath("filePreview")
    if (destinationPath.ok) {
      await checkPath(destinationPath.data, true)
      setTempDirectoryPath(destinationPath.data)
    }
  }, [])

  const clearTempDirectory = useCallback(async () => {
    dispatch(sendFilesClear({ groupId: actionId }))
    if (tempDirectoryPath) {
      await removeDirectory(tempDirectoryPath)
    }
  }, [actionId, dispatch, tempDirectoryPath])

  useEffect(() => {
    void ensureTempDirectory()
  }, [ensureTempDirectory])

  useEffect(() => {
    if (!activeItem) {
      void clearTempDirectory()
    }
  }, [activeItem, clearTempDirectory])

  return {
    data: isLoading ? undefined : currentFileInfo,
    nextId: nextFile.current,
    previousId: previousFile.current,
    isLoading,
  }
}
