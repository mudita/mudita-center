import { storiesOf } from "@storybook/react"
import React from "react"
import Network from "Renderer/components/rest/overview/network/network.component"
import getFakeAdapters from "App/tests/get-fake-adapters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { action } from "@storybook/addon-actions"

storiesOf("Overview/Network", module).add("Basic", () => {
  return (
    <div style={{ margin: "2rem", maxWidth: "59rem" }}>
      <Text displayStyle={TextDisplayStyle.SmallText}>No SIM card</Text>
      <br />
      <Network />
      <br />
      <br />
      <Text displayStyle={TextDisplayStyle.SmallText}>
        One SIM card (active)
      </Text>
      <br />
      <Network
        simCards={getFakeAdapters()
          .pureNetwork.getSimCards()
          .slice(0, 1)}
      />
      <br />
      <br />
      <Text displayStyle={TextDisplayStyle.SmallText}>
        One SIM card (inactive)
      </Text>
      <br />
      <Network
        simCards={getFakeAdapters()
          .pureNetwork.getSimCards()
          .slice(1, 2)}
        onSimChange={action("SIM changed")}
      />
      <br />
      <br />
      <Text displayStyle={TextDisplayStyle.SmallText}>Two SIM cards</Text>
      <br />
      <Network
        simCards={getFakeAdapters().pureNetwork.getSimCards()}
        onSimChange={action("SIM changed")}
      />
    </div>
  )
})
