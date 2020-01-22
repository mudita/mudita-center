import { storiesOf } from "@storybook/react"
import React from "react"
import ButtonToggler from "Renderer/components/core/button-toggler/button-toggler.component"
import { ButtonTogglerProps } from "Renderer/components/core/button-toggler/button-toggler.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { noop } from "Renderer/utils/noop"
import styled from "styled-components"

export const singleStateToggler = [{ label: "Turn on", key: "on" }]

export const twoStateToggler = [
  { label: "On", key: true },
  { label: "Off", key: false },
]

export const threeStateToggler = [
  { label: "Weekly", key: "weekly" },
  { label: "Monthly", key: "monthly" },
  { label: "Yearly", key: "yearly" },
]

export const fourStateToggler = [
  { label: "Daily", key: "daily" },
  { label: "Weekly", key: "weekly" },
  { label: "Monthly", key: "monthly" },
  { label: "Yearly", key: "yearly" },
]

const Wrapper = styled.div`
  margin: 2rem;
`

export const renderStory = (
  options: ButtonTogglerProps["options"],
  filled: boolean = false
) => {
  return (
    <>
      <Wrapper>
        <Text displayStyle={TextDisplayStyle.SmallText}>None selected</Text>
        <br />
        <ButtonToggler
          options={options}
          activeKey={undefined}
          onToggle={noop}
        />
      </Wrapper>
      {options.map((option, index) => {
        return (
          <Wrapper key={index}>
            <Text displayStyle={TextDisplayStyle.SmallText}>
              {option.label} selected
            </Text>
            <br />
            <ButtonToggler
              options={options}
              activeKey={option.key}
              filled={filled}
              onToggle={noop}
            />
          </Wrapper>
        )
      })}
    </>
  )
}

storiesOf("Components|Button Toggler/default style", module)
  .add("single state", () => renderStory(singleStateToggler))
  .add("two states", () => renderStory(twoStateToggler))
  .add("three states", () => renderStory(threeStateToggler))
  .add("four states", () => renderStory(fourStateToggler))

storiesOf("Components|Button Toggler/filled style", module)
  .add("single state", () => renderStory(singleStateToggler, true))
  .add("two states", () => renderStory(twoStateToggler, true))
  .add("three states", () => renderStory(threeStateToggler, true))
  .add("four states", () => renderStory(fourStateToggler, true))
