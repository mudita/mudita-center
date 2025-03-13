/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DashboardHeaderPortal,
  DashboardHeaderTitle,
} from "app-routing/feature"
import { Outlet } from "react-router"
import { defineMessages, formatMessage } from "app-localize/feature"

export const messages = defineMessages({
  title: {
    id: "page.news.title",
  },
  headerTitle: {
    id: "page.news.headerTitle",
  },
  buttonText: {
    id: "page.news.headerButton.text",
  },
})

export const NewsLayout = () => {
  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.headerTitle)} />
      <DashboardHeaderPortal placement={"right"}>
        <button>{formatMessage(messages.buttonText)}</button>
      </DashboardHeaderPortal>
      <Outlet />
    </>
  )
}
