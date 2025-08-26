/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Query, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector, useStore } from "react-redux"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { AppDispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectEntityData, sendFilesClear } from "generic-view/store"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { EventEmitter } from "events"
import {
  useFilePreviewDownload,
  UseFilePreviewDownloadParams,
} from "./use-file-preview-download"
import { checkPath, getAppPath, removeDirectory } from "system-utils/feature"
import {
  FilePreviewError,
  FilePreviewErrorType,
  isFilePreviewError,
} from "./file-preview-error-types"

export type FilePreviewEntitiesConfig =
  UseFilePreviewDownloadParams["fields"] & {
    type: string
  }

const STALE_TIME = Infinity
const GC_TIME = 60 * 60 * 1000 // 1 hour

enum QueueEvent {
  Busy = "queueBusy",
  Free = "queueFree",
}

type QueryData = {
  fileName: string
  fileType?: string
  filePath?: string
  nativeFilePath?: string
} | null

interface Params {
  entitiesIds: string[]
  entitiesType: string
  entityId?: string
  entitiesConfig: FilePreviewEntitiesConfig
}

export const useFilePreview = ({
  entitiesIds,
  entitiesType,
  entityId,
  entitiesConfig,
}: Params) => {
  const store = useStore<ReduxRootState>()
  const dispatch = useDispatch<AppDispatch>()
  const queryClient = useQueryClient()

  const eventEmitterRef = useRef(new EventEmitter())
  const queueBusyRef = useRef(false)

  const [tempDirectoryPath, setTempDirectoryPath] = useState<string>()
  const deviceId = useSelector(activeDeviceIdSelector)

  const actionId = entitiesConfig.type + "Preview"
  const queryEnabled = entityId !== undefined

  const { downloadFile, cancelDownload, removeFile } = useFilePreviewDownload({
    actionId: actionId,
    tempDirectoryPath,
    entitiesType: entitiesConfig.type,
    fields: entitiesConfig,
  })

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

  const getBaseFileData = useCallback(
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
        fileName: (entity?.[entitiesConfig.titleField] as string) || "",
        fileType: (entity?.[entitiesConfig.mimeTypeField] as string) || "",
      }
    },
    [
      deviceId,
      entitiesConfig.mimeTypeField,
      entitiesConfig.titleField,
      entitiesType,
      store,
    ]
  )

  const getNextFileId = useCallback(() => {
    const currentIndex = entitiesIds.findIndex((id) => id === entityId)
    const nextIndex = currentIndex + 1
    if (nextIndex < entitiesIds.length) {
      return entitiesIds[nextIndex]
    }
    return entitiesIds[0]
  }, [entitiesIds, entityId])

  const getPrevFileId = useCallback(() => {
    const currentIndex = entitiesIds.findIndex((id) => id === entityId)
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      return entitiesIds[prevIndex]
    }
    return entitiesIds[entitiesIds.length - 1]
  }, [entitiesIds, entityId])

  // const surroundingFilesIds = useMemo(() => {
  //   const currentIndex = entitiesIds.findIndex((id) => id === entityId)
  //   const nextIndex = currentIndex + 1
  //   const prevIndex = currentIndex - 1
  //
  //   return {
  //     prevFileId:
  //       prevIndex >= 0
  //         ? entitiesIds[prevIndex]
  //         : entitiesIds[entitiesIds.length - 1],
  //     nextFileId:
  //       nextIndex < entitiesIds.length
  //         ? entitiesIds[nextIndex]
  //         : entitiesIds[0],
  //   }
  // }, [entitiesIds, entityId])

  const fileBaseData = useMemo(() => {
    return getBaseFileData(entityId)
  }, [entityId, getBaseFileData])

  const queryKey = useMemo(() => {
    return ["filePreview", entityId]
  }, [entityId])

  const queryFn = useCallback(
    async (id?: string, signal?: AbortSignal) => {
      if (!id) {
        return null
      }

      // Delay request before blocking the queue, to properly handle quick switching between files
      await new Promise((r) => setTimeout(r, 500))
      if (signal?.aborted) {
        await cancelDownload(id)
        return null
      }

      eventEmitterRef.current.emit(QueueEvent.Busy)

      if (queueBusyRef.current) {
        await new Promise<void>((resolve) => {
          eventEmitterRef.current.once(QueueEvent.Free, () => {
            resolve()
          })
        })
        if (signal?.aborted) {
          await cancelDownload(id)
          return null
        }
      } else {
        queueBusyRef.current = true
      }

      try {
        const entityData = getBaseFileData(id)

        // Check for unsupported file types
        if (entityData.fileType.toLowerCase().startsWith("image")) {
          if (entityData.fileName.toLowerCase().endsWith(".heic")) {
            throw {
              type: FilePreviewErrorType.UnsupportedFileType,
              details: "HEIC",
            } satisfies FilePreviewError
          }
          if (entityData.fileName.toLowerCase().endsWith(".heif")) {
            throw {
              type: FilePreviewErrorType.UnsupportedFileType,
              details: "HEIF",
            } satisfies FilePreviewError
          }
        }

        const file = await downloadFile(id)

        if (!file) {
          throw {
            type: FilePreviewErrorType.FileNotFound,
          } satisfies FilePreviewError
        }

        return {
          ...entityData,
          filePath: file.path,
          nativeFilePath: file.nativePath,
        }
      } catch (error) {
        await cancelDownload(id)
        if (isFilePreviewError(error)) {
          throw error
        }
        throw {
          type: FilePreviewErrorType.Unknown,
        } satisfies FilePreviewError
      } finally {
        eventEmitterRef.current.emit(QueueEvent.Free)
        queueBusyRef.current = false
      }
    },
    [cancelDownload, downloadFile, getBaseFileData]
  )

  const clearOutdatedFiles = useCallback(
    async (ignoredFiles: string[] = []) => {
      const queries = queryClient.getQueryCache().findAll({
        predicate: (query) => {
          return (
            query.queryKey[0] === "filePreview" &&
            ![entityId, ...ignoredFiles].includes(query.queryKey[1] as string)
          )
        },
      }) as Query<QueryData>[]

      await Promise.all(
        queries.map(async (query) => {
          const id = query.queryKey[1] as string
          const path = query.state.data?.nativeFilePath
          if (path) {
            await removeFile({ path })
          }
          queryClient.removeQueries({
            queryKey: ["filePreview", id],
          })
        })
      )
    },
    [entityId, queryClient, removeFile]
  )

  const preloadSurroundingEntities = useCallback(async () => {
    const nextId = getNextFileId()
    const prevId = getPrevFileId()

    await clearOutdatedFiles([nextId, prevId])

    await queryClient.prefetchQuery({
      queryKey: ["filePreview", nextId],
      queryFn: ({ signal }) => queryFn(nextId, signal),
      networkMode: "offlineFirst",
      retry: false,
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
    })
    await queryClient.prefetchQuery({
      queryKey: ["filePreview", prevId],
      queryFn: ({ signal }) => queryFn(prevId, signal),
      networkMode: "offlineFirst",
      retry: false,
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
    })
  }, [clearOutdatedFiles, getNextFileId, getPrevFileId, queryClient, queryFn])

  const cancel = useCallback(async () => {
    await queryClient.cancelQueries({
      queryKey: ["filePreview", entityId],
    })
  }, [entityId, queryClient])

  const query = useQuery<QueryData, FilePreviewError>({
    queryKey,
    queryFn: ({ signal }) => queryFn(entityId, signal),
    enabled: queryEnabled,
    retry: (failureCount, error) => {
      // Retry only for errors other than unsupported file type
      return error.type === FilePreviewErrorType.UnsupportedFileType
        ? false
        : failureCount < 1
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    networkMode: "offlineFirst",
  })

  useEffect(() => {
    if (query.isSuccess) {
      void preloadSurroundingEntities()
    }
  }, [preloadSurroundingEntities, query.isSuccess])

  useEffect(() => {
    if (queryEnabled) {
      void ensureTempDirectory()
    } else {
      queryClient.removeQueries({
        queryKey: ["filePreview"],
      })
      void clearTempDirectory()
    }
  }, [clearTempDirectory, ensureTempDirectory, queryClient, queryEnabled])

  return {
    ...query,
    ...fileBaseData,
    getNextFileId,
    getPrevFileId,
    cancel,
  }
}
