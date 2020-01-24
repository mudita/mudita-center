import { storiesOf } from "@storybook/react"
import * as React from "react"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import styled from "styled-components"

const Container = styled.div`
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CustomIcon = styled(Icon)`
  height: 3rem;
  width: 3rem;
`

storiesOf("Components|Icon", module)
  .add("Without Badge", () => {
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
  .add("Custom without badge", () => {
    return (
      <Container>
        <CustomIcon type={Type.Message} />
      </Container>
    )
  })
  .add("Custom with Badge", () => {
    return (
      <Container>
        <CustomIcon type={Type.Message} badge height={3} width={3} />
      </Container>
    )
  })
