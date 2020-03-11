import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import { select, withKnobs } from "@storybook/addon-knobs"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"

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
      lowRange: 21,
      mediumRange: 41,
      highRange: 61,
      veryHighRange: 90,
    }

    const defaultValue = 0

    const value = select(label, options, defaultValue)
    return (
      <Container>
        <RangeIcon strenght={value} />
      </Container>
    )
  })
