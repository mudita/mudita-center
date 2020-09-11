import { storiesOf } from "@storybook/react"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import React from "react"
import DataBox from "Renderer/components/rest/meditation/data-box/data-box.component"
import { TextWrapper } from "Renderer/components/rest/meditation/data-box/data-box.styled"
import DataBoxes, {
  messages,
} from "Renderer/components/rest/meditation/data-box/data-boxes.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

storiesOf("Components|Rest/Meditation", module)
  .add("Data box – single", () => (
    <>
      <StoryContainer>
        <Story title="First box" darkMode>
          <DataBox>
            <TextWrapper>
              <Text
                displayStyle={TextDisplayStyle.PrimaryHeading}
                element={"span"}
              >
                6
              </Text>
              <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
                /7
              </Text>
            </TextWrapper>
            <Text
              displayStyle={TextDisplayStyle.SmallFadedText}
              element={"p"}
              message={messages.daysPracticed}
            />
          </DataBox>
        </Story>
        <Story title="Second box" darkMode>
          <DataBox>
            <TextWrapper>
              <Text
                displayStyle={TextDisplayStyle.PrimaryHeading}
                element={"span"}
              >
                1
              </Text>
              <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
                h
              </Text>
              <Text
                displayStyle={TextDisplayStyle.PrimaryHeading}
                element={"span"}
              >
                11
              </Text>
              <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
                m
              </Text>
              <Text
                displayStyle={TextDisplayStyle.PrimaryHeading}
                element={"span"}
              >
                14
              </Text>
              <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
                s
              </Text>
            </TextWrapper>
            <Text
              displayStyle={TextDisplayStyle.SmallFadedText}
              element={"p"}
              message={messages.totalPracticeTime}
            />
          </DataBox>
        </Story>
        <Story title="Third box" darkMode>
          <DataBox>
            <TextWrapper>
              <Text
                displayStyle={TextDisplayStyle.PrimaryHeading}
                element={"span"}
              >
                17
              </Text>
              <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
                m
              </Text>
              <Text
                displayStyle={TextDisplayStyle.PrimaryHeading}
                element={"span"}
              >
                32
              </Text>
              <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
                s
              </Text>
            </TextWrapper>
            <Text
              displayStyle={TextDisplayStyle.SmallFadedText}
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
