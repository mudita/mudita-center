/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import { MemoryRouter } from "react-router"
import styled from "styled-components"
import { HeaderButton } from "Renderer/wrappers/layout-desktop-wrapper"
import Header from "Renderer/components/rest/header/header.component"
import { intl } from "Renderer/utils/intl"
import { IconType } from "Renderer/components/core/icon/icon-type"
import Tabs from "Renderer/components/rest/header/tabs.component"

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 70.4rem;
`

storiesOf("Components|Core/Header", module)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={["/phone"]}>{story()}</MemoryRouter>
  ))
  .add("Without button", () => {
    return (
      <Container>
        <Header middleComponent={<Tabs currentLocation={"/phone"} />} />
      </Container>
    )
  })

storiesOf("Components|Core/Header/With button", module)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={["/news"]}>{story()}</MemoryRouter>
  ))
  .add("News", () => {
    return (
      <Container>
        <Header
          middleComponent={<Tabs currentLocation={"/news"} />}
          button={
            <HeaderButton
              Icon={IconType.ExternalLink}
              label={intl.formatMessage({
                id: "module.news.moreNewsButtonLabel",
              })}
              href={"https://www.mudita.com/"}
              target="_blank"
            />
          }
        />
      </Container>
    )
  })
