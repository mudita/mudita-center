import { storiesOf } from "@storybook/react"
import React from "react"
import InputFile from "Renderer/components/core/input-file/input-file.component"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"

const StoryWrapper = styled.div`
  max-width: 50rem;
  margin: 2rem;
`

storiesOf("Components|InputFile", module)
  .add("Single file upload", () => {
    return (
      <StoryWrapper>
        <InputFile onUpdate={action("Update")} />
      </StoryWrapper>
    )
  })
  .add("Multiple files upload", () => {
    return (
      <StoryWrapper>
        <InputFile multiple onUpdate={action("Update")} />
      </StoryWrapper>
    )
  })
