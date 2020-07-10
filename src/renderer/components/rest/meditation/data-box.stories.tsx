import { storiesOf } from "@storybook/react"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import React from "react"
import DataBox from "Renderer/components/rest/meditation/data-box.component"
import { TextWrapper } from "Renderer/components/rest/meditation/data-box.styled"
import LargeDataText from "Renderer/components/rest/meditation/large-data-text.component"
import SmallDataText from "Renderer/components/rest/meditation/small-data-text.component"
import CaptionDataText from "Renderer/components/rest/meditation/caption-data-text.component"
import DataBoxes from "Renderer/components/rest/meditation/data-boxes.component"

storiesOf("Meditation|Data box", module)
  .add("Default", () => (
    <>
      <StoryContainer>
        <Story title="First box" darkMode>
          <DataBox>
            <TextWrapper>
              <LargeDataText>6</LargeDataText>
              <SmallDataText>/7</SmallDataText>
            </TextWrapper>
            <CaptionDataText id="view.name.meditation.dataBox.daysPracticed" />
          </DataBox>
        </Story>
        <Story title="Second box" darkMode>
          <DataBox>
            <TextWrapper>
              <LargeDataText>1</LargeDataText>
              <SmallDataText>h</SmallDataText>
              <LargeDataText>11</LargeDataText>
              <SmallDataText>m</SmallDataText>
              <LargeDataText>14</LargeDataText>
              <SmallDataText>s</SmallDataText>
            </TextWrapper>
            <CaptionDataText id="view.name.meditation.dataBox.totalPracticeTime" />
          </DataBox>
        </Story>
        <Story title="Third box" darkMode>
          <DataBox>
            <TextWrapper>
              <LargeDataText>17</LargeDataText>
              <SmallDataText>m</SmallDataText>
              <LargeDataText>32</LargeDataText>
              <SmallDataText>s</SmallDataText>
            </TextWrapper>
            <CaptionDataText id="view.name.meditation.dataBox.averageSessionLength" />
          </DataBox>
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Multiple", () => (
    <>
      <StoryContainer>
        <Story title="Multiple boxes" darkMode>
          <DataBoxes />
        </Story>
      </StoryContainer>
    </>
  ))
