import { storiesOf } from "@storybook/react"
import React from "react"
import InputFile from "Renderer/components/core/input-file/input-file.component"
import { action } from "@storybook/addon-actions"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import { css } from "styled-components"

const storyStyles = css`
  align-items: flex-start;

  main > * {
    width: 43rem;
  }
`

storiesOf("Components|Core/InputFile", module).add("Default", () => (
  <>
    <StoryContainer title="Types" customStyle={storyStyles}>
      <Story title="Single file">
        <InputFile onUpdate={action("Update")} />
      </Story>
      <Story title="Multiple files">
        <InputFile multiple onUpdate={action("Update")} />
      </Story>
    </StoryContainer>
    <StoryContainer title="Restrictions" customStyle={storyStyles}>
      <Story
        title={
          "Single file input that accepts only video or image \n with max size of 10MB"
        }
      >
        <InputFile
          onUpdate={action("Update")}
          handleError={action("Error")}
          accept="video/*, image/*"
          maxFileSize={10 * 1024 ** 2}
        />
      </Story>
      <Story
        title={
          "Multiple files input that accepts only mp4 videos, images \n and .dmg files with max size of 5MB and max 3 files at once "
        }
      >
        <InputFile
          onUpdate={action("Update")}
          handleError={action("Error")}
          accept="video/mp4, image/*, .dmg"
          maxFileSize={5 * 1024 ** 2}
          multiple
          maxAllowedFiles={3}
        />
      </Story>
    </StoryContainer>
  </>
))
