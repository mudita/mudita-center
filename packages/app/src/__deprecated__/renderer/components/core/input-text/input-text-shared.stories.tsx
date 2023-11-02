/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { css } from "styled-components"

export const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`
export const textAreaContainerStyles = css`
  ${storyContainerStyles};
  align-items: flex-start;
`
