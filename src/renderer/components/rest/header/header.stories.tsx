import { storiesOf } from "@storybook/react"
import * as React from "react"
import { MemoryRouter } from "react-router"
import styled from "styled-components"
import { HeaderTabs } from "Renderer/wrappers/layout-desktop-wrapper"
import Header from "Renderer/components/rest/header/header.component"

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 70.4rem;
`

storiesOf("Components|Header", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/phone"]}>{story()}</MemoryRouter>
  ))
  .add("Without button", () => {
    return (
      <Container>
        <Header middleComponent={<HeaderTabs currentLocation={"/phone"} />} />
      </Container>
    )
  })

storiesOf("Components|Header", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/news"]}>{story()}</MemoryRouter>
  ))
  .add("With button", () => {
    return (
      <Container>
        <Header middleComponent={<HeaderTabs currentLocation={"/news"} />} />
      </Container>
    )
  })
