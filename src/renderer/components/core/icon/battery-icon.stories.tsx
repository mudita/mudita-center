import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Battery Icon", module)
  .add("No battery", () => {
    return (
      <Container>
        <BatteryIcon batteryLevel={0} />
      </Container>
    )
  })
  .add("One bar", () => {
    return (
      <Container>
        <BatteryIcon batteryLevel={0.1} />
      </Container>
    )
  })
  .add("Two bars", () => {
    return (
      <Container>
        <BatteryIcon batteryLevel={0.3} />
      </Container>
    )
  })
  .add("Three bars", () => {
    return (
      <Container>
        <BatteryIcon batteryLevel={0.5} />
      </Container>
    )
  })
  .add("Four bars", () => {
    return (
      <Container>
        <BatteryIcon batteryLevel={0.7} />
      </Container>
    )
  })
  .add("Five bars", () => {
    return (
      <Container>
        <BatteryIcon batteryLevel={0.9} />
      </Container>
    )
  })
  .add("Charging", () => {
    return (
      <Container>
        <BatteryIcon charging batteryLevel={0.5} />
      </Container>
    )
  })
