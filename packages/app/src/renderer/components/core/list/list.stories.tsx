/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "../../storybook/story.component"
import { css } from "styled-components"
import {
  List,
  ListItem,
  RenderListItem,
  renderListItemSearchable,
} from "Renderer/components/core/list/list.component"
import SearchableText from "Renderer/components/core/searchable-text/searchable-text.component"

const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`

export const basicItems = [
  "apple",
  "banana",
  "orange",
  "pineapple",
  "strawberry",
  "potato",
  "tomato",
  "cabbage",
]

export const advancedItems = [
  { name: "Apple", value: "apple", type: "fruit", icon: "🍏" },
  { name: "Banana", value: "banana", type: "fruit", icon: "🍌" },
  { name: "Orange", value: "orange", type: "fruit", icon: "🍊" },
  { name: "Pineapple", value: "pineapple", type: "fruit", icon: "🍍" },
  { name: "Strawberry", value: "strawberry", type: "fruit", icon: "🍓" },
  { name: "Potato", value: "potato", type: "vegetable", icon: "🥔" },
  { name: "Tomato", value: "tomato", type: "vegetable", icon: "🍅" },
  { name: "Cabbage", value: "cabbage", type: "vegetable", icon: "🥬" },
]

export type AdvancedItem = typeof advancedItems[number]

export const getItemName = (item: AdvancedItem) => item.name
export const isItemMatching = (item: AdvancedItem, search: string) => {
  return item.name.toLowerCase().includes(search.toLowerCase())
}

export const renderCustomListItem: RenderListItem<AdvancedItem, any> = ({
  item: { name, type, icon },
  searchString,
  props,
}) => (
  <ListItem {...props}>
    <strong>
      {icon} <SearchableText text={name} search={searchString} />
    </strong>
    <br />
    <em>{type}</em>
  </ListItem>
)

const props = undefined
const searchString = ""

storiesOf("Components|Core/List", module).add("Default", () => (
  <>
    <StoryContainer title="Default" customStyle={storyContainerStyles}>
      <Story title="Default">
        <List expanded>
          {basicItems.map((item) =>
            renderListItemSearchable({
              item,
              props,
              searchString,
            })
          )}
        </List>
      </Story>
    </StoryContainer>
    <StoryContainer title="Customizations" customStyle={storyContainerStyles}>
      <Story title="Default">
        <List expanded>
          {advancedItems.map((item) =>
            renderCustomListItem({
              item,
              props,
              searchString,
            })
          )}
        </List>
      </Story>
    </StoryContainer>
  </>
))
