/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import React from "react"
import DataBox from "App/__deprecated__/renderer/components/rest/meditation/data-box/data-box.component"
import { TextWrapper } from "App/__deprecated__/renderer/components/rest/meditation/data-box/data-box.styled"
import DataBoxes, {
  messages,
} from "App/__deprecated__/renderer/components/rest/meditation/data-box/data-boxes.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"

storiesOf("Components/Rest/Meditation", module)
  .add("Data box – single", () => (
    <>
      <StoryContainer>
        <Story title="First box" darkMode>
          <DataBox>
            <TextWrapper>
              <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
                6
              </Text>
              <Text displayStyle={TextDisplayStyle.Headline3} element={"span"}>
                /7
              </Text>
            </TextWrapper>
            <Text
              displayStyle={TextDisplayStyle.Label}
              element={"p"}
              message={messages.daysPracticed}
            />
          </DataBox>
        </Story>
        <Story title="Second box" darkMode>
          <DataBox>
            <TextWrapper>
              <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
                1
              </Text>
              <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
                h
              </Text>
              <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
                11
              </Text>
              <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
                m
              </Text>
              <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
                14
              </Text>
              <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
                s
              </Text>
            </TextWrapper>
            <Text
              displayStyle={TextDisplayStyle.Label}
              element={"p"}
              message={messages.totalPracticeTime}
            />
          </DataBox>
        </Story>
        <Story title="Third box" darkMode>
          <DataBox>
            <TextWrapper>
              <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
                17
              </Text>
              <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
                m
              </Text>
              <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
                32
              </Text>
              <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
                s
              </Text>
            </TextWrapper>
            <Text
              displayStyle={TextDisplayStyle.Label}
              element={"p"}
              message={messages.averageSessionLength}
            />
          </DataBox>
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Data box – multiple", () => (
    <>
      <StoryContainer>
        <Story title="Multiple boxes" darkMode>
          <DataBoxes />
        </Story>
      </StoryContainer>
    </>
  ))
