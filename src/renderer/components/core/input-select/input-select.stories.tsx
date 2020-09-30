import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import InputSelect, {
  RenderListItemProps,
  renderSearchableText,
  SelectInputItem,
} from "Renderer/components/core/input-select/input-select.component"
import { css } from "styled-components"
import { action } from "@storybook/addon-actions"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`

export const basicOptions = [
  "apple",
  "banana",
  "orange",
  "pineapple",
  "strawberry",
  "potato",
  "tomato",
  "cabbage",
]

export const advancedOptions = [
  { name: "Apple", value: "apple", type: "fruit", icon: "🍏" },
  { name: "Banana", value: "banana", type: "fruit", icon: "🍌" },
  { name: "Orange", value: "orange", type: "fruit", icon: "🍊" },
  { name: "Pineapple", value: "pineapple", type: "fruit", icon: "🍍" },
  { name: "Strawberry", value: "strawberry", type: "fruit", icon: "🍓" },
  { name: "Potato", value: "potato", type: "vegetable", icon: "🥔" },
  { name: "Tomato", value: "tomato", type: "vegetable", icon: "🍅" },
  { name: "Cabbage", value: "cabbage", type: "vegetable", icon: "🥬" },
]

type AdvancedItem = typeof advancedOptions[number]

const renderCustomValue = (item: AdvancedItem) => item.name

const renderCustomListItem = ({
  item: { name, type, icon },
  searchString,
  props,
}: RenderListItemProps<AdvancedItem>) => (
  <SelectInputItem {...props}>
    <strong>
      {icon} {renderSearchableText(name, searchString)}
    </strong>
    <br />
    <em>{type}</em>
  </SelectInputItem>
)

const renderSearchableCustomListItem = ({
  item: { name, type, icon },
  searchString,
  props,
}: RenderListItemProps<AdvancedItem>) => (
  <SelectInputItem {...props}>
    <strong>
      {icon} {renderSearchableText(name, searchString)}
    </strong>
    <br />
    <em>{type}</em>
  </SelectInputItem>
)

const isOptionMatching = (item: AdvancedItem, search: string) => {
  return item.name.toLowerCase().includes(search.toLowerCase())
}

storiesOf("Components|Core/InputSelect", module)
  .add("Default", () => (
    <>
      <StoryContainer title="Themes" customStyle={storyContainerStyles}>
        <Story title="Default">
          <InputSelect options={basicOptions} label="Fruit type" />
        </Story>
        <Story title="Outlined">
          <InputSelect options={basicOptions} outlined label="Fruit type" />
        </Story>
        <Story title="Condensed (default)">
          <InputSelect options={basicOptions} condensed label="Fruit type" />
        </Story>
        <Story title="Condensed (outlined)">
          <InputSelect
            options={basicOptions}
            condensed
            outlined
            label="Fruit type"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers" customStyle={storyContainerStyles}>
        <Story title="Label (default)">
          <InputSelect options={basicOptions} label="Fruit type" />
        </Story>
        <Story title="Label (outlined)">
          <InputSelect options={basicOptions} label="Fruit type" outlined />
        </Story>
        <Story title="Value (default)">
          <InputSelect
            options={basicOptions}
            label="Fruit type"
            value={basicOptions[1]}
          />
        </Story>
        <Story title="Value (outlined)">
          <InputSelect
            options={basicOptions}
            label="Fruit type"
            value={basicOptions[1]}
            outlined
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Customizations" customStyle={storyContainerStyles}>
        <Story title="Empty option">
          <InputSelect
            options={basicOptions}
            label="Fruit type"
            emptyOption="No fruit"
          />
        </Story>
        <Story title="List items">
          <InputSelect
            label="Fruit type"
            emptyOption="No fruit"
            options={advancedOptions}
            renderValue={renderCustomValue}
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
            options={basicOptions}
            label="Fruit type"
            emptyOption="No fruit"
          />
        </Story>
        <Story title="Custom rendered list">
          <InputSelect
            searchable
            label="Fruit type"
            emptyOption="No fruit"
            options={advancedOptions}
            renderValue={renderCustomValue}
            renderListItem={renderSearchableCustomListItem}
            isOptionMatching={isOptionMatching}
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
    const [selectedAdvancedFruit, setSelectedAdvancedFruit] = useState<
      AdvancedItem
    >()

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
              options={basicOptions}
              label="Fruit type"
              emptyOption="No fruit"
              onSelect={handleSelect}
              value={selectedFruit}
            />
          </Story>
          <Story title="Customized data">
            <InputSelect
              label="Fruit type"
              emptyOption="No fruit"
              options={advancedOptions}
              renderValue={renderCustomValue}
              renderListItem={renderCustomListItem}
              onSelect={handleAdvancedSelect}
              value={selectedAdvancedFruit}
              listStyles={css`
                max-height: 33rem;
              `}
            />
          </Story>
        </StoryContainer>
        <StoryContainer title="Searchable" customStyle={storyContainerStyles}>
          <Story title="Simple data">
            <InputSelect
              options={basicOptions}
              label="Fruit type"
              emptyOption="No fruit"
              onSelect={handleSelect}
              value={selectedFruit}
              searchable
            />
          </Story>
          <Story title="Customized data">
            <InputSelect
              searchable
              label="Fruit type"
              emptyOption="No fruit"
              options={advancedOptions}
              renderValue={renderCustomValue}
              renderListItem={renderSearchableCustomListItem}
              isOptionMatching={isOptionMatching}
              onSelect={handleAdvancedSelect}
              value={selectedAdvancedFruit}
              listStyles={css`
                max-height: 19rem;
              `}
            />
          </Story>
        </StoryContainer>
        <StoryContainer title="Disabled" customStyle={storyContainerStyles}>
          <Story title="Simple data">
            <InputSelect
              options={basicOptions}
              disabledOptions={[basicOptions[1], basicOptions[2]]}
              label="Fruit type"
              emptyOption="No fruit"
              onSelect={handleSelect}
              value={selectedFruit}
              searchable
            />
          </Story>
          <Story title="Customized data">
            <InputSelect
              searchable
              label="Fruit type"
              emptyOption="No fruit"
              options={advancedOptions}
              disabledOptions={[advancedOptions[1], advancedOptions[2]]}
              renderValue={renderCustomValue}
              renderListItem={renderSearchableCustomListItem}
              isOptionMatching={isOptionMatching}
              onSelect={handleAdvancedSelect}
              value={selectedAdvancedFruit}
              listStyles={css`
                max-height: 19rem;
              `}
            />
          </Story>
        </StoryContainer>
      </>
    )
  })
