/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import LoaderSpinner from "Renderer/components/core/loader/loader-spinner.component"
import styled from "styled-components"
import LoaderLogo from "Renderer/components/core/loader/loader-logo.component"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import { select, withKnobs } from "@storybook/addon-knobs"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"

const HotLoader = styled(LoaderSpinner)`
  color: hotpink;
`

storiesOf("Components|Core/Loader ", module)
  .add("Default", () => {
    const label = "Loaders type"
    const options = {
      Logo: LoaderType.Logo,
      Spinner: LoaderType.Spinner,
    }
    const defaultValue = LoaderType.Spinner

    const value = select(label, options, defaultValue)

    return (
      <>
        <StoryContainer title="Spinner">
          <Story title="Default">
            <LoaderSpinner />
          </Story>
          <Story title={"Custom color"}>
            <HotLoader />
          </Story>
          <Story title={"Custom size"}>
            <LoaderSpinner size={2} />
          </Story>
        </StoryContainer>
        <StoryContainer title="Logo">
          <Story title="Default">
            <LoaderLogo />
          </Story>
          <Story title="Custom size">
            <LoaderLogo size={5} />
          </Story>
        </StoryContainer>
        <StoryContainer title="Resolver">
          <Story>
            <Loader type={value} size={4} />
          </Story>
        </StoryContainer>
      </>
    )
  })
  .addDecorator(withKnobs)
