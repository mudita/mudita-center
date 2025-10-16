/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AppError } from "app-utils/models"
import { Harmony } from "devices/harmony/models"
import { QuotationSettings } from "devices/common/models"
import { putHarmonyQuotationSettings } from "../api/put-harmony-quotation-settings"
import { useHarmonyQuotationSettingsQuery } from "./use-harmony-quotation-settings.query"

const mutationFn = async (
  payload: QuotationSettings,
  device?: Harmony
): Promise<void> => {
  if (!device) {
    throw new AppError("Device is not defined")
  }

  const groupResponse = await putHarmonyQuotationSettings(device, {
    group: payload.group,
  })

  const intervalResponse = await putHarmonyQuotationSettings(device, {
    interval: String(payload.interval),
  })

  if (!groupResponse.ok || !intervalResponse.ok) {
    throw new AppError("Failed to update quotation settings")
  }
}

export const useHarmonyQuotationSettingsMutation = (device?: Harmony) => {
  const queryClient = useQueryClient()
  const queryKey = useHarmonyQuotationSettingsQuery.queryKey(device?.path)

  return useMutation({
    mutationFn: async (payload: QuotationSettings) =>
      mutationFn(payload, device),
    onMutate: async (newSetting) => {
      const previous = queryClient.getQueryData<QuotationSettings>(queryKey)
      queryClient.setQueryData<QuotationSettings>(queryKey, newSetting)
      return { previous }
    },
    onError: (_err, _newSetting, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous)
    },
  })
}

useHarmonyQuotationSettingsMutation.mutationFn = mutationFn
