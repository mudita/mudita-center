import { storiesOf } from "@storybook/react"
import * as React from "react"
import InteractiveIcon from "Renderer/components/core/icon/interactive-icon.component"
import styled from "styled-components"
import { InteractiveIconType } from "Renderer/components/core/icon/interactive-icon.config"
import { select, withKnobs } from "@storybook/addon-knobs"

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Interactive Icon", module)
  .addDecorator(withKnobs)
  .add("Range", () => {
    const label = "Interactive Range"
    const options = {
      noRange: 0,
      veryLowRange: 1,
      lowRange: 10,
      mediumRange: 40,
      highRange: 60,
      veryHighRange: 90,
    }

    const defaultValue = 0

    const value = select(label, options, defaultValue)
    return (
      <Container>
        <InteractiveIcon
          iconState={value}
          interactiveIconType={InteractiveIconType.Range}
        />
      </Container>
    )
  })
