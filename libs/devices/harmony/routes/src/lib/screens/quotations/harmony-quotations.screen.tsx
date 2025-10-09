/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, formatMessage } from "app-localize/utils"
import { useQueryClient } from "@tanstack/react-query"
import { DashboardHeaderTitle } from "app-routing/feature"
import { Quotation, Quotations } from "devices/common/ui"
import { useActiveDeviceQuery } from "devices/common/feature"
import {
  useHarmonyCreateQuotationMutation,
  useHarmonyDeleteQuotationMutation,
  useHarmonyQuotationListQuery,
} from "devices/harmony/feature"
import { Harmony } from "devices/harmony/models"
import { harmonyQuotationsMessages } from "./harmony-quotations.messages"

const messages = defineMessages({
  pageTitle: {
    id: "page.quotations.title",
  },
})

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
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      <Quotations
        isLoading={isLoading}
        quotations={quotations}
        createQuotation={createQuotation}
        deleteQuotation={deleteQuotation}
        messages={harmonyQuotationsMessages}
        onDeleteSuccess={handleOnDeleteSuccess}
      />
    </>
  )
}
