/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMemo } from "react"
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
}

export const useHarmonyManageFiles = (
  activeDevice?: Harmony
): HarmonyManageFilesDataViewData => {
  const {
    data: config,
    isLoading: isConfigLoading,
    isError: isConfigError,
  } = useDeviceConfigQuery(activeDevice, {
    refetchIntervalInBackground: false,
    refetchInterval: undefined,
  })
  const {
    data: relaxationFiles,
    isLoading: isRelaxationListLoading,
    isError: isRelaxationListError,
  } = useHarmonyFileListQuery(HarmonyDirectory.Relaxation, activeDevice)
  const {
    data: alarmFiles,
    isLoading: isAlarmListLoading,
    isError: isAlarmListError,
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

  return {
    ...data,
    isLoading,
    isError,
  }
}
