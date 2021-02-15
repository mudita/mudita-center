/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "../../storybook/story.component"
import { css } from "styled-components"
import SearchableText from "Renderer/components/core/searchable-text/searchable-text.component"

const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`

const text = "Searchable Text"
const search = text.substr(0, 3)

storiesOf("Components|Core/Searchable Text", module).add("Default", () => (
  <>
    <StoryContainer title="Default" customStyle={storyContainerStyles}>
      <Story title="With no search">
        <span>
          <SearchableText text={text} />
        </span>
      </Story>
      <Story title="With search">
        <span>
          <SearchableText text={text} search={search} />
        </span>
      </Story>
    </StoryContainer>
  </>
))
