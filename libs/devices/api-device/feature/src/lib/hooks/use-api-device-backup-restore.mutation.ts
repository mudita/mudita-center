/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"
import { theme } from "app-theme/utils"
import {
  restoreBackup,
  RestoreBackupParams,
} from "../actions/restore-backup/restore-backup"

interface Variables {
  features: RestoreBackupParams["features"]
}

export const useApiDeviceBackupRestoreMutation = (
  device?: ApiDevice,
  onSuccess?: VoidFunction,
  onError?: (aborted?: boolean) => void
) => {
  const abortControllerRef = useRef(new AbortController())
  const [progress, setProgress] = useState(0)

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
      })
    },
    onMutate: () => {
      setProgress(0)
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

  return { ...mutation, progress, abort }
}
