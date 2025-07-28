/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import { sendFilesClear } from "generic-view/store"
import { AppDispatch } from "Core/__deprecated__/renderer/store"
import { useCallback, useEffect, useRef, useState } from "react"
import { checkPath, getAppPath, removeDirectory } from "system-utils/feature"
import { difference } from "lodash"
import {
  FilePreviewResponse,
  useFilePreviewDownload,
  UseFilePreviewDownloadParams,
} from "./use-file-preview-download"

export interface UseFilesPreviewParams {
  items: string[]
  activeItem?: string
  entitiesConfig: UseFilePreviewDownloadParams["fields"] & {
    type: string
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
    tempDirectoryPath,
    entitiesType: entitiesConfig.type,
    fields: entitiesConfig,
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
              id: fileId,
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
    data: currentFileInfo,
    nextId: nextFile.current,
    previousId: previousFile.current,
    isLoading,
  }
}
