/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useMemo } from "react"
import { HarmonyDirectory, Harmony } from "devices/harmony/models"
import { useDeviceConfigQuery } from "devices/common/feature"
import { useHarmonyFileListQuery } from "devices/harmony/feature"
import {
  HarmonyManageFilesData,
  mapHarmonyToManageFiles,
} from "./map-to-harmony-manage-files-data"

interface HarmonyManageFilesDataViewData extends HarmonyManageFilesData {
  isLoading: boolean
  isError: boolean
  refetch: () => Promise<void>
}

export const useHarmonyManageFiles = (
  activeDevice?: Harmony
): HarmonyManageFilesDataViewData => {
  const {
    data: config,
    isLoading: isConfigLoading,
    isError: isConfigError,
    refetch: refetchConfig,
  } = useDeviceConfigQuery(activeDevice, {
    refetchIntervalInBackground: false,
    refetchInterval: undefined,
  })
  const {
    data: relaxationFiles,
    isLoading: isRelaxationListLoading,
    isError: isRelaxationListError,
    refetch: refetchRelaxationFiles,
  } = useHarmonyFileListQuery(HarmonyDirectory.Relaxation, activeDevice)
  const {
    data: alarmFiles,
    isLoading: isAlarmListLoading,
    isError: isAlarmListError,
    refetch: refetchAlarmFiles,
  } = useHarmonyFileListQuery(HarmonyDirectory.Alarm, activeDevice)

  const isLoading =
    isConfigLoading || isRelaxationListLoading || isAlarmListLoading

  const isError = isConfigError || isRelaxationListError || isAlarmListError

  const data = useMemo<HarmonyManageFilesData>(() => {
    if (
      !activeDevice ||
      !config ||
      !relaxationFiles ||
      !alarmFiles ||
      isError
    ) {
      return mapHarmonyToManageFiles()
    }

    return mapHarmonyToManageFiles({
      config,
      alarmFiles,
      relaxationFiles,
    })
  }, [activeDevice, config, relaxationFiles, alarmFiles, isError])

  const refresh = useCallback(async () => {
    await Promise.all([
      refetchConfig(),
      refetchRelaxationFiles(),
      refetchAlarmFiles(),
    ])
  }, [refetchConfig, refetchRelaxationFiles, refetchAlarmFiles])

  return {
    ...data,
    isLoading,
    isError,
    refetch: refresh,
  }
}
