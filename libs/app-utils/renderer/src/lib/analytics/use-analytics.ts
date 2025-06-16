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
import { analyticsConfig } from "./analytics-config"

const defaultMetadata: Partial<AnalyticsEvent> = {
  rec: 1,
  apiv: 1,
  idsite: analyticsConfig.siteId,
  ua: window.navigator.userAgent,
  lang: window.navigator.language,
  res: `${window.screen.width * window.devicePixelRatio}x${
    window.screen.height * window.devicePixelRatio
  }`,
}

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
    if (!analyticsConfig.enabled) {
      console.warn("Analytics tracking is disabled")
      return false
    }

    if (isNaN(analyticsConfig.siteId)) {
      console.warn("Analytics site ID is not set")
      return false
    }
    if (analyticsConfig.apiUrl === "") {
      console.warn("Analytics API URL is not set")
      return false
    }
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
