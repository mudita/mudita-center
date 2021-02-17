/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
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
      <Text displayStyle={TextDisplayStyle.MediumLightText}>
        Click on the box to copy text style
      </Text>
      <br />
      <br />
      <ClickableWrapper text="TextDisplayStyle.PrimaryHeading">
        <Story noUppercase title="PrimaryHeading">
          <Text displayStyle={TextDisplayStyle.PrimaryHeading}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.SecondaryBoldHeading">
        <Story noUppercase title="SecondaryBoldHeading">
          <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.TertiaryBoldHeading">
        <Story noUppercase title="TertiaryBoldHeading">
          <Text displayStyle={TextDisplayStyle.TertiaryBoldHeading}>
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
      <ClickableWrapper text="TextDisplayStyle.LargeBoldText">
        <Story noUppercase title="LargeBoldText">
          <Text displayStyle={TextDisplayStyle.LargeBoldText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.LargeText">
        <Story noUppercase title="LargeText">
          <Text displayStyle={TextDisplayStyle.LargeText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.LargeFadedText">
        <Story noUppercase title="LargeFadedText">
          <Text displayStyle={TextDisplayStyle.LargeFadedText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.LargeTextCapitalLetters">
        <Story noUppercase title="LargeTextCapitalLetters">
          <Text displayStyle={TextDisplayStyle.LargeTextCapitalLetters}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.LargeFadedTextCapitalLetters">
        <Story noUppercase title="LargeFadedTextCapitalLetters">
          <Text displayStyle={TextDisplayStyle.LargeFadedTextCapitalLetters}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.LargeFadedDimTextCapitalLetters">
        <Story noUppercase title="LargeFadedDimTextCapitalLetters">
          <Text displayStyle={TextDisplayStyle.LargeFadedDimTextCapitalLetters}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.MediumBoldText">
        <Story noUppercase title="MediumBoldText">
          <Text displayStyle={TextDisplayStyle.MediumBoldText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.MediumLightText">
        <Story noUppercase title="MediumLightText">
          <Text displayStyle={TextDisplayStyle.MediumLightText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.MediumFadedLightText">
        <Story noUppercase title="MediumFadedLightText">
          <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.MediumText">
        <Story noUppercase title="MediumText">
          <Text displayStyle={TextDisplayStyle.MediumText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.MediumFadedText">
        <Story noUppercase title="MediumFadedText">
          <Text displayStyle={TextDisplayStyle.MediumFadedText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.MediumFadedTextUppercased">
        <Story noUppercase title="MediumFadedTextUppercased">
          <Text displayStyle={TextDisplayStyle.MediumFadedTextUppercased}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.MediumTextUppercased">
        <Story noUppercase title="MediumTextUppercased">
          <Text displayStyle={TextDisplayStyle.MediumTextUppercased}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.SmallText">
        <Story noUppercase title="SmallText">
          <Text displayStyle={TextDisplayStyle.SmallText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.SmallSupplementaryText">
        <Story noUppercase title="SmallSupplementaryText">
          <Text displayStyle={TextDisplayStyle.SmallSupplementaryText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.SmallTextInverted">
        <Story noUppercase title="SmallTextInverted">
          <Text displayStyle={TextDisplayStyle.SmallTextInverted}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.SmallFadedText">
        <Story noUppercase title="SmallFadedText">
          <Text displayStyle={TextDisplayStyle.SmallFadedText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
      <ClickableWrapper text="TextDisplayStyle.SmallFadedDimText">
        <Story noUppercase title="SmallFadedDimText">
          <Text displayStyle={TextDisplayStyle.SmallFadedDimText}>
            I’m at the meeting now. I will call you later
          </Text>
        </Story>
      </ClickableWrapper>
    </>
  )
})
