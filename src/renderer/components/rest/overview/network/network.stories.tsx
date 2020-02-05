import { storiesOf } from "@storybook/react"
import React from "react"
import Network from "Renderer/components/rest/overview/network/network.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

storiesOf("Overview|Network", module).add("Network", () => {
  return (
    <div style={{ maxWidth: "59rem" }}>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>No SIM card</Text>
        <Network />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          One SIM card (active)
        </Text>
        <Network
          simCards={getFakeAdapters()
            .pureNetwork.getSimCards()
            .slice(0, 1)}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          One SIM card (inactive)
        </Text>
        <Network
          simCards={getFakeAdapters()
            .pureNetwork.getSimCards()
            .slice(1, 2)}
          onSimChange={action("SIM changed")}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Two SIM cards</Text>
        <Network
          simCards={getFakeAdapters().pureNetwork.getSimCards()}
          onSimChange={action("SIM changed")}
        />
      </Part>
    </div>
  )
})
