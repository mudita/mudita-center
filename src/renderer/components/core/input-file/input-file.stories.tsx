import { storiesOf } from "@storybook/react"
import React from "react"
import InputFile from "Renderer/components/core/input-file/input-file.component"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const StoryWrapper = styled.div`
  max-width: 50rem;
  margin: 3rem 2rem;

  > p {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`

storiesOf("Components|InputFile", module)
  .add("Single file upload", () => {
    return (
      <>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
          <InputFile onUpdate={action("Update")} />
        </StoryWrapper>
      </>
    )
  })
  .add("Multiple files upload", () => {
    return (
      <>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>Default</Text>
          <InputFile multiple onUpdate={action("Update")} />
        </StoryWrapper>
      </>
    )
  })
  .add("With error", () => {
    return (
      <>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            Single file
            <br />
            Accepted files: video/*, image/*
            <br />
            Max file size: 10MB
          </Text>
          <InputFile
            onUpdate={action("Update")}
            handleError={action("Error")}
            accept="video/*, image/*"
            maxFileSize={10 * 1024 ** 2}
          />
        </StoryWrapper>
        <StoryWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText}>
            Multiple file
            <br />
            Accepted files: video/mp4, image/*, .dmg
            <br />
            Max file size: 5MB
            <br />
            Max allowed files: 3
          </Text>

          <InputFile
            onUpdate={action("Update")}
            handleError={action("Error")}
            accept="video/mp4, image/*, .dmg"
            maxFileSize={5 * 1024 ** 2}
            multiple
            maxAllowedFiles={3}
          />
        </StoryWrapper>
      </>
    )
  })
