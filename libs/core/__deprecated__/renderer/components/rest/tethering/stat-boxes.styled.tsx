/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { fadeAnimation } from "Core/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { DataBoxesWrapper } from "Core/__deprecated__/renderer/components/rest/meditation/data-box/data-boxes.component"
import {
  borderColor,
  transitionTime,
} from "Core/core/styles/theming/theme-getters"
import { TextWrapper } from "Core/__deprecated__/renderer/components/rest/meditation/data-box/data-box.styled"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"

export const StatBoxesWrapper = styled(DataBoxesWrapper)`
  ${fadeAnimation};
  animation-duration: ${transitionTime("slow")};
  border-top: 0.1rem solid ${borderColor("tetheringSeparator")};
  padding: 4rem 3rem 0 4rem;
`

export const StatTextWrapper = styled(TextWrapper)`
  display: flex;
  align-items: center;
`

export const RotatedArrowIcon = styled(Icon)`
  transform: rotate(180deg);
`

export const UnitText = styled(Text)`
  text-transform: lowercase;
`
