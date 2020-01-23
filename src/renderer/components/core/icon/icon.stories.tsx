import { storiesOf } from "@storybook/react"
import * as React from "react"
import Icon, { Type } from "Renderer/components/core/icon/icon.component"
import styled from "styled-components"

const Container = styled.div`
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Icon", module)
  .add("Default", () => {
    return (
      <Container>
        <Icon type={Type.Message} />
      </Container>
    )
  })
  .add("With badge", () => {
    return (
      <Container>
        <Icon type={Type.Message} badge />
      </Container>
    )
  })
