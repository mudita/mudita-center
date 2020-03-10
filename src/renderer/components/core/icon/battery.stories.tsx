import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import Battery from "Renderer/components/core/icon/battery.component"

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Battery Icon", module).add("One bar", () => {
  return (
    <Container>
      <Battery />
    </Container>
  )
})
