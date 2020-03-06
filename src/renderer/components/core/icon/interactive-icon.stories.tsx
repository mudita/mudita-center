import { storiesOf } from "@storybook/react"
import * as React from "react"
import InteractiveIcon from "Renderer/components/core/icon/interactive-icon.component"
import styled from "styled-components"
import { InteractiveIconType } from "Renderer/components/core/icon/interactive-icon.config"

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Interactive Icon", module).add("Range", () => {
  return (
    <Container>
      <InteractiveIcon
        iconState={1}
        interactiveIconType={InteractiveIconType.Range}
      />
    </Container>
  )
})
