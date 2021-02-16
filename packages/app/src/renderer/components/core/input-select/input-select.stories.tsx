/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { css } from "styled-components"
import InputSelect from "Renderer/components/core/input-select/input-select.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import {
  AdvancedItem,
  advancedItems,
  basicItems,
  isItemMatching,
  renderCustomListItem,
  getItemName,
} from "Renderer/components/core/list/list.stories"
import { isItemValueMatching } from "Renderer/components/core/utils/is-item-matching"

const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`

storiesOf("Components|Core/InputSelect", module)
  .add("Default", () => (
    <>
      <StoryContainer title="Themes" customStyle={storyContainerStyles}>
        <Story title="Default">
          <InputSelect items={basicItems} label="Fruit type" />
        </Story>
        <Story title="Outlined">
          <InputSelect items={basicItems} outlined label="Fruit type" />
        </Story>
        <Story title="Condensed (default)">
          <InputSelect
            items={basicItems}
            condensed
            label="Fruit type"
            selectedItem={basicItems[1]}
          />
        </Story>
        <Story title="Condensed (outlined)">
          <InputSelect
            items={basicItems}
            condensed
            outlined
            label="Fruit type"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers" customStyle={storyContainerStyles}>
        <Story title="Value (default)">
          <InputSelect
            items={basicItems}
            selectedItem={basicItems[1]}
            label="Fruit type"
          />
        </Story>
        <Story title="Value (outlined)">
          <InputSelect
            items={basicItems}
            label="Fruit type"
            selectedItem={basicItems[1]}
            outlined
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Customizations" customStyle={storyContainerStyles}>
        <Story title="Empty option">
          <InputSelect
            items={basicItems}
            label="Fruit type"
            emptyItemValue="No fruit"
          />
        </Story>
        <Story title="List items">
          <InputSelect
            label="Fruit type"
            emptyItemValue="No fruit"
            items={advancedItems}
            renderItemValue={getItemName}
            renderListItem={renderCustomListItem}
            listStyles={css`
              max-height: 19rem;
            `}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Searchable" customStyle={storyContainerStyles}>
        <Story title="Basic list">
          <InputSelect
            searchable
            isItemMatching={isItemValueMatching}
            items={basicItems}
            label="Fruit type"
            emptyItemValue="No fruit"
          />
        </Story>
        <Story title="Custom rendered list">
          <InputSelect
            searchable
            label="Fruit type"
            emptyItemValue="No fruit"
            items={advancedItems}
            renderItemValue={getItemName}
            renderListItem={renderCustomListItem}
            isItemMatching={isItemMatching}
            listStyles={css`
              max-height: 19rem;
            `}
          />
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Interactive", () => {
    const [selectedFruit, setSelectedFruit] = useState("")
    const [
      selectedAdvancedFruit,
      setSelectedAdvancedFruit,
    ] = useState<AdvancedItem>()

    const handleSelect = (fruit: string) => {
      action("Select")(fruit)
      setSelectedFruit(fruit)
    }

    const handleAdvancedSelect = (fruitItem: AdvancedItem) => {
      action("Select")(fruitItem)
      setSelectedAdvancedFruit(fruitItem)
    }

    return (
      <>
        <StoryContainer title="Basic" customStyle={storyContainerStyles}>
          <Story title="Simple data">
            <InputSelect
              items={basicItems}
              label="Fruit type"
              emptyItemValue="No fruit"
              onSelect={handleSelect}
              selectedItem={selectedFruit}
            />
          </Story>
          <Story title="Customized data">
            <InputSelect
              label="Fruit type"
              emptyItemValue="No fruit"
              items={advancedItems}
              renderItemValue={getItemName}
              renderListItem={renderCustomListItem}
              onSelect={handleAdvancedSelect}
              selectedItem={selectedAdvancedFruit}
              listStyles={css`
                max-height: 33rem;
              `}
            />
          </Story>
        </StoryContainer>
        <StoryContainer title="Searchable" customStyle={storyContainerStyles}>
          <Story title="Simple data">
            <InputSelect
              items={basicItems}
              label="Fruit type"
              emptyItemValue="No fruit"
              onSelect={handleSelect}
              selectedItem={selectedFruit}
              isItemMatching={isItemValueMatching}
              searchable
            />
          </Story>
          <Story title="Customized data">
            <InputSelect
              searchable
              label="Fruit type"
              emptyItemValue="No fruit"
              items={advancedItems}
              renderItemValue={getItemName}
              renderListItem={renderCustomListItem}
              isItemMatching={isItemMatching}
              onSelect={handleAdvancedSelect}
              selectedItem={selectedAdvancedFruit}
              listStyles={css`
                max-height: 19rem;
              `}
            />
          </Story>
        </StoryContainer>
        <StoryContainer title="Disabled" customStyle={storyContainerStyles}>
          <Story title="Simple data">
            <InputSelect
              items={basicItems}
              disabledItems={[basicItems[1], basicItems[2]]}
              label="Fruit type"
              emptyItemValue="No fruit"
              onSelect={handleSelect}
              selectedItem={selectedFruit}
              isItemMatching={isItemValueMatching}
              searchable
            />
          </Story>
          <Story title="Customized data">
            <InputSelect
              searchable
              label="Fruit type"
              emptyItemValue="No fruit"
              items={advancedItems}
              disabledItems={[advancedItems[1], advancedItems[2]]}
              renderItemValue={getItemName}
              renderListItem={renderCustomListItem}
              isItemMatching={isItemMatching}
              onSelect={handleAdvancedSelect}
              selectedItem={selectedAdvancedFruit}
              listStyles={css`
                max-height: 19rem;
              `}
            />
          </Story>
        </StoryContainer>
      </>
    )
  })
