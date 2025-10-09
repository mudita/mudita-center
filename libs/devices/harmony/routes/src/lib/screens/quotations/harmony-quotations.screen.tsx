/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, formatMessage } from "app-localize/utils"
import { DashboardHeaderTitle } from "app-routing/feature"
import { Quotations } from "devices/common/ui"
import { useActiveDeviceQuery } from "devices/common/feature"
import {
  useHarmonyCreateQuotationMutation,
  useHarmonyQuotationListQuery,
} from "devices/harmony/feature"
import { Harmony } from "devices/harmony/models"

const messages = defineMessages({
  pageTitle: {
    id: "page.quotations.title",
  },
})

export const HarmonyQuotationsScreen: FunctionComponent = () => {
  const { data: activeDevice } = useActiveDeviceQuery<Harmony>()

  const { data: quotations = [], isLoading } =
    useHarmonyQuotationListQuery(activeDevice)

  const { mutateAsync: createQuotation } =
    useHarmonyCreateQuotationMutation(activeDevice)

  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      <Quotations
        isLoading={isLoading}
        quotations={quotations}
        createQuotation={createQuotation}
      />
    </>
  )
}
