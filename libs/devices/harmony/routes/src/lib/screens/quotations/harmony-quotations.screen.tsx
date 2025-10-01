/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, formatMessage } from "app-localize/utils"
import { DashboardHeaderTitle } from "app-routing/feature"

const messages = defineMessages({
  pageTitle: {
    id: "page.quotations.title",
  },
})

export const HarmonyQuotationsScreen: FunctionComponent = () => {
  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      <p>Quotations</p>
    </>
  )
}
