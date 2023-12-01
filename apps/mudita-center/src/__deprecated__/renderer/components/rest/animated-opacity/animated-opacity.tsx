/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { css } from "styled-components"
import {
  transitionTime,
  transitionTimingFunction,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"

export const animatedOpacityActiveStyles = css`
  opacity: 1;
  visibility: visible;
`
export const animatedOpacityStyles = css`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")};
`
