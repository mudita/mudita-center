import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import ButtonToggler from "Renderer/components/core/button-toggler/button-toggler.component"
import { ButtonTogglerProps } from "Renderer/components/core/button-toggler/button-toggler.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
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

export const PredefinedButtonToggler = ({
  options = twoStateToggler,
  ...props
}: Partial<ButtonTogglerProps>) => {
  const [activeKey, setActiveKey] = useState()
  return (
    <ButtonToggler
      activeKey={activeKey}
      onToggle={setActiveKey}
      options={options}
      {...props}
    />
  )
}

const Wrapper = styled.div`
  margin: 2rem;
`

const renderStory = (
  options: ButtonTogglerProps["options"],
  filled: boolean = false
) => {
  return (
    <>
      <Wrapper>
        <Text displayStyle={TextDisplayStyle.SmallText}>None selected</Text>
        <br />
        <PredefinedButtonToggler options={options} activeKey={undefined} />
      </Wrapper>
      {options.map((option, index) => {
        return (
          <Wrapper key={index}>
            <Text displayStyle={TextDisplayStyle.SmallText}>
              {option.label} selected
            </Text>
            <br />
            <PredefinedButtonToggler
              options={options}
              activeKey={option.key}
              filled={filled}
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
