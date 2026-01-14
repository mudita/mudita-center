/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sum } from "lodash"
import { delay } from "app-utils/common"
import {
  Harmony,
  HarmonyOSUpdateError,
  HarmonyOSUpdateStatus,
} from "devices/harmony/models"
import { FailedTransferErrorName } from "devices/common/models"
import { AnalyticsEventCategory } from "app-utils/models"
import { useDeviceFreezer } from "app-serialport/renderer"
import { track } from "app-utils/renderer"
import { updateHarmony } from "../api/update-harmony"
import { removeFileFromHarmony } from "../api/remove-file-from-harmony"
import { uploadFiles } from "../actions/upload-files"
import { getHarmonyInfo } from "../api/get-harmony-info"
import {
  HarmonyOsUpdateInfoFile,
  useHarmonyOsUpdateInfoQuery,
} from "./use-harmony-os-update-info.query"
import { getHarmonyOsDownloadLocation } from "./use-harmony-os-download.mutation"
import { useHarmonyTimeQuery } from "./use-harmony-time.query"

export const useHarmonyOsUpdateMutation = (device?: Harmony) => {
  const queryClient = useQueryClient()
  const { freeze, isDeviceFrozen } = useDeviceFreezer()

  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [requiredSpace, setRequiredSpace] = useState(0)
  const [status, setStatus] = useState<HarmonyOSUpdateStatus>(
    HarmonyOSUpdateStatus.Idle
  )
  const abortControllerRef = useRef(new AbortController())

  const mutation = useMutation<
    void,
    HarmonyOSUpdateError,
    HarmonyOsUpdateInfoFile[],
    void
  >({
    mutationFn: async (updateInfo: HarmonyOsUpdateInfoFile[]) => {
      if (!device) {
        throw HarmonyOSUpdateError.UpdateFailed
      }
      // Helpers for progress calculation
      const totalFilesSizes = updateInfo.map((info) => info.size)
      const uploadedFilesSizes: Record<string, number> = {}

      for (let i = 0; i < updateInfo.length; i++) {
        if (abortControllerRef.current.signal.aborted) {
          throw HarmonyOSUpdateError.UpdateAborted
        }
        setCurrentStep(i + 1)
        const item = updateInfo[i]

        // Retrieve the device path where the update file will be sent
        const deviceInfo = await getHarmonyInfo(device)
        if (!deviceInfo.ok) {
          void track({
            e_a: item.version,
            e_n: "unknown",
            e_c: AnalyticsEventCategory.HarmonyUpdateFail,
          })

          throw HarmonyOSUpdateError.UpdateFailed
        }

        void track({
          e_a: item.version,
          e_n: deviceInfo.body.version,
          e_c: AnalyticsEventCategory.HarmonyUpdateStart,
        })

        // Check if the previous update was applied successfully (for sequential updates)
        if (i > 0 && deviceInfo.body.version !== updateInfo[i - 1].version) {
          void track({
            e_a: item.version,
            e_n: deviceInfo.body.version,
            e_c: AnalyticsEventCategory.HarmonyUpdateFail,
          })

          throw HarmonyOSUpdateError.UpdateFailed
        }

        // Check if there is enough free space on the device
        const { deviceSpaceTotal, systemReservedSpace, usedUserSpace } =
          deviceInfo.body
        if (deviceSpaceTotal && systemReservedSpace && usedUserSpace) {
          const freeSpace =
            deviceSpaceTotal - systemReservedSpace - usedUserSpace
          const requiredSpace = item.size * 3 // 300% buffer
          if (freeSpace < requiredSpace) {
            setRequiredSpace(requiredSpace)

            void track({
              e_a: item.version,
              e_n: deviceInfo.body.version,
              e_c: AnalyticsEventCategory.HarmonyUpdateFail,
            })

            throw HarmonyOSUpdateError.NotEnoughSpace
          }
        }

        const deviceUpdateTargetPath = deviceInfo.body.updateFilePath

        // Send downloaded update file to device
        setStatus(HarmonyOSUpdateStatus.Installing)
        try {
          await uploadFiles({
            device,
            files: [
              {
                id: item.name,
                source: {
                  type: "fileLocation",
                  fileLocation: getHarmonyOsDownloadLocation(item.name),
                },
                target: {
                  type: "path",
                  path: deviceUpdateTargetPath,
                },
              },
            ],
            abortController: abortControllerRef.current,
            onProgress: (progress) => {
              // Calculate overall progress
              uploadedFilesSizes[item.name] = progress.loaded
              setProgress(
                Math.floor(
                  (sum(Object.values(uploadedFilesSizes)) /
                    sum(totalFilesSizes)) *
                    100
                )
              )
            },
          })
        } catch (error) {
          if (error === FailedTransferErrorName.Aborted) {
            throw HarmonyOSUpdateError.UpdateAborted
          }
          void track({
            e_a: item.version,
            e_n: deviceInfo.body.version,
            e_c: AnalyticsEventCategory.HarmonyUpdateFail,
          })
          throw HarmonyOSUpdateError.UpdateFailed
        }

        // Freeze device to prepare for update
        freeze(device, 5 * 60_000) // 5 minutes
        await delay(500)

        // Restart device to apply update
        setStatus(HarmonyOSUpdateStatus.Restarting)
        await updateHarmony(device)

        // Wait for device to disconnect and freeze
        while (!(await isDeviceFrozen(device))) {
          if (abortControllerRef.current.signal.aborted) {
            break
          }
          await delay(500)
        }

        // Wait for device to reconnect and unfreeze
        while (await isDeviceFrozen(device)) {
          if (abortControllerRef.current.signal.aborted) {
            break
          }
          await delay(500)
        }

        // Remove os update file after update
        await removeFileFromHarmony({
          device,
          targetPath: deviceUpdateTargetPath,
        })

        if (abortControllerRef.current.signal.aborted) {
          throw HarmonyOSUpdateError.UpdateAborted
        }

        // Small delay to ensure device is ready for next file
        await delay(500)

        void track({
          e_a: item.version,
          e_n: deviceInfo.body.version,
          e_c: AnalyticsEventCategory.HarmonyUpdateSuccess,
        })
      }
      return
    },
    onMutate: () => {
      // Reset state before starting
      setProgress(0)
      setStatus(HarmonyOSUpdateStatus.Idle)
      setCurrentStep(1)
    },
    onSettled: async () => {
      // Remove the update file on either success, error or abort
      if (!device) {
        return
      }
      void queryClient.refetchQueries({
        queryKey: useHarmonyTimeQuery.queryKey(device.id),
      })
      await queryClient.invalidateQueries({
        queryKey: useHarmonyOsUpdateInfoQuery.queryKey(device?.id),
      })
      const deviceInfo = await getHarmonyInfo(device)
      if (deviceInfo.ok) {
        await removeFileFromHarmony({
          device,
          targetPath: deviceInfo.body.updateFilePath,
        })
      }
    },
  })

  const abort = useCallback(() => {
    abortControllerRef.current.abort()
    abortControllerRef.current = new AbortController()
    mutation.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.reset])

  useEffect(() => {
    return () => {
      abort()
    }
  }, [abort])

  return {
    ...mutation,
    abort,
    progress,
    status,
    currentStep,
    requiredSpace,
  }
}
