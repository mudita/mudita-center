/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import {
  Harmony,
  HarmonyGetGroupQuotationResponse,
  HarmonyGetIntervalQuotationResponse,
  HarmonyQuotationSettingsType,
} from "devices/harmony/models"
import {
  QuotationSettings,
  QuotationSettingsGroup,
} from "devices/common/models"

import { getHarmonyQuotationSettings } from "../api/get-harmony-quotation-settings"
import { harmonyQueryKeys } from "./harmony-query-keys"

const queryFn = async (device?: Harmony): Promise<QuotationSettings> => {
  if (!device) {
    throw new Error("No device provided for useHarmonyQuotationSettingsQuery")
  }
  const interval = await getHarmonyQuotationSettings(device, {
    settings: HarmonyQuotationSettingsType.Interval,
  })
  const group = await getHarmonyQuotationSettings(device, {
    settings: HarmonyQuotationSettingsType.Group,
  })

  if (!interval.ok || !group.ok) {
    throw new Error("Failed to fetch quotation settings")
  }
  return {
    interval: (interval.body as HarmonyGetIntervalQuotationResponse).interval,
    group: (group.body as HarmonyGetGroupQuotationResponse)
      .group as QuotationSettingsGroup,
  }
}

export const useHarmonyQuotationSettingsQuery = (device?: Harmony) => {
  return useQuery({
    queryKey: useHarmonyQuotationSettingsQuery.queryKey(device?.path),
    enabled: !!device,
    queryFn: () => queryFn(device),
  })
}
useHarmonyQuotationSettingsQuery.queryKey = harmonyQueryKeys.settings
useHarmonyQuotationSettingsQuery.queryFn = queryFn
