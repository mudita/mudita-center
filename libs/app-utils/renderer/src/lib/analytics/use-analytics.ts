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

let cachedPrivacyPolicyAccepted: boolean | undefined

async function getPrivacyPolicyAccepted(): Promise<boolean> {
  if (cachedPrivacyPolicyAccepted === undefined) {
    cachedPrivacyPolicyAccepted = await AppSettings.get(
      "user.privacyPolicyAccepted"
    )
  }
  return cachedPrivacyPolicyAccepted
}

export const useAnalyticsValidation = () => {
  return useCallback(async (): Promise<boolean> => {
    return await getPrivacyPolicyAccepted()
  }, [])
}

export const useTrack = () => {
  const { mutate } = useMutation({
    mutationKey: analyticsMutationKeys.track,
    mutationFn: track,
  })

  const validate = useAnalyticsValidation()

  return useCallback(
    async (event: AnalyticsEvent) => {
      const validated = await validate()

      if (!validated) {
        return
      }

      return mutate({ ...defaultMetadata, ...event })
    },
    [mutate, validate]
  )
}
