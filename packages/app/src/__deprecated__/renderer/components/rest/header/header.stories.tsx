import * as React from "react"
import { MemoryRouter } from "react-router"
import styled from "styled-components"
import { HeaderButton } from "App/__deprecated__/renderer/wrappers/layout-desktop-wrapper"
import Header from "App/__deprecated__/renderer/components/rest/header/header.component"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Tabs from "App/__deprecated__/renderer/components/rest/header/tabs.component"

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 70.4rem;
`

export default {
  title: 'Components|Core/Header',

  decorators: [(story) => (
      <MemoryRouter initialEntries={["/phone"]}>{story()}</MemoryRouter>
    )],
};

export const WithoutButton = () => {
    return (
      <Container>
        <Header middleComponent={<Tabs currentLocation={"/phone"} />} />
      </Container>
    )
  };

WithoutButton.story = {
  name: 'Without button',
};

export default {
  title: 'Components|Core/Header/With button',

  decorators: [(story) => (
      <MemoryRouter initialEntries={["/news"]}>{story()}</MemoryRouter>
    )],
};

export const News = () => {
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
  };
