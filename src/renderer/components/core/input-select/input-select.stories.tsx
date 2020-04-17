import { storiesOf } from "@storybook/react"
import React, { useEffect, useState } from "react"
import InputSelect from "Renderer/components/core/input-select/input-select.component"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const StoryWrapper = styled.div`
  max-width: 20rem;
  margin: 3rem 2rem;

  p {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`

export const fruitsInfo = [
  "apple",
  "banana",
  "orange",
  "pineapple",
  "strawberry",
  "potato",
  "tomato",
  "cabbage",
]

export const advancedFruitsInfo = [
  { name: "Apple", value: "apple", type: "fruit" },
  { name: "Banana", value: "banana", type: "fruit" },
  { name: "Orange", value: "orange", type: "fruit" },
  { name: "Pineapple", value: "pineapple", type: "fruit" },
  { name: "Strawberry", value: "strawberry", type: "fruit" },
  { name: "Potato", value: "potato", type: "vegetable" },
  { name: "Tomato", value: "tomato", type: "vegetable" },
  { name: "Cabbage", value: "cabbage", type: "vegetable" },
]

storiesOf("Components|InputSelect/Basic", module)
  .add("Standard", () => {
    return (
      <>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
          <InputSelect
            options={fruitsInfo}
            emptyOption={"Select"}
            onSelect={action("Select")}
          />
        </StoryWrapper>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Outlined</Text>
          <InputSelect
            options={fruitsInfo}
            emptyOption={"Select"}
            onSelect={action("Select")}
            outlined
          />
        </StoryWrapper>
      </>
    )
  })
  .add("Preselected", () => {
    return (
      <>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
          <InputSelect
            options={fruitsInfo}
            emptyOption={"Select"}
            onSelect={action("Select")}
            value={fruitsInfo[2]}
          />
        </StoryWrapper>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Outlined</Text>
          <InputSelect
            options={fruitsInfo}
            emptyOption={"Select"}
            onSelect={action("Select")}
            value={fruitsInfo[2]}
            outlined
          />
        </StoryWrapper>
      </>
    )
  })
  .add("Customized list", () => {
    const valueRenderer = (item: typeof advancedFruitsInfo[number]) => item.name

    const listItemRenderer = (item: typeof advancedFruitsInfo[number]) => (
      <>
        <strong>{item.name}</strong> <em>{item.type}</em>
      </>
    )

    return (
      <>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
          <InputSelect
            options={advancedFruitsInfo}
            value={advancedFruitsInfo[2]}
            valueRenderer={valueRenderer}
            listItemRenderer={listItemRenderer}
            emptyOption={"Select"}
            onSelect={action("Select")}
          />
        </StoryWrapper>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Outlined</Text>
          <InputSelect
            options={advancedFruitsInfo}
            value={advancedFruitsInfo[2]}
            valueRenderer={valueRenderer}
            listItemRenderer={listItemRenderer}
            emptyOption={"Select"}
            onSelect={action("Select")}
            outlined
          />
        </StoryWrapper>
      </>
    )
  })

storiesOf("Components|InputSelect/Searchable", module)
  .add("Standard", () => {
    const [selectedFruit, setSelectedFruit] = useState("")
    const [filteredFruits, setFilteredFruits] = useState(advancedFruitsInfo)
    const [filter, setFilter] = useState("")

    const valueRenderer = (item: typeof advancedFruitsInfo[number]) => item.name

    const listItemRenderer = (item: typeof advancedFruitsInfo[number]) => (
      <>
        <strong>{item.name}</strong> <em>{item.type}</em>
      </>
    )

    const onFilter = (value: string) => {
      setFilter(value)
    }

    const handleSelect = fruit => {
      setSelectedFruit(fruit)
      console.log(fruit)
    }

    useEffect(() => {
      const fruits = advancedFruitsInfo.filter(fruit =>
        fruit.value.includes(filter.toLowerCase())
      )
      setFilteredFruits(fruits)
    }, [filter])

    useEffect(() => {
      setFilter("")
    }, [selectedFruit])

    return (
      <>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
          <InputSelect
            options={filteredFruits}
            value={selectedFruit}
            valueRenderer={valueRenderer}
            listItemRenderer={listItemRenderer}
            onSelect={handleSelect}
            onFilter={onFilter}
            searchable
          />
        </StoryWrapper>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Non-outlined</Text>
          <InputSelect
            options={filteredFruits}
            value={selectedFruit}
            valueRenderer={valueRenderer}
            listItemRenderer={listItemRenderer}
            onSelect={handleSelect}
            onFilter={onFilter}
            outlined={false}
            searchable
          />
        </StoryWrapper>
      </>
    )
  })
  .add("Searchable not outlined", () => {
    return (
      <StoryWrapper>
        <InputSelect options={fruitsInfo} searchable outlined={false} />
      </StoryWrapper>
    )
  })
