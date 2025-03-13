/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DashboardHeaderTitle } from "app-routing/feature"
import { Outlet } from "react-router"
import { defineMessages, formatMessage } from "app-localize/feature"

export const messages = defineMessages({
  title: {
    id: "page.help.title",
  },
})

export const HelpLayout = () => {
  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.title)} />
      <Outlet />
    </>
  )
}
