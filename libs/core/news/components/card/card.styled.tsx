/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Image from "Core/__deprecated__/renderer/components/core/image/image.component"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderRadius,
} from "Core/core/styles/theming/theme-getters"
import styled from "styled-components"
import { CARD_IMAGE_MAX_HEIGHT_PIXEL } from "Core/news/components/card/card.constans"

export const CardContainer = styled.div`
  max-width: 27.5rem;
  box-sizing: border-box;
  border-radius: ${borderRadius("medium")};
  overflow: hidden;
  margin-bottom: 4rem;
`

export const CardImage = styled(Image)`
  object-fit: cover;
  height: ${CARD_IMAGE_MAX_HEIGHT_PIXEL / 10}rem;
  width: 100%;
`

export const CardContent = styled.div`
  padding: 2.4rem;
  background-color: ${backgroundColor("row")};
`

export const CardDescription = styled(Text)`
  margin-top: 1.2rem;
  margin-bottom: 2.4rem;
  overflow: hidden;
  line-height: 2.2rem;
  min-height: calc(2.2rem * 3);
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* stylelint-enable */
`

export const CardDate = styled(Text)`
  text-transform: uppercase;
`
