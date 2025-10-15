/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useMutation } from "@tanstack/react-query"
import { AppError } from "app-utils/models"
import { Harmony, HarmonyDeleteQuotationRequest } from "devices/harmony/models"
import { deleteQuotation } from "../api/delete-quotation"

const mutationFn = async (
  quotation: HarmonyDeleteQuotationRequest,
  device?: Harmony
): Promise<void> => {
  if (!device) {
    throw new AppError("Device is not defined")
  }

  const response = await deleteQuotation(quotation, device)

  if (!response.ok) {
    throw new AppError("Failed to delete quotation")
  }
}

export const useHarmonyDeleteQuotationMutation = (device?: Harmony) => {
  return useMutation({
    mutationFn: async (id: string) =>
      mutationFn({ quoteID: Number(id) }, device),
  })
}

useHarmonyDeleteQuotationMutation.mutationFn = mutationFn
