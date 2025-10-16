/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, PreBackupRequest } from "devices/api-device/models"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"
import { theme } from "app-theme/utils"
import { createBackup } from "../actions/create-backup/create-backup"
import { apiDeviceQueryKeys } from "./api-device-query-keys"

interface Variables {
  password?: string
  features: PreBackupRequest["features"]
}

export const useApiDeviceBackupCreateMutation = (
  device?: ApiDevice,
  onSuccess?: VoidFunction,
  onError?: (aborted?: boolean) => void
) => {
  const queryClient = useQueryClient()
  const abortControllerRef = useRef(new AbortController())
  const [progress, setProgress] = useState(0)

  const mutation = useMutation({
    mutationFn: async ({ features, password }: Variables) => {
      if (!device) {
        throw new Error("Device is not defined")
      }
      return await createBackup({
        device,
        features,
        password,
        onProgress: setProgress,
        abortController: abortControllerRef.current,
      })
    },
    onMutate: () => {
      setProgress(0)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: apiDeviceQueryKeys.backups(device?.id),
      })
      onSuccess?.()
    },
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

  return { ...mutation, progress, abort }
}
