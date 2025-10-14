/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { formatMessage } from "app-localize/utils"
import { useQueryClient } from "@tanstack/react-query"
import { DashboardHeaderTitle } from "app-routing/feature"
import { Harmony } from "devices/harmony/models"
import { AppResultFactory } from "app-utils/models"
import { delay } from "app-utils/common"
import { Quotation, Quotations, Source } from "devices/common/ui"
import { useActiveDeviceQuery } from "devices/common/feature"
import {
  useHarmonyCreateQuotationMutation,
  useHarmonyDeleteQuotationMutation,
  useHarmonyQuotationListQuery,
} from "devices/harmony/feature"
import { harmonyQuotationsMessages } from "./harmony-quotations.messages"

export const HarmonyQuotationsScreen: FunctionComponent = () => {
  const queryClient = useQueryClient()

  const { data: activeDevice } = useActiveDeviceQuery<Harmony>()

  const { data: quotations = [], isLoading } =
    useHarmonyQuotationListQuery(activeDevice)

  const { mutateAsync: createQuotation } =
    useHarmonyCreateQuotationMutation(activeDevice)
  const { mutateAsync: deleteQuotation } =
    useHarmonyDeleteQuotationMutation(activeDevice)

  const handleOnDeleteSuccess = async (items: { id: string }[]) => {
    queryClient.setQueryData<Quotation[]>(
      useHarmonyQuotationListQuery.queryKey(activeDevice?.path),
      (old = []) =>
        old.filter(
          (quotation) => !items.find((item) => item.id === quotation.id)
        )
    )
  }

  return (
    <>
      <DashboardHeaderTitle
        title={formatMessage(harmonyQuotationsMessages.pageTitle)}
      />
      <Quotations
        isLoading={isLoading}
        quotations={quotations}
        createQuotation={createQuotation}
        deleteQuotation={deleteQuotation}
        messages={harmonyQuotationsMessages}
        onDeleteSuccess={handleOnDeleteSuccess}
        settings={{
          interval: "AtMidnight",
          group: Source.Predefined,
        }}
        updateSettings={async () => {
          await delay(1000)
          return Promise.resolve(AppResultFactory.success(undefined))
          // return Promise.resolve(AppResultFactory.failed(new AppError("Not implemented")))
        }}
      />
    </>
  )
}
