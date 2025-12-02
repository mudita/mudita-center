/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Queue } from "./file-manager-preview-queue"
import { uniq } from "lodash"
import {
  FilesManagerFilePreviewDownload,
  useFileManagerPreviewQuery,
} from "./use-file-manager-preview"
import { FilePreview, FilePreviewFile } from "app-theme/ui"
import { SerialPortDeviceInfo } from "app-serialport/models"

const STALE_TIME = 15 * 60 * 1000 // 15 minutes

export interface FileManagerPreviewProps {
  deviceId: SerialPortDeviceInfo["id"]
  files: FilePreviewFile[]
  onDownload?: (fileId: string) => void
  onDelete?: (fileId: string) => void
  downloadFilePreview?: FilesManagerFilePreviewDownload
  ref?: RefObject<{
    open: (id: FilePreviewFile["id"]) => void
    close: VoidFunction
    next: VoidFunction
    getCurrentId: () => FilePreviewFile["id"] | undefined
  } | null>
}

export const FileManagerPreview: FunctionComponent<FileManagerPreviewProps> = ({
  deviceId,
  files,
  onDownload,
  onDelete,
  downloadFilePreview,
  ref,
}) => {
  const queryClient = useQueryClient()

  const [currentFileId, setCurrentFileId] = useState<FilePreviewFile["id"]>()
  const currentFileIdRef = useRef(currentFileId)
  const queue = useRef<Queue>(undefined)

  const isOpened = Boolean(currentFileId)

  const currentFile = useMemo(() => {
    return files.find((file) => file.id === currentFileId)
  }, [currentFileId, files])

  const {
    data: file,
    isFetching,
    error,
  } = useFileManagerPreviewQuery(deviceId, currentFile, downloadFilePreview)

  const filePreview: FilePreviewFile | undefined = useMemo(() => {
    if (!currentFile) {
      return undefined
    }
    return {
      ...currentFile,
      dataUrl: file?.dataUrl,
    }
  }, [currentFile, file])

  const getQueryKey = useCallback(
    (fileId?: FilePreviewFile["id"]) => {
      return useFileManagerPreviewQuery.queryKey(fileId, deviceId)
    },
    [deviceId]
  )

  const handlePrevious = useCallback(() => {
    if (!currentFileId) {
      setCurrentFileId(files[0]?.id)
      return
    }
    const currentIndex = files.findIndex((file) => file.id === currentFileId)
    const previousIndex = (currentIndex - 1 + files.length) % files.length

    setCurrentFileId(files[previousIndex]?.id)
  }, [currentFileId, files])

  const handleNext = useCallback(() => {
    if (!currentFileId) {
      setCurrentFileId(files[0]?.id)
      return
    }
    const currentIndex = files.findIndex((file) => file.id === currentFileId)
    const nextIndex = (currentIndex + 1) % files.length

    setCurrentFileId(files[nextIndex]?.id)
  }, [currentFileId, files])

  const handleDownload = useCallback(() => {
    if (currentFile?.id) {
      onDownload?.(currentFile.id)
    }
  }, [currentFile?.id, onDownload])

  const handleDelete = useCallback(() => {
    if (currentFile?.id) {
      onDelete?.(currentFile.id)
    }
  }, [currentFile?.id, onDelete])

  const handleOpen = useCallback((fileId: FilePreviewFile["id"]) => {
    setCurrentFileId(fileId)
  }, [])

  const handleClose = useCallback(() => {
    setCurrentFileId(undefined)
  }, [])

  const getCurrentFileId = useCallback(() => {
    return currentFileId
  }, [currentFileId])

  const createQueueTask = useCallback(
    async (id: string, abortController: AbortController) => {
      const file = files.find((file) => file.id === id)

      if (!file) {
        return
      }

      abortController.signal.addEventListener("abort", () => {
        if (id !== currentFileIdRef.current) {
          void queryClient.cancelQueries({
            queryKey: getQueryKey(id),
          })
        }
      })

      await queryClient.prefetchQuery({
        queryKey: getQueryKey(id),
        queryFn: ({ signal: querySignal }) => {
          return useFileManagerPreviewQuery.queryFn({
            file,
            callback: downloadFilePreview,
            abortSignal: querySignal,
          })
        },
        networkMode: "offlineFirst",
        retry: 1,
        staleTime: STALE_TIME,
        gcTime: STALE_TIME,
      })
    },
    [files, queryClient, getQueryKey, downloadFilePreview]
  )

  const fetchFiles = useCallback(
    async (fileId: string) => {
      const index = files.findIndex((file) => file.id === fileId)
      const previousIndex = (index - 1 + files.length) % files.length
      const nextIndex = (index + 1) % files.length
      const afterNextIndex = (index + 2) % files.length

      const previousItemId = files[previousIndex]?.id
      const nextItemId = files[nextIndex]?.id
      const afterNextItemId = files[afterNextIndex]?.id

      const idsToPrefetch = uniq([
        currentFileId,
        nextItemId,
        previousItemId,
        afterNextItemId,
      ]).filter(Boolean) as string[]

      void queue.current?.add(
        idsToPrefetch.map((id) => {
          return {
            id,
            task: (abortController) => createQueueTask(id, abortController),
          }
        })
      )
    },
    [currentFileId, files, createQueueTask]
  )

  const retry = useCallback(async () => {
    if (currentFileId) {
      await fetchFiles(currentFileId)
    }
  }, [currentFileId, fetchFiles])

  useEffect(() => {
    if (!queue.current) {
      queue.current = new Queue()
    }
    if (!currentFileId) {
      queue.current?.destroy()
      queue.current = undefined
    }
  }, [currentFileId])

  useEffect(() => {
    if (currentFileId) {
      currentFileIdRef.current = currentFileId
      void fetchFiles(currentFileId)
    } else {
      currentFileIdRef.current = undefined
      queue.current?.clear()
    }
  }, [currentFileId, fetchFiles])

  useEffect(() => {
    const destroyQueue = () => {
      queue.current?.destroy()
      queue.current = undefined
    }
    return () => {
      destroyQueue()
      queryClient.removeQueries({ queryKey: getQueryKey() })
    }
  }, [getQueryKey, queryClient])

  useImperativeHandle(ref, () => {
    return {
      next: handleNext,
      open: handleOpen,
      close: handleClose,
      getCurrentId: getCurrentFileId,
    }
  }, [getCurrentFileId, handleClose, handleNext, handleOpen])

  return (
    <FilePreview
      opened={isOpened}
      file={filePreview}
      filesCount={files.length}
      onClose={handleClose}
      onPreviousFile={handlePrevious}
      onNextFile={handleNext}
      onDelete={handleDelete}
      onDownload={handleDownload}
      loading={isFetching}
      error={error ?? undefined}
      onRetry={retry}
    />
  )
}
// eslint-disable-next-line no-redeclare
export type FileManagerPreview = NonNullable<
  FileManagerPreviewProps["ref"]
>["current"]
