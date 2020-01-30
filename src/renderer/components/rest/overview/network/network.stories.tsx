import { storiesOf } from "@storybook/react"
import React from "react"
import Network from "Renderer/components/rest/overview/network/network.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import styled from "styled-components"

const StyledNetwork = styled(Network)`
  margin: 2rem;
  max-width: 59rem;
`

storiesOf("Overview|Network", module)
  .add("No sim card", () => {
    return <StyledNetwork />
  })
  .add("One SIM card (active)", () => {
    return (
      <StyledNetwork
        simCards={getFakeAdapters()
          .pureNetwork.getSimCards()
          .slice(0, 1)}
      />
    )
  })
  .add("One SIM card (inactive)", () => {
    return (
      <StyledNetwork
        simCards={getFakeAdapters()
          .pureNetwork.getSimCards()
          .slice(1, 2)}
      />
    )
  })
  .add("Two SIM cards", () => {
    return (
      <StyledNetwork simCards={getFakeAdapters().pureNetwork.getSimCards()} />
    )
  })
