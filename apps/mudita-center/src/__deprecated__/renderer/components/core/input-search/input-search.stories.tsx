/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { css } from "styled-components"
import InputSearch from "App/__deprecated__/renderer/components/core/input-search/input-search.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import {
  AdvancedItem,
  advancedItems,
  basicItems,
  renderCustomListItem,
  getItemName,
} from "App/__deprecated__/renderer/components/core/list/list.stories"
import { noop } from "App/__deprecated__/renderer/utils/noop"

const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`

storiesOf("Components|Core/InputSearch", module)
  .add("Default", () => (
    <>
      <StoryContainer title="Themes" customStyle={storyContainerStyles}>
        <Story title="Default">
          <InputSearch
            items={basicItems}
            label="Fruit type"
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
        <Story title="Outlined">
          <InputSearch
            items={basicItems}
            outlined
            label="Fruit type"
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
        <Story title="Condensed (default)">
          <InputSearch
            items={basicItems}
            condensed
            label="Fruit type"
            selectedItem={basicItems[1]}
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
        <Story title="Condensed (outlined)">
          <InputSearch
            items={basicItems}
            condensed
            outlined
            label="Fruit type"
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers" customStyle={storyContainerStyles}>
        <Story title="Value (default)">
          <InputSearch
            items={basicItems}
            selectedItem={basicItems[1]}
            label="Fruit type"
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
        <Story title="Value (outlined)">
          <InputSearch
            items={basicItems}
            label="Fruit type"
            selectedItem={basicItems[1]}
            outlined
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Customizations" customStyle={storyContainerStyles}>
        <Story title="Empty option">
          <InputSearch
            items={basicItems}
            label="Fruit type"
            emptyItemValue="No fruit"
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
        <Story title="List items">
          <InputSearch
            label="Fruit type"
            emptyItemValue="No fruit"
            items={advancedItems}
            renderItemValue={getItemName}
            renderListItem={renderCustomListItem}
            listStyles={css`
              max-height: 19rem;
            `}
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Searchable" customStyle={storyContainerStyles}>
        <Story title="Basic list">
          <InputSearch
            searchable
            items={basicItems}
            label="Fruit type"
            emptyItemValue="No fruit"
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
        <Story title="Custom rendered list">
          <InputSearch
            searchable
            label="Fruit type"
            emptyItemValue="No fruit"
            items={advancedItems}
            renderItemValue={getItemName}
            renderListItem={renderCustomListItem}
            listStyles={css`
              max-height: 19rem;
            `}
            searchValue={""}
            onSearchValueChange={noop}
          />
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Interactive", () => {
    const [selectedFruit, setSelectedFruit] = useState("")
    const [selectedAdvancedFruit, setSelectedAdvancedFruit] =
      useState<AdvancedItem>()

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
            <InputSearch
              items={basicItems}
              label="Fruit type"
              emptyItemValue="No fruit"
              onSelect={handleSelect}
              selectedItem={selectedFruit}
              searchValue={""}
              onSearchValueChange={noop}
            />
          </Story>
          <Story title="Customized data">
            <InputSearch
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
              searchValue={""}
              onSearchValueChange={noop}
            />
          </Story>
        </StoryContainer>
        <StoryContainer title="Searchable" customStyle={storyContainerStyles}>
          <Story title="Simple data">
            <InputSearch
              items={basicItems}
              label="Fruit type"
              emptyItemValue="No fruit"
              onSelect={handleSelect}
              selectedItem={selectedFruit}
              searchable
              searchValue={""}
              onSearchValueChange={noop}
            />
          </Story>
          <Story title="Customized data">
            <InputSearch
              searchable
              label="Fruit type"
              emptyItemValue="No fruit"
              items={advancedItems}
              renderItemValue={getItemName}
              renderListItem={renderCustomListItem}
              onSelect={handleAdvancedSelect}
              selectedItem={selectedAdvancedFruit}
              listStyles={css`
                max-height: 19rem;
              `}
              searchValue={""}
              onSearchValueChange={noop}
            />
          </Story>
        </StoryContainer>
        <StoryContainer title="Disabled" customStyle={storyContainerStyles}>
          <Story title="Simple data">
            <InputSearch
              items={basicItems}
              disabledItems={[basicItems[1], basicItems[2]]}
              label="Fruit type"
              emptyItemValue="No fruit"
              onSelect={handleSelect}
              selectedItem={selectedFruit}
              searchable
              searchValue={""}
              onSearchValueChange={noop}
            />
          </Story>
          <Story title="Customized data">
            <InputSearch
              searchable
              label="Fruit type"
              emptyItemValue="No fruit"
              items={advancedItems}
              disabledItems={[advancedItems[1], advancedItems[2]]}
              renderItemValue={getItemName}
              renderListItem={renderCustomListItem}
              onSelect={handleAdvancedSelect}
              selectedItem={selectedAdvancedFruit}
              listStyles={css`
                max-height: 19rem;
              `}
              searchValue={""}
              onSearchValueChange={noop}
            />
          </Story>
        </StoryContainer>
      </>
    )
  })
