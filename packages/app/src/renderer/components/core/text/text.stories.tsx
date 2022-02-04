/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import Text, { TextDisplayStyle } from "./text.component"
import Story from "Renderer/components/storybook/story.component"
import styled from "styled-components"

const Info = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 999;
  background: #fff;
  padding: 2rem;
  font-size: 1.5rem;
  box-shadow: 0 0.2rem 2rem 0 rgba(0, 0, 0, 0.25);
`

const ClickableWrapper = styled(
  ({
    text,
    children,
    className,
  }: {
    text: string
    children: any
    className?: string
  }) => {
    const [infoVisible, setInfoVisible] = useState(false)

    const handleCopy = async () => {
      await navigator.clipboard.writeText(text)
      setInfoVisible(true)

      setTimeout(() => {
        setInfoVisible(false)
      }, 1000)
    }

    return (
      <>
        {infoVisible && <Info>Copied to clipboard!</Info>}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <div onClick={handleCopy} className={className}>
          {children}
        </div>
      </>
    )
  }
)`
  cursor: pointer;
  display: inline-block;
  align-self: flex-start;
`

storiesOf("Theme/Text", module).add("Text", () => {
  return (
    <>
      <Text displayStyle={TextDisplayStyle.PrimaryHeading}>TYPOGRAPHY</Text>
      <Text displayStyle={TextDisplayStyle.Paragraph3}>
        Click on the box to copy text style
      </Text>
      <br />
      <br />
      <ClickableWrapper text="TextDisplayStyle.Default">
        <Story noUppercase title="Default">
          <Text displayStyle={TextDisplayStyle.Default}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.PrimaryHeading">
        <Story noUppercase title="PrimaryHeading">
          <Text displayStyle={TextDisplayStyle.PrimaryHeading}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.SecondaryHeading">
        <Story noUppercase title="SecondaryHeading">
          <Text displayStyle={TextDisplayStyle.SecondaryHeading}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.TertiaryHeading">
        <Story noUppercase title="TertiaryHeading">
          <Text displayStyle={TextDisplayStyle.TertiaryHeading}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.QuaternaryHeading">
        <Story noUppercase title="QuaternaryHeading">
          <Text displayStyle={TextDisplayStyle.QuaternaryHeading}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.FifthHeading">
        <Story noUppercase title="FifthHeading">
          <Text displayStyle={TextDisplayStyle.FifthHeading}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.Paragraph1">
        <Story noUppercase title="Paragraph1">
          <Text displayStyle={TextDisplayStyle.Paragraph1}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.Paragraph2">
        <Story noUppercase title="Paragraph2">
          <Text displayStyle={TextDisplayStyle.Paragraph2}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.Paragraph3">
        <Story noUppercase title="Paragraph3">
          <Text displayStyle={TextDisplayStyle.Paragraph3}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.Paragraph4">
        <Story noUppercase title="Paragraph4">
          <Text displayStyle={TextDisplayStyle.Paragraph4}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.Paragraph4">
        <Story noUppercase title="Paragraph4 color secondary">
          <Text displayStyle={TextDisplayStyle.Paragraph4} color="secondary">
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.Title">
        <Story noUppercase title="Title">
          <Text displayStyle={TextDisplayStyle.Title}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.Button">
        <Story noUppercase title="Button">
          <Text displayStyle={TextDisplayStyle.Button}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.Label">
        <Story noUppercase title="Label">
          <Text displayStyle={TextDisplayStyle.Label}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
    </>
  )
})
