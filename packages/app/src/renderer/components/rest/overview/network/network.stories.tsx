import { storiesOf } from "@storybook/react"
import React, { useEffect, useState } from "react"
import Network from "Renderer/components/rest/overview/network/network.component"
import { action } from "@storybook/addon-actions"
import { css } from "styled-components"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import getFakeAdapters from "App/tests/get-fake-adapters"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

const storyStyle = css`
  > * {
    width: 63rem;
  }
`

storiesOf("Views|Overview/Network ", module).add("Network", () => {
  const [fakeSimCards, setFakeSimCards] = useState<SimCard[]>([])
  useEffect(() => {
    const fetch = async () => {
      const { data = [] } = await getFakeAdapters().pureNetwork.getSimCards()
      setFakeSimCards(data)
    }
    fetch()
  }, [])

  return (
    <StoryContainer column>
      <Story title="No SIM card" customStyle={storyStyle}>
        <Network />
      </Story>
      <Story title="One SIM card (active)" customStyle={storyStyle}>
        <Network simCards={fakeSimCards.slice(0, 1)} />
      </Story>
      <Story title="One SIM card (inactive)" customStyle={storyStyle}>
        <Network
          simCards={fakeSimCards.slice(1, 2)}
          onSimChange={action("SIM changed")}
        />
      </Story>
      <Story title="Two SIM cards" customStyle={storyStyle}>
        <Network simCards={fakeSimCards} onSimChange={action("SIM changed")} />
      </Story>
    </StoryContainer>
  )
})
