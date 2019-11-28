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

storiesOf("Components|Loader ", module)
  .addDecorator(withKnobs)
  .add("Checked", () => {
    const size = object("Loader Size Data", {
      height: 40,
      width: 40,
    })
    const loaderColor = text("Loader color", "pink")
    return (
      <Container>
        <Loader size={size} loaderColor={loaderColor} />
      </Container>
    )
  })
