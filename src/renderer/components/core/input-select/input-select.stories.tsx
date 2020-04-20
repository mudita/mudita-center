import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import InputSelect, {
  InputSelectProps,
} from "Renderer/components/core/input-select/input-select.component"
import styled, { css } from "styled-components"
import { action } from "@storybook/addon-actions"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import FunctionComponent from "Renderer/types/function-component.interface"

const StoryWrapper = styled.div`
  max-width: 20rem;
  margin: 3rem 2rem;

  p {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`

export const data = [
  "apple",
  "banana",
  "orange",
  "pineapple",
  "strawberry",
  "potato",
  "tomato",
  "cabbage",
]

export const advancedData = [
  { name: "Apple", value: "apple", type: "fruit", icon: "🍏" },
  { name: "Banana", value: "banana", type: "fruit", icon: "🍌" },
  { name: "Orange", value: "orange", type: "fruit", icon: "🍊" },
  { name: "Pineapple", value: "pineapple", type: "fruit", icon: "🍍" },
  { name: "Strawberry", value: "strawberry", type: "fruit", icon: "🍓" },
  { name: "Potato", value: "potato", type: "vegetable", icon: "🥔" },
  { name: "Tomato", value: "tomato", type: "vegetable", icon: "🍅" },
  { name: "Cabbage", value: "cabbage", type: "vegetable", icon: "🥬" },
]

const Story: FunctionComponent<Partial<InputSelectProps>> = ({
  options = data,
  value = "",
  ...rest
}) => {
  const [selectedFruit, setSelectedFruit] = useState(value)

  const handleSelect = (fruit: string) => {
    action("Select")(fruit)
    setSelectedFruit(fruit)
  }

  return (
    <>
      <StoryWrapper>
        <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
        <InputSelect
          value={selectedFruit}
          options={options}
          onSelect={handleSelect}
          {...rest}
        />
      </StoryWrapper>
      <StoryWrapper>
        <Text displayStyle={TextDisplayStyle.SmallText}>Outlined</Text>
        <InputSelect
          value={selectedFruit}
          options={options}
          onSelect={handleSelect}
          outlined
          {...rest}
        />
      </StoryWrapper>
    </>
  )
}

storiesOf("Components|InputSelect/Basic", module)
  .add("Standard", () => <Story placeholder={"Fruit"} />)
  .add("Standard and empty option", () => (
    <Story placeholder={"Fruit"} emptyOption={"Select"} />
  ))
  .add("Preselected", () => <Story value={data[2]} />)
  .add("Customized list", () => {
    const valueRenderer = (item: typeof advancedData[number]) => item.name

    const listItemRenderer = ({
      name,
      type,
      icon,
    }: typeof advancedData[number]) => (
      <>
        <strong>
          {icon} {name}
        </strong>
        <br />
        <em>{type}</em>
      </>
    )

    return (
      <Story
        emptyOption={"None"}
        placeholder={"Fruit"}
        options={advancedData}
        valueRenderer={valueRenderer}
        listItemRenderer={listItemRenderer}
        listStyles={css`
          max-height: 33rem;
        `}
      />
    )
  })
