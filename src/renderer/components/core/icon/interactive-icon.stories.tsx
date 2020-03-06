import { storiesOf } from "@storybook/react"
import * as React from "react"
import InteractiveIcon, {
  InteractiveIconType,
} from "Renderer/components/core/icon/interactive-icon.component"
import styled from "styled-components"

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
        iconState={26}
        interactiveIconType={InteractiveIconType.Range}
      />
    </Container>
  )
})
