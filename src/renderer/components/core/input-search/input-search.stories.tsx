import React from "react"
import { storiesOf } from "@storybook/react"
import { css } from "styled-components"
import Story from "../../storybook/story.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import InputSearch from "Renderer/components/core/input-search/input-search.component"
import {
  advancedItems,
  basicItems,
  isItemMatching,
  renderCustomListItem,
  getItemName,
} from "Renderer/components/core/list/list.stories"

const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`

storiesOf("Components|Core/InputSearch", module).add("Default", () => (
  <>
    <StoryContainer title="Themes" customStyle={storyContainerStyles}>
      <Story title="Default">
        <InputSearch items={basicItems} label="Fruit type" />
      </Story>
      <Story title="Outlined">
        <InputSearch items={basicItems} outlined label="Fruit type" />
      </Story>
      <Story title="Condensed (default)">
        <InputSearch items={basicItems} condensed label="Fruit type" />
      </Story>
      <Story title="Condensed (outlined)">
        <InputSearch items={basicItems} condensed outlined label="Fruit type" />
      </Story>
    </StoryContainer>
    <StoryContainer title="Modifiers" customStyle={storyContainerStyles}>
      <Story title="Value (default)">
        <InputSearch
          items={basicItems}
          label="Fruit type"
          selectedItem={basicItems[1]}
        />
      </Story>
      <Story title="Value (outlined)">
        <InputSearch
          items={basicItems}
          label="Fruit type"
          selectedItem={basicItems[1]}
          outlined
        />
      </Story>
      <Story title="Part of Value (outlined)">
        <InputSearch
          items={basicItems}
          label="Fruit type"
          selectedItem={basicItems[1]}
          searchItemValue={basicItems[1].substr(0, 3)}
          outlined
        />
      </Story>
    </StoryContainer>
    <StoryContainer title="Customizations" customStyle={storyContainerStyles}>
      <Story title="List items">
        <InputSearch
          label="Fruit type"
          emptyItemValue="No fruit"
          items={advancedItems}
          renderItemValue={getItemName}
          renderListItem={renderCustomListItem}
          isItemMatching={isItemMatching}
        />
      </Story>
      <Story title="List items & Value">
        <InputSearch
          label="Fruit type"
          emptyItemValue="No fruit"
          items={advancedItems}
          selectedItem={advancedItems[1]}
          renderItemValue={getItemName}
          renderListItem={renderCustomListItem}
          isItemMatching={isItemMatching}
        />
      </Story>
      <Story title="List items & Part of Value">
        <InputSearch
          label="Fruit type"
          emptyItemValue="No fruit"
          items={advancedItems}
          searchItemValue={advancedItems[1].name.substr(0, 3)}
          selectedItem={advancedItems[1]}
          renderItemValue={getItemName}
          renderListItem={renderCustomListItem}
          isItemMatching={isItemMatching}
        />
      </Story>
    </StoryContainer>
  </>
))
