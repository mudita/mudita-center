/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDeviceConfigQuery } from "devices/common/feature"
import { Harmony } from "devices/harmony/models"
import { useMemo } from "react"

// Minimum space in bytes required to save a quotation
const DEFAULT_MINIMUM_AVAILABLE_SPACE_BYTES = 500

export const useSpaceAvailable = (
  activeDevice?: Harmony,
  minimumAvailableSpace = DEFAULT_MINIMUM_AVAILABLE_SPACE_BYTES
) => {
  const {
    data: config,
    isLoading,
    isError,
  } = useDeviceConfigQuery(activeDevice, {
    refetchIntervalInBackground: false,
    refetchInterval: undefined,
  })

  const data = useMemo(() => {
    if (isLoading || isError || !config) {
      return undefined
    }

    const deviceSpaceTotal = config.deviceSpaceTotal ?? 0
    const systemReservedSpace = config.systemReservedSpace ?? 0
    const usedUserSpace = config.usedUserSpace ?? 0
    const usedSpaceBytes = systemReservedSpace + usedUserSpace
    const freeSpaceBytes = deviceSpaceTotal - usedSpaceBytes

    return freeSpaceBytes >= minimumAvailableSpace
  }, [config, isLoading, isError, minimumAvailableSpace])

  return { isLoading, data }
}
