import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"

export const singleStateToggler = ["Turn on"]

export const twoStateToggler = ["On", "Off"]

export const threeStateToggler = ["Weekly", "Monthly", "Yearly"]

export const fourStateToggler = ["Daily", "Weekly", "Monthly", "Yearly"]

const Wrapper = styled.div`
  margin: 2rem;
`

export const renderStory = (
  options: typeof singleStateToggler,
  filled: boolean = false
) => {
  return (
    <>
      <Wrapper>
        <Text displayStyle={TextDisplayStyle.SmallText}>None selected</Text>
        <br />
        <ButtonToggler filled={filled}>
          {options.map((label, i) => (
            <ButtonTogglerItem key={i} label={label} />
          ))}
        </ButtonToggler>
      </Wrapper>
      {options.map((option, j) => (
        <Wrapper key={j}>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            {option} selected
          </Text>
          <br />
          <ButtonToggler filled={filled}>
            {options.map((label, k) => (
              <ButtonTogglerItem key={k} label={label} active={j === k} />
            ))}
          </ButtonToggler>
        </Wrapper>
      ))}
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

storiesOf("Components|Button Toggler", module).add("interactive", () => {
  const [activeLabel, setActiveLabel] = useState(threeStateToggler[0])
  return (
    <>
      <Wrapper>
        <Text displayStyle={TextDisplayStyle.SmallText}>Outlined</Text>
        <br />
        <ButtonToggler>
          {threeStateToggler.map((label, i) => {
            const onClick = () => setActiveLabel(label)
            return (
              <ButtonTogglerItem
                key={i}
                label={label}
                onClick={onClick}
                active={activeLabel === label}
              />
            )
          })}
        </ButtonToggler>
      </Wrapper>
      <Wrapper>
        <Text displayStyle={TextDisplayStyle.SmallText}>Filled</Text>
        <br />
        <ButtonToggler filled>
          {threeStateToggler.map((label, i) => {
            const onClick = () => setActiveLabel(label)
            return (
              <ButtonTogglerItem
                key={i}
                label={label}
                onClick={onClick}
                active={activeLabel === label}
              />
            )
          })}
        </ButtonToggler>
      </Wrapper>
    </>
  )
})
