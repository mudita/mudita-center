import { storiesOf } from "@storybook/react"
import React, { useEffect, useState } from "react"
import Network from "Renderer/components/rest/overview/network/network.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { action } from "@storybook/addon-actions"
import styled, { css } from "styled-components"
import SimInfo from "Common/interfaces/sim-info.interface"
import getFakeAdapters from "App/tests/get-fake-adapters"
import StoryContainer from "Renderer/components/storybook/story-container.component"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`
const storyContainerStyle = css`
  display: block;
  max-width: 63rem;
`

storiesOf("Views|Overview/Network ", module).add("Network", () => {
  const [fakeSimCards, setFakeSimCards] = useState<SimInfo[]>([])
  useEffect(() => {
    const fetch = async () => {
      const { data = [] } = await getFakeAdapters().pureNetwork.getSimCards()
      setFakeSimCards(data)
    }
    fetch()
  },[])

  return (
    <StoryContainer customStyle={storyContainerStyle}>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>No SIM card</Text>
        <Network />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          One SIM card (active)
        </Text>
        <Network simCards={fakeSimCards.slice(0, 1)} />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>
          One SIM card (inactive)
        </Text>
        <Network
          simCards={fakeSimCards.slice(1, 2)}
          onSimChange={action("SIM changed")}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>Two SIM cards</Text>
        <Network simCards={fakeSimCards} onSimChange={action("SIM changed")} />
      </Part>
    </StoryContainer>
  )
})
