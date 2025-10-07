/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useQuery } from "@tanstack/react-query"
import { Harmony } from "devices/harmony/models"
import { fetchQuotations } from "../usecases/fetch-quotations"
import { harmonyQueryKeys } from "./harmony-query-keys"

const queryFn = async (device?: Harmony) => {
  try {
    if (!device) {
      throw new Error("No device provided for useHarmonyQuotationListQuery")
    }

    return fetchQuotations(device)
  } catch (e) {
    console.warn(e)
    return []
  }
}

export const useHarmonyQuotationListQuery = (device?: Harmony) => {
  return useQuery({
    queryKey: useHarmonyQuotationListQuery.queryKey(device?.path),
    enabled: !!device,
    queryFn: () => queryFn(device),
  })
}
useHarmonyQuotationListQuery.queryKey = harmonyQueryKeys.quotationList
useHarmonyQuotationListQuery.queryFn = queryFn
