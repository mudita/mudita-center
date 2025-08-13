/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch } from "react-redux"
import { sendFilesClear } from "generic-view/store"
import { AppDispatch } from "Core/__deprecated__/renderer/store"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { checkPath, getAppPath, removeDirectory } from "system-utils/feature"
import { uniqBy } from "lodash"
import {
  FilePreviewResponse,
  useFilePreviewDownload,
  UseFilePreviewDownloadParams,
} from "./use-file-preview-download"
import { delay, Queue } from "shared/utils"
import delayResponse from "@appnroll/delay-response"

export enum QueuePriority {
  Current = 2,
  Next = 1,
  Prev = 0,
}

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

  const loadingTimeoutRef = useRef<NodeJS.Timeout>()
  const [refetchTrigger, setRefetchTrigger] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [tempDirectoryPath, setTempDirectoryPath] = useState<string>()
  const [downloadedItems, setDownloadedItems] = useState<FilePreviewResponse[]>(
    []
  )
  const downloadedItemsDependency = JSON.stringify(
    downloadedItems.map((item) => item.id)
  )

  const { downloadFile, cancelDownload } = useFilePreviewDownload({
    actionId,
    tempDirectoryPath,
    entitiesType: entitiesConfig.type,
    fields: entitiesConfig,
  })

  const queue = useMemo(() => {
    return new Queue({ interval: 100, capacity: 3 })
  }, [])

  const getNearestFiles = useCallback(
    (item?: string) => {
      if (!item || !items.length) {
        return { previous: undefined, next: undefined }
      }
      const currentIndex = items.indexOf(item)
      return {
        previous: items[(currentIndex - 1 + items.length) % items.length],
        next: items[(currentIndex + 1) % items.length],
      }
    },
    [items]
  )

  const nearestFiles = useMemo(() => {
    return getNearestFiles(activeItem)
  }, [activeItem, getNearestFiles])

  const currentFile = useMemo(() => {
    if (!activeItem) return undefined
    return downloadedItems.find((item) => item.id === activeItem)
    // eslint-disable-next-line
  }, [activeItem, downloadedItemsDependency, refetchTrigger])

  const getFilePriority = useCallback(
    (fileId: string) => {
      if (fileId === activeItem) {
        return QueuePriority.Current
      }
      const nearest = getNearestFiles(activeItem)
      if (fileId === nearest.next) {
        return QueuePriority.Next
      }
      return QueuePriority.Prev
    },
    [activeItem, getNearestFiles]
  )

  const downloadFiles = useCallback(
    (filesIds: string[]) => {
      for (const fileId of filesIds) {
        void queue.add({
          id: fileId,
          task: async () => {
            const fileInfo = await delayResponse(downloadFile(fileId), 500)
            if (fileInfo) {
              setDownloadedItems((prev) => uniqBy([...prev, fileInfo], "id"))
              // if (fileId === activeItem) {
              //   setIsLoading(false)
              // }
            }
          },
          priority: getFilePriority(fileId),
        })
      }
    },
    [downloadFile, getFilePriority, queue]
  )

  useEffect(() => {
    if (!currentFile?.id) return

    const filesToRemove = downloadedItems.filter((item) => {
      return (
        item.id !== currentFile.id &&
        item.id !== nearestFiles.next &&
        item.id !== nearestFiles.previous
      )
    })

    if (filesToRemove.length > 0) {
      for (const file of filesToRemove) {
        void cancelDownload(file.id)
        setDownloadedItems((prev) => prev.filter((item) => item.id !== file.id))
      }
    }
    // eslint-disable-next-line
  }, [
    currentFile?.id,
    cancelDownload,
    downloadedItemsDependency,
    nearestFiles.next,
    nearestFiles.previous,
  ])

  useEffect(() => {
    if (!activeItem) return

    const filesToDownload = [
      activeItem,
      nearestFiles.next,
      nearestFiles.previous,
    ].filter(Boolean) as string[]

    downloadFiles(filesToDownload)
  }, [
    activeItem,
    nearestFiles.next,
    nearestFiles.previous,
    downloadFiles,
    refetchTrigger,
  ])

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

  const refetch = useCallback(() => {
    setDownloadedItems((prev) => {
      return prev.filter((item) => item.id === activeItem)
    })
    setIsLoading(true)
    setRefetchTrigger((prev) => prev + 1)
  }, [activeItem])

  useEffect(() => {
    if (activeItem) {
      console.log("setIsLoading true")
      setIsLoading(true)
    }
  }, [activeItem])

  useEffect(() => {
    clearTimeout(loadingTimeoutRef.current)

    loadingTimeoutRef.current = setTimeout(() => {
      if (downloadedItems.some((item) => item.id === activeItem)) {
        console.log("setIsLoading false")
        setIsLoading(false)
      }
    }, 500)
  }, [activeItem, downloadedItems])

  useEffect(() => {
    if (!activeItem) {
      void clearTempDirectory()
      setDownloadedItems([])
    }
  }, [activeItem, clearTempDirectory])

  useEffect(() => {
    void ensureTempDirectory()
    return () => {
      queue.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    data: currentFile,
    nextId: nearestFiles.next,
    previousId: nearestFiles.previous,
    refetch,
    isLoading,
  }
}
