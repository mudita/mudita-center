/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { AnalyticsEvent } from "app-utils/models"
import { analyticsMutationKeys } from "./analytics-mutation-keys"
import { track, uniqueTrack } from "./analytics"

// TODO: https://appnroll.atlassian.net/browse/CP-3939 - migrate ALL events from the old project

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

export const useUniqueTrack = () => {
  const { mutate } = useMutation({
    mutationKey: analyticsMutationKeys.uniqueTrack,
    mutationFn: uniqueTrack,
  })

  return useCallback(
    (event: AnalyticsEvent) => {
      mutate(event)
    },
    [mutate]
  )
}
