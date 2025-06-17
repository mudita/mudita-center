/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { AnalyticsEvent } from "app-utils/models"
import { analyticsMutationKeys } from "./analytics-mutation-keys"
import { track } from "./analytics"

export const useTrack = () => {
  const { mutate } = useMutation({
    mutationKey: analyticsMutationKeys.track,
    mutationFn: track,
  })

  return useCallback(
    async (event: AnalyticsEvent) => {
      return mutate(event)
    },
    [mutate]
  )
}
