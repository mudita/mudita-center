import { object, text, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react"
import * as React from "react"
import Loader from "Renderer/components/loader/loader.component"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
`

const HotLoader = styled(Loader)`
  color: hotpink;
`

storiesOf("Components|Loader ", module)
  .addDecorator(withKnobs)
  .add("Loader", () => {
    const size = object("Loader Size Data", {
      height: 40,
      width: 40,
    })
    return (
      <Container>
        <HotLoader size={size} />
      </Container>
    )
  })
