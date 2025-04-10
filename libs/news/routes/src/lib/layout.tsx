/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DashboardHeaderPortal,
  DashboardHeaderTitle,
} from "app-routing/feature"
import { Outlet } from "react-router"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Button } from "app-theme/ui"
import styled from "styled-components"
import { NewsTestId } from "news/models"

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
  buttonLink: {
    id: "page.news.headerButton.link",
  },
})

export const NewsLayout = () => {
  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.headerTitle)} />
      <DashboardHeaderPortal placement={"right"}>
        <MoreNewsButton
          size={"large"}
          to={formatMessage(messages.buttonLink)}
          data-testid={NewsTestId.MoreNewsButton}
        >
          {formatMessage(messages.buttonText)}
        </MoreNewsButton>
      </DashboardHeaderPortal>
      <Outlet />
    </>
  )
}

const MoreNewsButton = styled(Button)`
  align-self: center;
  justify-self: end;
`
