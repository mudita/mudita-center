/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import { messages } from "Renderer/components/rest/overview/network/network.component"

storiesOf("Components|Core/Button Toggler", module)
  .add("Default", () => (
    <>
      <StoryContainer title="Types" column>
        <Story title="Single button">
          <ButtonToggler>
            <ButtonTogglerItem label="Turn on" />
          </ButtonToggler>
        </Story>
        <Story title="Two buttons">
          <ButtonToggler>
            <ButtonTogglerItem label="Yes" active />
            <ButtonTogglerItem label="No" />
          </ButtonToggler>
        </Story>
        <Story title="Three buttons">
          <ButtonToggler>
            <ButtonTogglerItem label="Weekly" />
            <ButtonTogglerItem label="Monthly" active />
            <ButtonTogglerItem label="Yearly" />
          </ButtonToggler>
        </Story>
        <Story title="Four buttons">
          <ButtonToggler>
            <ButtonTogglerItem label="Daily" />
            <ButtonTogglerItem label="Weekly" active />
            <ButtonTogglerItem label="Monthly" />
            <ButtonTogglerItem label="Yearly" />
          </ButtonToggler>
        </Story>
      </StoryContainer>
      <StoryContainer title="Themes">
        <Story title="Default">
          <ButtonToggler>
            <ButtonTogglerItem label="Yes" active />
            <ButtonTogglerItem label="No" />
          </ButtonToggler>
        </Story>
        <Story title="Filled">
          <ButtonToggler filled>
            <ButtonTogglerItem label="Yes" active />
            <ButtonTogglerItem label="No" />
          </ButtonToggler>
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Interactive - single button", () => {
    const [enabled, setEnabledState] = useState(false)

    const toggleEnabledState = () => setEnabledState((prevState) => !prevState)
    return (
      <>
        <Story title="Default theme">
          <ButtonToggler>
            <ButtonTogglerItem
              label="Enable"
              onClick={toggleEnabledState}
              active={enabled}
            />
          </ButtonToggler>
        </Story>
        <Story title="Filled theme">
          <ButtonToggler filled>
            <ButtonTogglerItem
              label="Enable"
              onClick={toggleEnabledState}
              active={enabled}
            />
          </ButtonToggler>
        </Story>
      </>
    )
  })
  .add("Interactive - multiple buttons", () => {
    const threeStates = ["Weekly", "Monthly", "Yearly"]
    const [activeLabel, setActiveLabel] = useState(threeStates[0])

    return (
      <>
        <Story title="Default theme">
          <ButtonToggler>
            {threeStates.map((label, index) => {
              const selectState = () => setActiveLabel(label)
              return (
                <ButtonTogglerItem
                  label={label}
                  onClick={selectState}
                  active={label === activeLabel}
                  key={index}
                />
              )
            })}
          </ButtonToggler>
        </Story>
        <Story title="Filled theme">
          <ButtonToggler filled>
            {threeStates.map((label, index) => {
              const selectState = () => setActiveLabel(label)
              return (
                <ButtonTogglerItem
                  label={label}
                  onClick={selectState}
                  active={label === activeLabel}
                  key={index}
                />
              )
            })}
          </ButtonToggler>
        </Story>
      </>
    )
  })
  .add("With tooltip", () => {
    const props = {
      tooltipTitle: messages.tooltipTitle,
      tooltipDescription: messages.tooltipDescription,
    }
    return (
      <>
        <Story title="Single button">
          <ButtonToggler {...props}>
            <ButtonTogglerItem label="Turn on" />
          </ButtonToggler>
        </Story>
        <Story title="Two buttons">
          <ButtonToggler {...props}>
            <ButtonTogglerItem label="Yes" active />
            <ButtonTogglerItem label="No" />
          </ButtonToggler>
        </Story>
        <Story title="Three buttons">
          <ButtonToggler {...props}>
            <ButtonTogglerItem label="Weekly" />
            <ButtonTogglerItem label="Monthly" active />
            <ButtonTogglerItem label="Yearly" />
          </ButtonToggler>
        </Story>
        <Story title="Four buttons">
          <ButtonToggler {...props}>
            <ButtonTogglerItem label="Daily" />
            <ButtonTogglerItem label="Weekly" active />
            <ButtonTogglerItem label="Monthly" />
            <ButtonTogglerItem label="Yearly" />
          </ButtonToggler>
        </Story>
      </>
    )
  })
