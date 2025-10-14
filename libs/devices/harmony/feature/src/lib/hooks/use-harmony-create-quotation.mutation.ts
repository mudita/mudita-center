/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AppError, AppResult, AppResultFactory } from "app-utils/models"
import { delayUntil } from "app-utils/common"
import {
  Harmony,
  HarmonyPostQuotationRequest,
  HarmonyPostQuotationResponse,
} from "devices/harmony/models"
import { Quotation } from "devices/common/models"
import { createQuotation } from "../api/create-quotation"
import { useHarmonyQuotationListQuery } from "./use-harmony-quotation-list.query"

const mutationFn = async (
  quotation: HarmonyPostQuotationRequest,
  device?: Harmony
): Promise<AppResult<HarmonyPostQuotationResponse>> => {
  if (!device) {
    return AppResultFactory.failed(new AppError())
  }

  const response = await createQuotation(quotation, device)

  if (response.ok) {
    return AppResultFactory.success(response.body)
  }

  return AppResultFactory.failed(new AppError())
}

export const useHarmonyCreateQuotationMutation = (device?: Harmony) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (quotation: HarmonyPostQuotationRequest) => {
      const result = await delayUntil(mutationFn(quotation, device), 500)
      if (result.ok) {
        queryClient.setQueryData<Quotation[]>(
          useHarmonyQuotationListQuery.queryKey(device?.path),
          (old = []) => [
            ...old,
            {
              ...quotation,
              id: String(result.data.quoteID),
            },
          ]
        )
      }
      return result
    },
  })
}

useHarmonyCreateQuotationMutation.mutationFn = mutationFn
