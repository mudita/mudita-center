/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { formatMessage } from "app-localize/utils"
import { useQueryClient } from "@tanstack/react-query"
import { DashboardHeaderTitle } from "app-routing/feature"
import { Harmony } from "devices/harmony/models"
import {
  Quotation,
  QuotationSettings,
  QuotationSettingsGroup,
} from "devices/common/models"
import { AppResultFactory } from "app-utils/models"
import { delay } from "app-utils/common"
import { Quotations } from "devices/common/ui"
import { useActiveDeviceQuery } from "devices/common/feature"
import {
  useHarmonyCreateQuotationMutation,
  useHarmonyDeleteQuotationMutation,
  useHarmonyQuotationListQuery,
  useHarmonyQuotationSettingsQuery,
} from "devices/harmony/feature"
import { harmonyQuotationsMessages } from "./harmony-quotations.messages"

export const HarmonyQuotationsScreen: FunctionComponent = () => {
  const queryClient = useQueryClient()

  const { data: activeDevice } = useActiveDeviceQuery<Harmony>()

  const { data: quotations = [], isLoading: isQuotationsLoading } =
    useHarmonyQuotationListQuery(activeDevice)

  const {
    data: settings = {
      interval: "AtMidnight",
      group: QuotationSettingsGroup.Predefined,
    } as QuotationSettings,
    isLoading: isSettingsLoading,
  } = useHarmonyQuotationSettingsQuery(activeDevice)

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
        isLoading={isQuotationsLoading || isSettingsLoading}
        quotations={quotations}
        createQuotation={createQuotation}
        deleteQuotation={deleteQuotation}
        messages={harmonyQuotationsMessages}
        onDeleteSuccess={handleOnDeleteSuccess}
        settings={settings}
        updateSettings={async () => {
          await delay(1000)
          return Promise.resolve(AppResultFactory.success(undefined))
          // return Promise.resolve(AppResultFactory.failed(new AppError("Not implemented")))
        }}
      />
    </>
  )
}
