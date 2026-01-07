/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { theme } from "app-theme/utils"
import {
  restoreBackup,
  RestoreBackupParams,
} from "../actions/restore-backup/restore-backup"
import { useApiFeatureQuery } from "./use-api-feature.query"

interface Variables {
  features: RestoreBackupParams["features"]
}

export const useApiDeviceBackupRestoreMutation = (
  device?: ApiDevice,
  onSuccess?: VoidFunction,
  onError?: (aborted?: boolean) => void
) => {
  const { data: fileManagerData } = useApiFeatureQuery(
    "mc-file-manager-internal",
    device
  )
  const abortControllerRef = useRef(new AbortController())
  const [progress, setProgress] = useState(0)
  const [neededSpace, setNeededSpace] = useState<number>()

  const freeSpace = useMemo(() => {
    return fileManagerData?.data.storageInformation?.[0]?.freeSpaceBytes
  }, [fileManagerData?.data.storageInformation])

  const confirmSpaceAvailability = useCallback(
    async (requiredSpace: number): Promise<boolean> => {
      if (freeSpace !== undefined) {
        setNeededSpace(requiredSpace - freeSpace)
        return freeSpace >= requiredSpace
      }
      return true
    },
    [freeSpace]
  )

  const mutation = useMutation({
    mutationFn: async ({ features }: Variables) => {
      if (!device) {
        throw new Error("Device is not defined")
      }

      await restoreBackup({
        device,
        features,
        onProgress: setProgress,
        abortController: abortControllerRef.current,
        confirmSpaceAvailability,
      })
    },
    onMutate: () => {
      setProgress(0)
      setNeededSpace(undefined)
    },
    onSuccess,
    onError: (error) => {
      onError?.(error instanceof AbortSignal)
    },
    onSettled: () => {
      setTimeout(() => {
        setProgress(0)
      }, theme.app.constants.modalTransitionDuration)
    },
  })

  const abort = useCallback(() => {
    abortControllerRef.current.abort()
    abortControllerRef.current = new AbortController()
    mutation.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      abort()
    }
  }, [abort])

  return { ...mutation, progress, neededSpace, abort }
}
