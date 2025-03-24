/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { LegacyText } from "app-theme/ui"
import { CARD_IMAGE_MAX_HEIGHT_PIXEL } from "./card.constans"

export const CardContainer = styled.div`
  max-width: 27.5rem;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.legacy.borderRadius.medium};
  overflow: hidden;
  margin-bottom: 4rem;
`

export const CardImage = styled.img.attrs({ alt: "" })`
  object-fit: cover;
  height: ${CARD_IMAGE_MAX_HEIGHT_PIXEL / 10}rem;
  width: 100%;
`

export const CardContent = styled.div`
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.legacy.color.background.row};
`

export const CardDescription = styled(LegacyText)`
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

export const CardDate = styled(LegacyText)`
  text-transform: uppercase;
`
