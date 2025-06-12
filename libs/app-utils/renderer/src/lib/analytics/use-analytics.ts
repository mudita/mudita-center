/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { AppSettings } from "app-settings/renderer"
import { AnalyticsEvent } from "app-utils/models"
import { analyticsMutationKeys } from "./analytics-mutation-keys"
import { track } from "./analytics-api"

export const useTrack = () => {
  const { mutate } = useMutation({
    mutationKey: analyticsMutationKeys.track,
    mutationFn: track,
  })

  return useCallback(
    async (event: AnalyticsEvent) => {
      const privacyPolicyAccepted = await AppSettings.get(
        "user.privacyPolicyAccepted"
      )

      if (privacyPolicyAccepted) {
        return mutate(event)
      }
    },
    [mutate]
  )
}
