import { storiesOf } from "@storybook/react"
import * as React from "react"
import Loader from "Renderer/components/loader/loader.component"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50rem;
  width: 100%;
`

const HotLoader = styled(Loader)`
  color: hotpink;
`

storiesOf("Components|Loader ", module)
  .add("Default", () => {
    return (
      <Container>
        <Loader />
      </Container>
    )
  })
  .add("Custom", () => {
    return (
      <Container>
        <HotLoader />
      </Container>
    )
  })
