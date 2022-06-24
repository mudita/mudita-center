/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"

const AppViewStory = styled(Story)`
  margin: 0 1rem 0 0;

  > main {
    overflow: hidden;
    align-items: initial;
    justify-content: initial;
    padding: 0.1rem;
    width: 97.7rem;
    height: 74rem;
    background-color: ${backgroundColor("main")};
  }
`

export default AppViewStory
